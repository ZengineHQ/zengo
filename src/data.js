'use strict';

var createApi = require('./zn-api.js');
var FormDao = require('./zn-form-dao.js');
var FormRecordDao = require('./zn-record-service.js');
var RecordDao = require('./zn-record-dao.js');

var createDataModule = function(znHttp) {
	var module = {};
	var api = createApi(znHttp);
	var formDao = FormDao(api);

	module.forForms = function() {
		return formDao;
	};

	module.forRecordsOf = function(formId) {
		return FormRecordDao(formDao, RecordDao(api, formId), formId);
	};

	return module;
};

module.exports = createDataModule;
