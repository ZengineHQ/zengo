'use strict';

var FormDao = function(api) {

	var dao = {};

	var baseEndpoint = '/forms';

	dao.get = function(formId) {
		var endpoint = baseEndpoint + '/' + formId;
		return api.get(endpoint);
	};

	dao.query = function(request) {
		request.attributes = request.attributes || 'id,name';
		request.related = request.related || 'fields,folders';
		return api.query(baseEndpoint, request);
	};

	dao.save = function(data) {
		return api.post(baseEndpoint, data);
	};

	dao.count = function(request) {
		return api.query(baseEndpoint, request);
	};

	return dao;
};

module.exports = FormDao;
