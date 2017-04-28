'use strict';

var Attribute = function() {

	var attr = {};

	attr.isField = function(attribute) {
		return /^field[0-9]+/.test(attribute);
	};

	attr.forFieldId = function(id) {
		return 'field' + id;
	};

	attr.forField = function(field) {
		return attr.forFieldId(field.id);
	};

	attr.getFieldId = function(attribute) {
		return parseInt(attribute.substring(5));
	};

	return attr;
};

module.exports = Attribute;
