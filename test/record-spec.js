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

	describe('setFieldValue', function() {

		it('should set the value in the record data', function() {

			var recordData = {
				field123: null
			};

			var expected = {
				field123: 456
			};

			expect(record.setFieldValue(recordData, 123, 456)).to.be.eql(expected);

		});

		it('should set the value in the record raw format', function() {

			var recordRaw = {
				form: null,
				record: {
					field123: null
				}
			};

			var expected = {
				form: null,
				record: {
					field123: 456
				}
			};

			expect(record.setFieldValue(recordRaw, 123, 456)).to.be.eql(expected);

		});

	});

});
