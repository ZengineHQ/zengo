'use strict';

var find = require('lodash.find');
var map = require('lodash.map');
var createField = require('./zn-field.js');
var ZnAttribute = require('./zn-attribute.js');

var createForm = function(data) {
	var form = {};
	var fields = map(data.fields || [], function(fieldData) {
		return createField(fieldData);
	});

	form.getId = function() {
		return data.id;
	};

	form.getFieldByAttribute = function(attribute) {
		var fieldId = ZnAttribute.getFieldId(attribute);
		return find(fields, function(field) {
			return field.getId() === fieldId;
		});
	};

	return form;
};

module.exports = createForm;
