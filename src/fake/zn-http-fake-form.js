'use strict';

var map = require('lodash.map');
var filter = require('lodash.filter');
var find = require('lodash.find');
var includes = require('lodash.includes');

var fakeDao = function() {
	var formDao = {};

	var _forms = [];

	formDao.get = function(formId) {
		return find(_forms, function(form) {
			return form.id === formId;
		});
	};

	formDao.query = function(params) {

		if (params.id !== undefined) {

			var formIds = params.id.split('|');

			var forms = filter(_forms, function(form) {
				return includes(formIds, form.id + '');
			});

			return forms;

		}
		return _forms;
	};

	formDao.save = function(data) {
		_forms.push(data);
	};

	return formDao;
};

module.exports = fakeDao;
