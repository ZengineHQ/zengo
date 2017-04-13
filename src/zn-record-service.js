'use strict';

var map = require('lodash.map');
var FormRecord = require('./zn-form-record.js');

var createFormRecordDao = function(formDao, recordDao, formId) {
	var dao = {};

	var getForm = function() {
		return formDao.get(formId);
	};

	dao.get = function(request) {
		return recordDao.get(request);
	};

	dao.query = function(request) {

		var queryRecords = function(form) {

			var createFormRecords = function(response) {
				response.data = map(response.data, function(record) {
					return FormRecord(form, record);
				});
				return response;
			};

			return recordDao.query(request).then(createFormRecords);
		};

		return getForm().then(queryRecords);
	};

	dao.save = function(request) {
		return recordDao.save(request);
	};

	return dao;
};

module.exports = createFormRecordDao;
