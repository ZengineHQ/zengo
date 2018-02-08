'use strict';

var RecordDaoRaw = function(api, formId) {

	var dao = {};

	var getEndpoint = function(recordId) {
		var endpoint = ['/forms', formId, 'records'].join('/');
		if (recordId && !Array.isArray(recordId)) {
			endpoint += '/' + recordId;
		}
		return endpoint;
	};

	dao.get = function(request) {
		var endpoint = getEndpoint(request.id);

		if (request.id && !Array.isArray(request.id)) {
			delete request.id;
		}

		return api.get(endpoint, request);
	};

	dao.query = function(request) {
		var endpoint = getEndpoint();
		return api.query(endpoint, request);
	};

	dao.save = function(request) {
		var endpoint = getEndpoint(request.id);
		if (request.id) {
			return api.put(endpoint, request);
		}
		return api.post(endpoint, request);
	};

	dao.delete = function(request) {
		var endpoint = getEndpoint(request.id);
		return api.del(endpoint, request);
	};

	dao.count = function(request) {
		var endpoint = getEndpoint();
		return api.count(endpoint, request);
	};

	return dao;
};

module.exports = RecordDaoRaw;