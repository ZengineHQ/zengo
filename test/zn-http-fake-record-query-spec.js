'use strict';

describe('ZnHttpFake (record query)', function() {

	var zengo = require('../index.js');
	var Api = require('../src/api.js');

	var api;

	beforeEach(function() {
		var znHttpFake = zengo.znHttpFake();
		api = Api(znHttpFake);
	});

	it('should only return records belonging to the target form', function() {

		var saveRecords = function() {
			return api.put('/forms/5/records/12', {
				name: 'apples',
			})
			.then(function() {
				api.put('/forms/5/records/13', {
					name: 'bananas'
				});
			})
			.then(function() {
				api.put('/forms/20/records/100', {
					name: 'lettuce'
				});
			});
		};

		var query = function() {
			return api.query('/forms/5/records');
		};

		var assert = function(response) {
			expect(response.totalCount).to.equal(2);
			expect(response.data[0].name).to.eql('apples');
			expect(response.data[1].name).to.eql('bananas');
		};

		return saveRecords().then(query).then(assert);
	});

	it('returns 0 results', function() {

		var query = function() {
			return api.query('/forms/5/records');
		};

		var assert = function(response) {
			expect(response.totalCount).to.equal(0);
		};

		return query().then(assert);
	});

	it('sorts by id asc by default', function() {

		var saveRecords = function() {
			return api.put('/forms/5/records/100', {
				name: 'apples',
			})
			.then(function() {
				api.put('/forms/5/records/50', {
					name: 'bananas'
				});
			})
			.then(function() {
				api.put('/forms/5/records/200', {
					name: 'oranges'
				});
			});
		};

		var query = function() {
			return api.query('/forms/5/records');
		};

		var assert = function(response) {
			expect(response.totalCount).to.equal(3);
			expect(response.data[0].id).to.eql(50);
			expect(response.data[1].id).to.eql(100);
			expect(response.data[2].id).to.eql(200);
			expect(response.data[0].name).to.eql('bananas');
			expect(response.data[1].name).to.eql('apples');
			expect(response.data[2].name).to.eql('oranges');
		};

		return saveRecords().then(query).then(assert);
	});
});
