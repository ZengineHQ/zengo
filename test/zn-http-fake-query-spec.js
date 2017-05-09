'use strict';

describe('znHttpFake (query)', function() {

	var query = require('../src/fake/zn-http-fake-query');

	describe('filter', function() {

		it('should return results for prefix `` condition', function() {

			var data = [
				{ id: 1, name: 'Workspace1' },
				{ id: 2, name: 'Workspace2' },
				{ id: 3, name: 'Workspace3' },
				{ id: 4, name: 'Workspace4' },
				{ id: 5, name: 'Workspace5' }
			];

			var params = {
				filter: { and: [ { prefix: '', attribute: 'id', value: 3 } ] }
			};

			expect(query.filter(data, params)).to.eql([ { id: 3, name: 'Workspace3' } ]);

		});

		it('should return results for prefix `not` condition', function() {

			var data = [
				{ id: 1, name: 'Workspace1' },
				{ id: 2, name: 'Workspace2' },
				{ id: 3, name: 'Workspace3' },
				{ id: 4, name: 'Workspace4' },
				{ id: 5, name: 'Workspace5' }
			];

			var params = {
				filter: {
					and: [
						{ prefix: 'not', attribute: 'id', value: 1 },
						{ prefix: 'not', attribute: 'id', value: 2 },
						{ prefix: 'not', attribute: 'id', value: 4 },
						{ prefix: 'not', attribute: 'id', value: 5 }
					]
				}
			};

			expect(query.filter(data, params)).to.eql([ { id: 3, name: 'Workspace3' } ]);

		});

		it('should return results for prefix `min` condition', function() {

			var data = [
				{ id: 1, name: 'Workspace1' },
				{ id: 2, name: 'Workspace2' },
				{ id: 3, name: 'Workspace3' },
				{ id: 4, name: 'Workspace4' },
				{ id: 5, name: 'Workspace5' }
			];

			var params = {
				filter: { and: [ { prefix: 'min', attribute: 'id', value: 4 } ] }
			};

			expect(query.filter(data, params)).to.eql([ { id: 4, name: 'Workspace4' }, { id: 5, name: 'Workspace5' } ]);

		});

		it('should return results for prefix `max` condition', function() {

			var data = [
				{ id: 1, name: 'Workspace1' },
				{ id: 2, name: 'Workspace2' },
				{ id: 3, name: 'Workspace3' },
				{ id: 4, name: 'Workspace4' },
				{ id: 5, name: 'Workspace5' }
			];

			var params = {
				filter: { and: [ { prefix: 'max', attribute: 'id', value: 2 } ] }
			};

			expect(query.filter(data, params)).to.eql([ { id: 1, name: 'Workspace1' }, { id: 2, name: 'Workspace2' } ]);

		});

		it('should return results for prefix `contains` condition', function() {

			var data = [
				{ id: 1, name: 'Workspace1' },
				{ id: 2, name: 'Workspace2' },
				{ id: 3, name: 'Workspace3' },
				{ id: 4, name: 'Workspace4' },
				{ id: 5, name: 'Workspace5' }
			];

			var params = {
				filter: { and: [ { prefix: 'contains', attribute: 'name', value: 'space3' } ] }
			};

			expect(query.filter(data, params)).to.eql([ { id: 3, name: 'Workspace3' } ]);

		});

		it('should return results for prefix `not-contains` condition', function() {

			var data = [
				{ id: 1, name: 'Workspace1' },
				{ id: 2, name: 'Workspace2' },
				{ id: 3, name: 'Workspace3' },
				{ id: 4, name: 'Workspace4' },
				{ id: 5, name: 'Workspace5' }
			];

			var params = {
				filter: {
					and: [
						{ prefix: 'not-contains', attribute: 'name', value: 'space1' },
						{ prefix: 'not-contains', attribute: 'name', value: 'space3' },
						{ prefix: 'not-contains', attribute: 'name', value: 'space4' },
						{ prefix: 'not-contains', attribute: 'name', value: 'space5' }
					]
				}
			};

			expect(query.filter(data, params)).to.eql([ { id: 2, name: 'Workspace2' } ]);

		});

		it('should return results for prefix `starts-with` condition', function() {

			var data = [
				{ id: 1, name: 'The first workspace1' },
				{ id: 2, name: 'The second workspace2' },
				{ id: 3, name: 'The third workspace3' },
				{ id: 4, name: 'The fourth workspace4' },
				{ id: 5, name: 'The fifth workspace5' }
			];

			var params = {
				filter: { and: [ { prefix: 'contains', attribute: 'name', value: 'The second' } ] }
			};

			expect(query.filter(data, params)).to.eql([ { id: 2, name: 'The second workspace2' } ]);

		});

		it('should return results for prefix `ends-with` condition', function() {

			var data = [
				{ id: 1, name: 'Workspace1' },
				{ id: 2, name: 'Workspace2' },
				{ id: 3, name: 'Workspace3' },
				{ id: 4, name: 'Workspace4' },
				{ id: 5, name: 'Workspace5' }
			];

			var params = {
				filter: { and: [ { prefix: 'contains', attribute: 'name', value: 'space3' } ] }
			};

			expect(query.filter(data, params)).to.eql([ { id: 3, name: 'Workspace3' } ]);

		});

	});

	describe('sortAndPaginate', function() {

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

			expect(query.sortAndPaginate(data, params)).to.deep.equal(expected);

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

			expect(query.sortAndPaginate(data, params)).to.deep.equal(expected);

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

			expect(query.sortAndPaginate(data, params)).to.deep.equal(expected);

		});

	});

	describe('project', function() {

		it('should return only selected attributes (multiple)', function() {

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
					name: 'Workspace1',
					isDisabled: false,
					tags: null,
					description: null,
					created: '2016-10-03T20:09:35+0000',
					modified: '2016-11-11T16:22:49+0000'
				},
				{
					id: 4,
					name: 'Workspace4',
					isDisabled: false,
					tags: null,
					description: null,
					created: '2016-10-03T20:09:35+0000',
					modified: '2016-11-11T16:22:49+0000'
				}
			];

			var params = {
				attributes: 'id,name'
			};

			var expected = [
				{
					id: 3,
					name: 'Workspace3',
				},
				{
					id: 1,
					name: 'Workspace1',
				},
				{
					id: 4,
					name: 'Workspace4',
				}
			];

			expect(query.project(data, params)).to.deep.equal(expected);

		});

		it('should return only selected attributes (single)', function() {

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
					name: 'Workspace1',
					isDisabled: false,
					tags: null,
					description: null,
					created: '2016-10-03T20:09:35+0000',
					modified: '2016-11-11T16:22:49+0000'
				},
				{
					id: 4,
					name: 'Workspace4',
					isDisabled: false,
					tags: null,
					description: null,
					created: '2016-10-03T20:09:35+0000',
					modified: '2016-11-11T16:22:49+0000'
				}
			];

			var params = {
				attributes: 'name'
			};

			// `id` still comes back since it's implicit
			var expected = [
				{
					id: 3,
					name: 'Workspace3',
				},
				{
					id: 1,
					name: 'Workspace1',
				},
				{
					id: 4,
					name: 'Workspace4',
				}
			];

			expect(query.project(data, params)).to.deep.equal(expected);

		});

	});

	describe('timezone', function() {

		it('should not mutate the data (not implemented)', function() {

			var data = {};

			var params = {
				timezone: 'America/New_York'
			};

			expect(query.timezone(data, params)).to.be.eql({});

		});

	});

	describe('count', function() {

		it('should return the count when data is an array', function() {
			expect(query.count([1,2,3])).to.be.equal(3);
		});

		it('should return the count when data is an object', function() {
			expect(query.count({ id: 1 })).to.be.equal(1);
		});

		it('should return the count equal 1 when data is an empty object', function() {
			expect(query.count({})).to.be.equal(1);
		});

		it('should return the count equal zero when data is an empty array', function() {
			expect(query.count([])).to.be.equal(0);
		});

		it('should return the count equal zero when data is null', function() {
			expect(query.count(null)).to.be.equal(0);
		});

		it('should return the count equal zero when data is undefined', function() {
			expect(query.count(undefined)).to.be.equal(0);
		});

	});

});
