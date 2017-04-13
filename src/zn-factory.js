'use strict';

var ZnApi = require('./zn-api.js');
var ZnFormDao = require('./zn-form-dao.js');
var ZnRecordDao = require('./zn-record-dao.js');
var ZnRecordService = require('./zn-record-service.js');

var ZnFactory = function(znHttp) {
	this.znHttp = znHttp;
	this.znApi = ZnApi(znHttp);
};

ZnFactory.prototype.ZnFormDao = function() {
	return new ZnFormDao(this.znApi);
};

ZnFactory.prototype.ZnRecordService = function() {
	var znRecordDao = new ZnRecordDao(this.znApi);
	return new ZnRecordService(znRecordDao);
};

module.exports = ZnFactory;
