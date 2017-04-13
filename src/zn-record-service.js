'use strict';

var map = require('lodash.map');
var FormRecord = require('./zn-form-record.js');

var createFormRecordDao = function(formDao, recordDao, formId) {
	var dao = {};

	var createFormRecord = function(record) {
		return FormRecord(null, record);
	};

	var createFormRecords = function(response) {
		response.data = map(response.data, createFormRecord);
		return response;
	};

	dao.get = function(request) {
		return recordDao.get(request);
	};

	dao.query = function(request) {
		return recordDao.query(request).then(createFormRecords);
	};

	dao.save = function(request) {
		return recordDao.save(request);
	};

	return dao;
};


module.exports = createFormRecordDao;
