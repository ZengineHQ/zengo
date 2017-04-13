'use strict';

var map = require('lodash.map');
var forEach = require('lodash.foreach');

var fakeDaoFor = function(formId) {
	var dao = {};

	var _records = [];

	dao.query = function() {
		return _records;
	};

	dao.save = function(data) {
		_records.push(data);
	};

	dao.saveAll = function(records) {
		_records = map(records, function(record) {
			return record.serialize();
		});
	};

	return dao;
};

var fakeDao = function() {
	var dao = {};

	var _daosByForm = {};

	dao.saveAll = function(recordsByForm) {
		forEach(recordsByForm, function(records, formId) {
			dao.forForm(formId).saveAll(records);
		});
	};

	dao.forForm = function(formId) {
		var dao = _daosByForm[formId];
		if (dao) {
			return dao;
		}
		var newDao = fakeDaoFor(formId);
		_daosByForm[formId] = newDao;
		return newDao;
	};

	return dao;
};

module.exports = fakeDao;
