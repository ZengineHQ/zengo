'use strict';

var find = require('lodash.find');
var map = require('lodash.map');
var createField = require('./field.js');
var Attr = require('./attribute.js');

var createForm = function(data) {
	var form = {};
	var fields = map(data.fields || [], function(fieldData) {
		return createField(fieldData);
	});

	form.getId = function() {
		return data.id;
	};

	form.getName = function() {
		return data.name;
	};

	form.getFieldByAttribute = function(attribute) {
		var fieldId = Attr.getFieldId(attribute);
		return find(fields, function(field) {
			return field.getId() === fieldId;
		});
	};

	return form;
};

module.exports = createForm;
