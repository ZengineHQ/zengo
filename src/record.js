'use strict';

var attribute = require('./attribute');

var Record = {};

Record.getFieldValue = function(record, fieldId) {

	var attr = attribute.forFieldId(fieldId);

	if (record.hasOwnProperty('record')) {
		return record.record[attr];
	} else {
		return record[attr];
	}

};

Record.setFieldValue = function(record, fieldId, value) {

	var attr = attribute.forFieldId(fieldId);

	if (record.hasOwnProperty('record')) {
		record.record[attr] = value;
	} else {
		record[attr] = value;
	}

	return record;
};

module.exports = Record;
