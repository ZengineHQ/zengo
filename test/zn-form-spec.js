'use strict';

describe('ZnForm', function() {

	var ZnFormBuilder = require('./zn-form-builder.js');

	var builder;

	beforeEach(function() {
		builder = new ZnFormBuilder();
	});

	describe('getFieldByAttribute', function() {

		// it('should get all linked form ids', function() {

		// 	var znForm = builder
		// 		.field()
		// 		.linkedField({ id: 1, linkedToForm: 5 })
		// 		.build();

		// 	var linkedFormIds = znForm.getLinkedFormIds();

		// 	expect(linkedFormIds.length).to.equal(1);
		// 	expect(linkedFormIds[0]).to.equal(5);
		// });
	});
});
