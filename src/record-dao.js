'use strict';

var map = require('lodash.map');

var RecordDao = function(formDao, recordDaoRaw, formId) {
	var dao = {};

	var getForm = function() {
		return formDao.get(formId);
	};

	dao.get = function(request) {
		return recordDaoRaw.get(request);
	};

	dao.query = function(request) {

		var queryRecords = function(form) {

			var createFormRecords = function(response) {
				response.data = map(response.data, function(record) {
					return { form: form, record: record };
				});
				return response;
			};

			return recordDaoRaw.query(request).then(createFormRecords);
		};

		return getForm().then(queryRecords);
	};

	dao.queryAll = function(request) {
		return recordDaoRaw.queryAll(request);
	};

	dao.save = function(request) {
		return recordDaoRaw.save(request);
	};

	dao.delete = function(request) {
		return recordDaoRaw.delete(request);
	};

	dao.count = function(request) {
		return recordDaoRaw.count(request);
	};

	return dao;
};

module.exports = RecordDao;
