'use strict';

var createApi = require('./api.js');
var FormDao = require('./form-dao.js');
var RecordDao = require('./record-dao.js');
var RecordDaoRaw = require('./record-dao-raw.js');

var createDataModule = function(znHttp) {
	var module = {};
	var api = createApi(znHttp);
	var formDao = FormDao(api);

	module.forForms = function() {
		return formDao;
	};

	module.forRecordsOf = function(formId) {
		return RecordDao(formDao, RecordDaoRaw(api, formId), formId);
	};

	return module;
};

module.exports = createDataModule;
