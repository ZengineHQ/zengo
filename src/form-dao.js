'use strict';

var map = require('lodash.map');

var createForms = function(response) {
	response.data = map(response.data, createForm);
	return response;
};

var FormDao = function(api) {

	var dao = {};

	var baseEndpoint = '/forms';

	dao.get = function(formId) {
		var endpoint = baseEndpoint + '/' + formId;
		return api.get(endpoint);
	};

	dao.query = function(params) {
		params.attributes = params.attributes || 'id,name';
		params.related = params.related || 'fields,folders';
		return api.query(baseEndpoint, params);
	};

	dao.save = function(data) {
		return api.post(baseEndpoint, data);
	};

	return dao;
};

module.exports = FormDao;
