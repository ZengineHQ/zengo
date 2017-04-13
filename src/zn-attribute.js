'use strict';

var ZnAttribute = {
	isField: function(attribute) {
		return /^field[0-9]+/.test(attribute);
	},
	forField: function(field) {
		return 'field' + field.getId();
	},
	getFieldId: function(attribute) {
		return parseInt(attribute.substring(5));
	}
};

module.exports = ZnAttribute;
