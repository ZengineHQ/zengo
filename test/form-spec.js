'use strict';

describe('Form', function() {

	var form = require('../').core.form,
		formData;

	beforeEach(function() {
		formData = {
			id: 1,
			linkedForms: [
				{
					form: {
						id: '2'
					},
					type: 'hasOne',
					keyField: {
						id: 22
					}
				},
				{
					form: {
						id: 3
					},
					type: 'belongsTo',
					keyField: {
						id: 23
					}
				},
				{
					form: {
						id: 4
					},
					type: 'hasMany',
					keyField: {
						id: 24
					}
				}
			]
		};
	});

	describe('getLinkedForm', function() {

		it('should return a form', function() {

			var expected = {
				form: {
					id: 4
				},
				type: 'hasMany',
				keyField: {
					id: 24
				}
			};

			expect(form.getLinkedForm(formData, '4')).to.be.deep.equal(expected);

		});

		it('should return false if no form found', function() {

			expect(form.getLinkedForm(formData, 1)).to.be.false;
			expect(form.getLinkedForm()).to.be.false;

		});

	});

	describe('getLinkedFormAttribute', function() {

		it('should return form2 for hasOne', function() {
			expect(form.getLinkedAttributeTo(formData, 2)).	to.be.equal('form2');
		});

		it('should return field23 for belongsTo', function() {
			expect(form.getLinkedAttributeTo(formData, 3)).to.be.equal('field23');
		});

		it('should return false for hasMany', function() {
			expect(form.getLinkedAttributeTo(formData, 4)).to.be.false;
		});




	});
});
