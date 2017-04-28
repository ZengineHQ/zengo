'use strict';

var createRecord = function() {

	var formRecord = {};

	formRecord.getFieldValue = function(record, fieldId) {
		return record.record['field' + fieldId];
	};

	return formRecord;

}

module.exports = createRecord;
