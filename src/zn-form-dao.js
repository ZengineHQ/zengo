'use strict';

var map = require('lodash.map');

var createForm = require('./zn-form.js');
var createForms = function(response) {
	response.data = map(response.data, createForm);
	return response;
};

var ZnFormDao = function(znApi) {
	var dao = {};
	var baseEndpoint = '/forms';

	dao.get = function(formId) {
		var endpoint = baseEndpoint + '/' + formId;
		return znApi.get(endpoint).then(createForm);
	};

	dao.query = function(params) {
		params.attributes = 'id,name';
		params.related = 'fields,folders';
		return znApi.query(baseEndpoint, params).then(createForms);
	};

	dao.save = function(data) {
		return znApi.post(baseEndpoint, data);
	};

	return dao;
};

module.exports = ZnFormDao;
