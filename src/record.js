'use strict';

var attribute = require('./attribute');

var Record = {};

Record.getFieldValue = function(record, fieldId) {
	return record.record['field' + fieldId];
};

Record.setFieldValue = function(record, fieldId, value) {

	if (record.hasOwnProperty('record')) {
		record.record[attribute.forFieldId(fieldId)] = value;
	} else {
		record[attribute.forFieldId(fieldId)] = value;
	}

	return record;
};

module.exports = Record;
