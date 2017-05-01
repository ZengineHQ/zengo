'use strict';

describe('Api', function() {

	var nock = require('nock');

	var util = require('./support/api-test-util.js');

	var api;

	beforeEach(function() {
		api = util.createApi();
	});

	describe('get', function() {

		it('should send GET request and return response data', function() {

			var expectedRecords = [
				{
					id: 1
				},
				{
					id: 3
				}
			];

			nock('https://api.zenginehq.com/v1')
				.get('/forms/123/records')
				.reply(200, {
					data: expectedRecords
				});

			return api.get('/forms/123/records').then(function(records) {
				expect(records).to.eql(expectedRecords);
			});
		});

		it('should assemble params, so array values are separated by |', function() {

			nock('https://api.zenginehq.com')
				.filteringPath(function(path){
					return '/';
				})
				.get('/')
				.reply(200, function(uri, requestBody) {
					uri = decodeURIComponent(uri);
					expect(uri).to.equal('/v1/forms/1/records?field100=1|2|3&field200=apples');
					return {};
				});

			var params = {
				field100: [1, 2, 3],
				field200: 'apples'
			};

			return api.get('/forms/1/records', params);
		});
	});

	describe('query', function() {

		it('should send GET request and return response', function() {

			var expectedResponse = {
				data: [
					{
						id: 1
					},
					{
						id: 3
					}
				],
				totalCount: 4,
				offset: 1
			};

			nock('https://api.zenginehq.com/v1')
				.get('/forms/123/records')
				.reply(200, expectedResponse);

			return api.query('/forms/123/records').then(function(response) {
				expect(response).to.eql(expectedResponse);
			});
		});

		it('should assemble params, so array values are separated by `,` when the param name is `related` or `attributes`', function() {

			nock('https://api.zenginehq.com')
				.filteringPath(function(path){
					return '/';
				})
				.get('/')
				.reply(200, function(uri, requestBody) {
					uri = decodeURIComponent(uri);
					expect(uri).to.equal('/v1/forms?attributes=id,createdAt,field123&related=fields,folders');
					return {};
				});

			var params = {
				attributes: ['id', 'createdAt', 'field123'],
				related: ['fields', 'folders']
			};

			return api.query('/forms', params);
		});

		it('should assemble params, so array values are separated by |', function() {

			nock('https://api.zenginehq.com')
				.filteringPath(function(path){
					return '/';
				})
				.get('/')
				.reply(200, function(uri, requestBody) {
					uri = decodeURIComponent(uri);
					expect(uri).to.equal('/v1/forms/1/records?field100=1|2|3&field200=apples');
					return {};
				});

			var params = {
				field100: [1, 2, 3],
				field200: 'apples'
			};

			return api.query('/forms/1/records', params);
		});

		it('should assemble params, so object values are flattened', function() {

			nock('https://api.zenginehq.com')
				.filteringPath(function(path){
					return '/';
				})
				.get('/')
				.reply(200, function(uri, requestBody) {
					uri = decodeURIComponent(uri);
					expect(uri).to.equal('/v1/forms/1/records?workspace.id=123');
					return {};
				});

			var params = {
				workspace: {
					id: 123
				}
			};

			return api.query('/forms/1/records', params);
		});

		describe('when no results were found (i.e. totalCount is 0)', function() {

			it("should set data as empty array and offset as 0, because zengine api doesn't", function() {

				nock('https://api.zenginehq.com')
					.filteringPath(function(path){
						return '/';
					})
					.get('/')
					.reply(200, {
						status: 404,
						code: 4004,
						userMessage: "Error viewing data",
						developerMessage: "No data was found",
						totalCount: 0
					});

				var expectedResponse = {
					status: 404,
					code: 4004,
					userMessage: "Error viewing data",
					developerMessage: "No data was found",
					totalCount: 0,
					offset: 0,
					data: []
				};

				return api.query('/forms/1/records').then(function(response) {
					expect(response).to.eql(expectedResponse);
				});
			});
		});

		describe('when totalCount is not set', function() {

			it('should not attempt to parse response (just for precaution)', function() {

				var expectedResponse = {
					status: 404,
					code: 777,
					developerMessage: "Some error we've never seen before",
				};

				nock('https://api.zenginehq.com')
					.filteringPath(function(path){
						return '/';
					})
					.get('/')
					.reply(200, expectedResponse);

				return api.query('/forms/1/records').then(function(response) {
					expect(response).to.eql(expectedResponse);
				});
			});
		});
	});

	describe('post', function() {

		it('should POST to api and return response data', function() {

			var record = {
				id: 1,
				field123: 'apples'
			};

			nock('https://api.zenginehq.com/v1')
				.post('/forms/123/records', record)
				.reply(200, {
					data: record
				});

			return api.post('/forms/123/records', record).then(function(data) {
				expect(data).to.eql(record);
			});
		});
	});

	describe('put', function() {

		it('should PUT to api and return response data', function() {

			var record = {
				id: 1,
				field123: 'apples'
			};

			nock('https://api.zenginehq.com/v1')
				.put('/forms/123/records/456', record)
				.reply(200, {
					data: record
				});

			return api.put('/forms/123/records/456', record).then(function(data) {
				expect(data).to.eql(record);
			});
		});
	});

	describe('count', function() {

		it('should GET to api and return the total count', function() {

			var endpoint = '/forms/123/records';

			var totalCount = 1;

			var apiResponse = {
				status: 200,
  				code: 2000,
  				totalCount: totalCount
			};

			nock('https://api.zenginehq.com/v1')
				.get('/forms/123/records/count?field123=apples')
				.reply(200, apiResponse);

			var params = {
				field123: 'apples'
			};

			return api.count(endpoint, params).then(function(results) {
				expect(results).to.be.equal(totalCount);
			});

		});

	});
});
