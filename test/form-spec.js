'use strict';

describe('Form', function() {

	var ZnFormBuilder = require('./zn-form-builder.js');

	var builder;

	beforeEach(function() {
		builder = new ZnFormBuilder();
	});

	describe('getFieldByAttribute', function() {

		// it('should get all linked form ids', function() {

		// 	var form = builder
		// 		.field()
		// 		.linkedField({ id: 1, linkedToForm: 5 })
		// 		.build();

		// 	var linkedFormIds = form.getLinkedFormIds();

		// 	expect(linkedFormIds.length).to.equal(1);
		// 	expect(linkedFormIds[0]).to.equal(5);
		// });
	});
});
