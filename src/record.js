'use strict';

var map = require('lodash.map');
var ZnAttribute = require('./zn-attribute.js');


var createRecord = function(form, data) {
	var formRecord = {};

	formRecord.getId = function() {
		return data.id;
	};

	formRecord.getName = function() {
		return data.name;
	};

	formRecord.getForm = function() {
		return form;
	};

	formRecord.getAttributeValues = function(attributes) {
		return map(attributes, function(attribute) {
			return formRecord.getAttributeValue(attribute);
		});
	};

	var getAttributeValueField = function(attribute) {
		var field = form.getFieldByAttribute(attribute);
		var value = data[attribute];
		return {
			field: field,
			attribute: attribute,
			value: value
		};
	};

	var getAttributeValueStd = function(attribute) {
		var value = data[attribute];
		return {
			attribute: attribute,
			value: value
		};
	};

	formRecord.getAttributeValue = function(attribute) {
		if (ZnAttribute.isField(attribute)) {
			return getAttributeValueField(attribute);
		}
		return getAttributeValueStd(attribute);
	};

	formRecord.getFieldValue = function(fieldId) {
		return data['field' + fieldId];
	};

	formRecord.getParentIdForRelation = function(linkedForm) {
		var value = formRecord.getFieldValue(linkedForm.keyField.id);
		if (!value) {
			return null;
		}
		return value.id;
	};

	formRecord.serialize = function() {
		return data;
	};

	return formRecord;
};

module.exports = createRecord;
