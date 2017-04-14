'use strict';

var createApi = require('./api.js');
var FormDao = require('./form-dao.js');
var RecordDao = require('./record-dao.js');
var RecordDaoRaw = require('./record-dao-raw.js');

var createDataModule = function(znHttp) {
	var data = {};
	var api = createApi(znHttp);
	var formDao = FormDao(api);

	data.forForms = function() {
		return formDao;
	};

	data.forRecordsOf = function(formId) {
		return RecordDao(formDao, RecordDaoRaw(api, formId), formId);
	};

	return data;
};

module.exports = createDataModule;
