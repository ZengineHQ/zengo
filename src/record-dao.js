'use strict';

var map = require('lodash.map');
var FormRecord = require('./zn-form-record.js');

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
					return FormRecord(form, record);
				});
				return response;
			};

			return recordDaoRaw.query(request).then(createFormRecords);
		};

		return getForm().then(queryRecords);
	};

	dao.save = function(request) {
		return recordDaoRaw.save(request);
	};

	return dao;
};

module.exports = RecordDao;
