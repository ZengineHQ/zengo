'use strict';

var get = require('lodash.get');

var createFieldDefault = function(data) {
	var field = {};

	field.getId = function() {
		return data.id;
	};

	field.getType = function() {
		return data.type;
	};

	field._getProperty = function(key) {
		return get(data, 'settings.properties.' + key);
	};

	return field;
};

var createFieldNumeric = function(builder) {

	builder.getCurrency = function() {
		return builder._getProperty('currency');
	};

	return builder;
};

var createField = function(data) {
	var field = createFieldDefault(data);
	if (data.type === 'numeric') {
		return createFieldNumeric(field);
	}
	return field;
};

module.exports = createField;
