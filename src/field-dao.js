'use strict';

var FieldDao = function(api, formId) {

	var dao = {};

	var endpoint = ['/forms', formId, 'fields'].join('/');

	dao.get = function(request) {
		return api.get(endpoint, request);
	};

	dao.query = function(request) {
		return api.query(endpoint, request);
	};

	dao.save = function(data) {
		return api.post(endpoint, data);
	};

	dao.count = function(request) {
		return api.count(endpoint, request);
	};

	return dao;

};

module.exports = FieldDao;
