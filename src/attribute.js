'use strict';

var Attribute = {};

Attribute.isField = function(attribute) {
	return /^field[0-9]+/.test(attribute);
};

Attribute.forFieldId = function(id) {
	return 'field' + id;
};

Attribute.forField = function(field) {
	return Attribute.forFieldId(field.id);
};

Attribute.getFieldId = function(attribute) {
	return parseInt(attribute.substring(5));
};

module.exports = Attribute;
