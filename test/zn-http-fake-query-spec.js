'use strict';

describe('znHttpFake (query)', function() {

	var Query = require('../src/fake/zn-http-fake-query');

	describe('paginate', function() {

		it('should return an instance of itself', function() {

			var query = Query();

			expect(query.paginate()).to.be.eql(query);

		});

		it('should paginate with params', function() {

			var data = [
				{
					id: 1,
					name: 'Workspace1'
				},
				{
					id: 2,
					name: 'Workspace2'
				},
				{
					id: 3,
					name: 'Workspace3'
				},
				{
					id: 4,
					name: 'Workspace4'
				},
				{
					id: 5,
					name: 'Workspace5'
				}
			];

			var params = {
				page: 2,
				limit: 2
			};

			var expected = [ { id: 3, name: 'Workspace3' }, { id: 4, name: 'Workspace4' } ];

			var query = Query(data, params);

			var results = query.paginate().getResults();

			expect(results).to.deep.equal(expected);

		});

	});

	describe('sort', function() {

		it('should return an instance of itself', function() {

			var query = Query();

			expect(query.sort()).to.be.eql(query);

		});

		it('should sort by `id` ascending', function() {

			var data = [
				{
					id: 3,
					name: 'Workspace3'
				},
				{
					id: 1,
					name: 'Workspace1'
				},
				{
					id: 4,
					name: 'Workspace4'
				},
				{
					id: 5,
					name: 'Workspace5'
				},
				{
					id: 2,
					name: 'Workspace2'
				}
			];

			var params = {
				sort: 'id',
				direction: 'asc'
			};

			var expected = [
				{
					id: 1,
					name: 'Workspace1'
				},
				{
					id: 2,
					name: 'Workspace2'
				},
				{
					id: 3,
					name: 'Workspace3'
				},
				{
					id: 4,
					name: 'Workspace4'
				},
				{
					id: 5,
					name: 'Workspace5'
				}
			];

			var query = Query(data, params);

			var results = query.sort().getResults();

			expect(results).to.deep.equal(expected);

		});

		it('should sort by `id` descending', function() {

			var data = [
				{
					id: 3,
					name: 'Workspace3'
				},
				{
					id: 1,
					name: 'Workspace1'
				},
				{
					id: 4,
					name: 'Workspace4'
				},
				{
					id: 5,
					name: 'Workspace5'
				},
				{
					id: 2,
					name: 'Workspace2'
				}
			];

			var params = {
				sort: 'id',
				direction: 'desc'
			};

			var expected = [
				{
					id: 5,
					name: 'Workspace5'
				},
				{
					id: 4,
					name: 'Workspace4'
				},
				{
					id: 3,
					name: 'Workspace3'
				},
				{
					id: 2,
					name: 'Workspace2'
				},
				{
					id: 1,
					name: 'Workspace1'
				}
			];

			var query = Query(data, params);

			var results = query.sort().getResults();

			expect(results).to.deep.equal(expected);

		});
	});

	describe('filter', function() {

		it('should return an instance of itself', function() {

			var query = Query();

			expect(query.filter()).to.be.eql(query);

		});

	});

	describe('restrictToAttributes', function() {

		it('should return an instance of itself', function() {

			var query = Query();

			expect(query.restrictToAttributes()).to.be.eql(query);

		});

		it('should return only selected attributes', function() {

			var data = [
				{
					id: 3,
					name: 'Workspace3',
					isDisabled: false,
					tags: null,
					description: null,
					created: '2016-10-03T20:09:35+0000',
					modified: '2016-11-11T16:22:49+0000'
				},
				{
					id: 1,
					name: 'Workspace1'
					isDisabled: false,
					tags: null,
					description: null,
					created: '2016-10-03T20:09:35+0000',
					modified: '2016-11-11T16:22:49+0000'
				},
				{
					id: 4,
					name: 'Workspace4'
					isDisabled: false,
					tags: null,
					description: null,
					created: '2016-10-03T20:09:35+0000',
					modified: '2016-11-11T16:22:49+0000'
				}
			];

			var params = {
				sort: 'id',
				direction: 'asc'
			};

		});

	});

	describe('restrictToRelated', function() {

		it('should return an instance of itself', function() {

			var query = Query();

			expect(query.restrictToRelated()).to.be.eql(query);

		});

	});

	describe('convertToTimezone', function() {

		it('should not mutate the data', function() {

			var data = {};

			var params = {
				timezone: 'America/New_York'
			};

			var query = Query(data, params);

			expect(query.convertToTimezone().getResults()).to.be.eql({});

		});

		it('should return an instance of itself', function() {

			var query = Query();

			expect(query.convertToTimezone()).to.be.eql(query);

		});

	});

	describe('getCount', function() {

		it('should return the count when data is an array', function() {

			var data = [1,2,3];

			var query = Query(data);

			expect(query.getCount()).to.be.equal(3);

		});

		it('should return the count when data is an object', function() {

			var data = { id: 1 };

			var query = Query(data);

			expect(query.getCount()).to.be.equal(1);

		});

		it('should return the count equal 1 when data is an empty object', function() {

			var data = {};

			var query = Query(data);

			expect(query.getCount()).to.be.equal(1);

		});

		it('should return the count equal zero when data is an empty array', function() {

			var data = [];

			var query = Query(data);

			expect(query.getCount()).to.be.equal(0);

		});

		it('should return the count equal zero when data is null', function() {

			var data = null;

			var query = Query(data);

			expect(query.getCount()).to.be.equal(0);

		});

		it('should return the count equal zero when data is undefined', function() {

			var data = undefined;

			var query = Query(data);

			expect(query.getCount()).to.be.equal(0);

		});

	});

	describe('getResults', function() {

		it('should get data back when data is an array', function() {

			var data = [1,2,3];

			var query = Query(data);

			expect(query.getResults()).to.be.eql(data);

		});

		it('should get data back when data is an object', function() {

			var data = { one: 1, two: 2 };

			var query = Query(data);

			expect(query.getResults()).to.be.eql(data);

		});

	});

});
