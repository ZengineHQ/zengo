'use strict';

describe('Router', function() {

	var router;

	var fakeEventData = {
		request: {
			headers: null,
			body: null,
			method: null,
			params: {
				workspaceId: null,
				pluginNamespace: null,
				pluginRoute: null
			},
			query: null,
			originalUrl: null
		},
		response: {
			set: function(field, value) {
				// if (arguments.length === 2) {
				// 	res.set(field, value);
				// } else {
				// 	res.set(field);
				// }
				return this;
			},
			status: function(status) {
				// res.status(status);
				return this;
			},
			send: function(body) {
				// res.send(body);
				return body;
				// return this;
			},
			end: function() {
				// res.end();
				return this;
			}
		}
	};

	beforeEach(function() {
		router = require('../index').router;
	});

	describe('supported http verbs', function() {

		it('should accept GET verb', function() {

			fakeEventData.request.method = 'GET';
			fakeEventData.request.originalUrl = '/1/2/3/4/two';

			var testActionOne = function() {};

			var testActionTwo = function() {
				return new Promise(function(resolve, reject) {
					resolve('testGET');
				});
			};

			router.get('/one', testActionOne);

			router.get('/two', testActionTwo);

			return router.dispatch(fakeEventData).then(function(results) {
				expect(results).to.equal('testGET');
			});

		});

		it('should accept POST verb', function() {

			fakeEventData.request.method = 'POST';
			fakeEventData.request.originalUrl = '/1/2/3/4/two';

			var testActionOne = function() {};

			var testActionTwo = function() {
				return new Promise(function(resolve, reject) {
					resolve('testPOST');
				});
			};

			router.post('/one', testActionOne);

			router.post('/two', testActionTwo);

			return router.dispatch(fakeEventData).then(function(results) {
				expect(results).to.equal('testPOST');
			});

		});

	});

	describe('error handling', function() {

	});

	describe('routing', function() {

	});

});