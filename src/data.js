'use strict';

var createApi = require('./api');
var FormDao = require('./form-dao');
var FieldDao = require('./field-dao');
var RecordDao = require('./record-dao');
var RecordDaoRaw = require('./record-dao-raw');
var createUser = require('./user');

var createDataModule = function(znHttp) {

	var data = {};
	var api = createApi(znHttp);
	var formDao = FormDao(api);

	data.forForms = function() {
		return formDao;
	};

	data.forFieldsOf = function(formId) {
		return FieldDao(api, formId);
	};

	data.forRecordsOf = function(formId) {
		return RecordDao(formDao, RecordDaoRaw(api, formId), formId);
	};

	data.forUsers = function() {
		return createUser(api);
	};

	return data;
};

module.exports = createDataModule;
