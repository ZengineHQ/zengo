'use strict';

var Attribute = {
	isField: function(attribute) {
		return /^field[0-9]+/.test(attribute);
	},
	forField: function(field) {
		return this.forFieldId(field.getId());
	},
	forFieldId: function(id) {
		return 'field' + id;
	},
	getFieldId: function(attribute) {
		return parseInt(attribute.substring(5));
	}
};

module.exports = Attribute;
