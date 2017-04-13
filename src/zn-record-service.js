'use strict';

var ZnRecordService = function(znRecordDao) {
	this.znRecordDao = znRecordDao;
};

ZnRecordService.prototype.get = function(request) {
	return this.znRecordDao.get(request);
};

ZnRecordService.prototype.query = function(request) {
	return this.znRecordDao.query(request);
};

ZnRecordService.prototype.save = function(request) {
	return this.znRecordDao.save(request);
};

module.exports = ZnRecordService;
