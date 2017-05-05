'use strict';

describe('znHttpFake (query)', function() {

	var Query = require('../src/fake/zn-http-fake-query');

	describe('paginate', function() {

		it ('should return an instance of itself', function() {

			var query = Query();

			expect(query.paginate()).to.be.eql(query);

		});

	});

	describe('sort', function() {

		it ('should return an instance of itself', function() {

			var query = Query();

			expect(query.sort()).to.be.eql(query);

		});

	});

	describe('filter', function() {

		it ('should return an instance of itself', function() {

			var query = Query();

			expect(query.filter()).to.be.eql(query);

		});

	});

	describe('restrictToAttributes', function() {

		it ('should return an instance of itself', function() {

			var query = Query();

			expect(query.restrictToAttributes()).to.be.eql(query);

		});

	});

	describe('restrictToRelated', function() {

		it ('should return an instance of itself', function() {

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

		it ('should return an instance of itself', function() {

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
