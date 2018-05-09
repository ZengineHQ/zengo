'use strict';

describe('Attribute', function() {

	var attribute = require('../').core.attribute;

	describe('isField', function() {

		it('should return TRUE if it is a field', function() {
			expect(attribute.isField('field123')).to.be.true;
		});

		it('should return FALSE if not a field', function() {
			expect(attribute.isField('id')).to.be.false;
			expect(attribute.isField('field123i')).to.be.false;
		});

	});

	describe('forFieldId', function() {

		it('should return a field name', function() {
			expect(attribute.forFieldId('123')).to.be.equal('field123');
		});

	});

	describe('forField', function() {

		it('should return a field name', function() {
			expect(attribute.forField({ id: 123 })).to.be.equal('field123');
		});

	});

	describe('getFieldId', function() {

		it('should return the numeric field id', function() {
			expect(attribute.getFieldId('field123')).to.be.equal(123);
		});

	});

});
