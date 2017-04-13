'use strict';

var createFormRecordDao = function(formDao, recordDao, formId) {
	var dao = {};

	dao.get = function(request) {
		return recordDao.get(request);
	};

	dao.query = function(request) {
		return recordDao.query(request);
	};

	dao.save = function(request) {
		return recordDao.save(request);
	};

	return dao;
};


module.exports = createFormRecordDao;
