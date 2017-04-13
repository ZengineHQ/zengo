'use strict';

describe('ZnForm', function() {

	var ZnFormBuilder = require('./zn-form-builder.js');

	var builder;

	beforeEach(function() {
		builder = new ZnFormBuilder();
	});

	describe('getLinkedFormIds', function() {

		it('should get all linked form ids', function() {

			var znForm = builder
				.linkedField({ id: 1, linkedToForm: 5 })
				.build();

			var linkedFormIds = znForm.getLinkedFormIds();

			expect(linkedFormIds.length).to.equal(1);
			expect(linkedFormIds[0]).to.equal(5);
		});

		it('should get all linked form ids of a certain type', function() {

			var znForm = builder
				.belongsToForm({ id: 1, form: 5 })
				.hasOneForm({ id: 2, form: 6 })
				.hasManyForm({ id: 3, form: 7 })
				.build();

			var linkedFormIds = znForm.getLinkedFormIds('belongsTo');

			expect(linkedFormIds.length).to.equal(1);
			expect(linkedFormIds[0]).to.equal(5);
		});
	});
});
