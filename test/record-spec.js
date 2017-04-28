'use strict';

describe('Record', function() {

	var record = require('../').core.record;

	describe('getFieldValue', function() {

		it('should return a field value', function() {

			var recordData = {
				form: {},
				record: {
					field123: 123
				}
			};

			expect(record.getFieldValue(recordData, 123)).to.be.equal(123);

		});

	});

});
