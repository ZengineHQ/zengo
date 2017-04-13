'use strict';

var map = require('lodash.map');
var ZnAttribute = require('./zn-attribute.js');

var createFormRecord = function(form, record) {
	var formRecord = {};

	formRecord.getId = function() {
		return record.id;
	};

	formRecord.getName = function() {
		return record.name;
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
		var value = record[attribute];
		return {
			field: field,
			attribute: attribute,
			value: value
		};
	};

	var getAttributeValueStd = function(attribute) {
		var value = record[attribute];
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
		return record['field' + fieldId];
	};

	formRecord.getParentIdForRelation = function(linkedForm) {
		var value = formRecord.getFieldValue(linkedForm.keyField.id);
		if (!value) {
			return null;
		}
		return value.id;
	};

	formRecord.serialize = function() {
		return record;
	};

	return formRecord;
};

module.exports = createFormRecord;
