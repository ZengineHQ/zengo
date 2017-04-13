'use strict';

var map = require('lodash.map');

var createForm = require('./zn-form.js');
var createForms = function(response) {
	response.data = map(response.data, createForm);
	return response;
};

var ZnFormDao = function(api) {
	var dao = {};
	var baseEndpoint = '/forms';

	dao.get = function(formId) {
		var endpoint = baseEndpoint + '/' + formId;
		return api.get(endpoint).then(createForm);
	};

	dao.query = function(params) {
		params.attributes = 'id,name';
		params.related = 'fields,folders';
		return api.query(baseEndpoint, params).then(createForms);
	};

	dao.save = function(data) {
		return api.post(baseEndpoint, data);
	};

	return dao;
};

module.exports = ZnFormDao;
