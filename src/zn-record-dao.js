'use strict';

var ZnRecordDao = function(znApi, formId) {

	var dao = {};

	var getEndpoint = function(recordId) {
		var endpoint = ['/forms', formId, 'records'].join('/');
		if (recordId) {
			endpoint += '/' + recordId;
		}
		return endpoint;
	};

	dao.get = function(request) {
		var endpoint = getEndpoint(request.id);
		return znApi.get(endpoint);
	};

	dao.query = function(request) {
		var endpoint = getEndpoint();
		return znApi.query(endpoint, request);
	};

	dao.save = function(request) {
		var endpoint = getEndpoint(request.id);
		if (request.id) {
			return znApi.put(endpoint, request);
		}
		return znApi.post(endpoint, request);
	};

	return dao;
};

module.exports = ZnRecordDao;
