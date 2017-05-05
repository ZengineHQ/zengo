'use strict';

describe('znHttpFake (query util)', function() {

	var util = require('../src/fake/zn-http-fake-query-util');

	describe('getPaginateParams', function() {

		it('should return pagination params', function() {

			var params = {
				sort: 'asc',
				page: 1,
				limit: 10
			};

			expect(util.getPaginateParams(params)).to.be.eql({ page: 1, limit: 10 });

		});

		it('should return only set pagination params', function() {

			var params = {
				sort: 'asc',
				limit: 10
			};

			expect(util.getPaginateParams(params)).to.be.eql({ limit: 10 });

		});

		it('should return undefined without pagination params', function() {

			var params = {
				id: 1
			};

			expect(util.getPaginateParams(params)).to.be.undefined;

		});

		it('should return undefined for empty pagination params', function() {

			var params = {
				page: null,
				limit: null
			};

			expect(util.getPaginateParams(params)).to.be.undefined;

		});

	});

	describe('getSortingParams', function() {

		it('should return sorting params', function() {

			var params = {
				id: 1,
				sort: 'id',
				direction: 'asc'
			};

			expect(util.getSortingParams(params)).to.be.eql({ sort: 'id', direction: 'asc' });

		});

		it('should return only set sorting params', function() {

			var params = {
				id: 1,
				direction: 'asc'
			};

			expect(util.getSortingParams(params)).to.be.eql({ direction: 'asc' });

		});

		it('should return undefined without sorting params', function() {

			var params = {
				id: 1
			};

			expect(util.getSortingParams(params)).to.be.undefined;

		});

		it('should return undefined for empty sorting params', function() {

			var params = {
				sort: null,
				direction: null
			};

			expect(util.getSortingParams(params)).to.be.undefined;

		});

	});

	describe('getFilterParam', function() {

		it('should return filter param', function() {

			var params = {
				attributes: 'id',
				filter: { and: [] }
			};

			expect(util.getFilterParam(params)).to.be.eql({and:[]});

		});

		it('should return undefined without filter param', function() {

			var params = {
				id: 1
			};

			expect(util.getFilterParam(params)).to.be.undefined;

		});

		it('should return undefined for empty filter param', function() {

			var params = {
				sort: 'asc',
				filter: null
			};

			expect(util.getFilterParam(params)).to.be.undefined;

		});

	});

	describe('getAttributesParam', function() {

		it('should return attributes param', function() {

			var params = {
				sort: 'id',
				attributes: 'id'
			};

			expect(util.getAttributesParam(params)).to.be.equal('id');

		});

		it('should return an array of attributes', function() {

			var params = {
				related: null,
				attributes: 'id,created,modified'
			};

			expect(util.getAttributesParam(params)).to.be.eql(['id', 'created', 'modified']);

		});

		it('should return undefined without attributes param', function() {

			var params = {
				id: 1
			};

			expect(util.getAttributesParam(params)).to.be.undefined;

		});

		it('should return undefined for empty attributes param', function() {

			var params = {
				sort: 'asc',
				attributes: null
			};

			expect(util.getAttributesParam(params)).to.be.undefined;

		});

	});

	describe('getRelatedParam', function() {

		it('should return attributes param', function() {

			var params = {
				sort: 'id',
				related: 'fields'
			};

			expect(util.getRelatedParam(params)).to.be.equal('fields');

		});

		it('should return an array of relations', function() {

			var params = {
				related: 'fields,permissions',
				attributes: 'id,created,modified'
			};

			expect(util.getRelatedParam(params)).to.be.eql(['fields', 'permissions']);

		});

		it('should return undefined without related param', function() {

			var params = {
				id: 1
			};

			expect(util.getRelatedParam(params)).to.be.undefined;

		});

		it('should return undefined for empty related param', function() {

			var params = {
				sort: 'asc',
				related: null
			};

			expect(util.getRelatedParam(params)).to.be.undefined;

		});

	});

	describe('getTimezoneParam', function() {

		it('should return timezone param', function() {

			var params = {
				id: 1,
				timezone: 'America/New_York'
			};

			expect(util.getTimezoneParam(params)).to.be.equal('America/New_York');

		});

		it('should return undefined without timezone param', function() {

			var params = {
				id: 1
			};

			expect(util.getTimezoneParam(params)).to.be.undefined;

		});

		it('should return undefined for empty timezone param', function() {

			var params = {
				sort: 'asc',
				timezone: null
			};

			expect(util.getTimezoneParam(params)).to.be.undefined;

		});

	});

	describe('getConditionalParams', function() {

		it('should return an array of conditional params', function() {

			var params = {
				field101: 1,
				field102: 2,
				field103: 3
			};

			var expected = [
				{
					prefix: '',
					attribute: 'field101',
					value: 1
				},
				{
					prefix: '',
					attribute: 'field102',
					value: 2
				},
				{
					prefix: '',
					attribute: 'field103',
					value: 3
				},
			];

			expect(util.getConditionalParams(params)).to.be.eql(expected);

		});

		it('should return undefined without conditional params', function() {

			var params = {
				limit: 1
			};

			expect(util.getConditionalParams(params)).to.be.undefined;

		});

		it('should return undefined for empty conditional params', function() {

			var params = {
				limit: 1,
				field123: null
			};

			expect(util.getConditionalParams(params)).to.be.undefined;

		});


	});

});
