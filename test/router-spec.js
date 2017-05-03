'use strict';


describe('Router', function() {

	var Promise = require('bluebird');

	var util = require('./support/runner-test-util');
	var router;

	beforeEach(function() {
		router = require('../index').router;
	});

	describe('supported http verbs', function() {

		it('should accept GET verb', function() {

			var eventData = util.createEventData({
				method: 'GET',
				originalUrl: '/1/2/3/4/two'
			});

			var testActionOne = function() {};

			var testActionTwo = function() {
				return new Promise(function(resolve, reject) {
					resolve('testGET');
				});
			};

			router.get('/one', testActionOne);

			router.get('/two', testActionTwo);

			return router.dispatch(eventData).then(function(results) {
				expect(results).to.equal('testGET');
			});

		});

		it('should accept POST verb', function() {

			var eventData = util.createEventData({
				method: 'POST',
				originalUrl: '/1/2/3/4/two'
			});

			var testActionOne = function() {};

			var testActionTwo = function() {
				return new Promise(function(resolve, reject) {
					resolve('testPOST');
				});
			};

			router.post('/one', testActionOne);

			router.post('/two', testActionTwo);

			return router.dispatch(eventData).then(function(results) {
				expect(results).to.equal('testPOST');
			});

		});

		it('should accept PUT verb', function() {

			var eventData = util.createEventData({
				method: 'PUT',
				originalUrl: '/1/2/3/4/two'
			});

			var testActionOne = function() {};

			var testActionTwo = function() {
				return new Promise(function(resolve, reject) {
					resolve('testPUT');
				});
			};

			router.put('/one', testActionOne);

			router.put('/two', testActionTwo);

			return router.dispatch(eventData).then(function(results) {
				expect(results).to.equal('testPUT');
			});

		});

		it('should accept DELETE verb', function() {

			var eventData = util.createEventData({
				method: 'DELETE',
				originalUrl: '/1/2/3/4/two'
			});

			var testActionOne = function() {};

			var testActionTwo = function() {
				return new Promise(function(resolve, reject) {
					resolve('testDELETE');
				});
			};

			router.delete('/one', testActionOne);

			router.delete('/two', testActionTwo);

			return router.dispatch(eventData).then(function(results) {
				expect(results).to.equal('testDELETE');
			});

		});

		it('should accept PATCH verb', function() {

			var eventData = util.createEventData({
				method: 'PATCH',
				originalUrl: '/1/2/3/4/two'
			});

			var testActionOne = function() {};

			var testActionTwo = function() {
				return new Promise(function(resolve, reject) {
					resolve('testPATCH');
				});
			};

			router.patch('/one', testActionOne);

			router.patch('/two', testActionTwo);

			return router.dispatch(eventData).then(function(results) {
				expect(results).to.equal('testPATCH');
			});

		});

	});

	describe('error handling', function() {

		it('should respond with a 404 not found for inexisting route', function() {

			var eventData = util.createEventData({
				method: 'GET',
				originalUrl: '/1/2/3/4/not-setup-route'
			});

			var testActionOne = function() {};

			var testActionTwo = function() {};

			router.get('/one', testActionOne);

			router.get('/two', testActionTwo);

			var expected = {
				name: 'NotFound',
				message: 'Not Found'
			};

			var results = router.dispatch(eventData);

			expect(results).to.deep.equal(expected);

			return;

		});

		it('should respond with a 500 custom error when promise is rejected', function() {

			var eventData = util.createEventData({
				method: 'GET',
				originalUrl: '/1/2/3/4/two'
			});

			var testActionOne = function() {};

			var testActionTwo = function() {
				return new Promise(function(resolve, reject) {
					var error = new Error('Test Error');
					error.name = 'TestError';
					error.customProperty = { one: 1, two: 2};
					error.log = { myCustomLog: 1 };
					reject(error);
				});
			};

			router.get('/one', testActionOne);

			router.get('/two', testActionTwo);

			return router.dispatch(eventData).then(function(results) {
				expect(results.name).to.equal('TestError');
				expect(results.message).to.equal('Test Error');
				expect(results.customProperty).to.deep.equal({ one: 1, two: 2});
				expect(results.log).to.deep.equal({ myCustomLog: 1 });
			});

		});

		it('should respond with a 500 default error when promise is rejected', function() {

			var eventData = util.createEventData({
				method: 'GET',
				originalUrl: '/1/2/3/4/two'
			});

			var testActionOne = function() {};

			var testActionTwo = function() {
				return new Promise(function(resolve, reject) {
					reject();
				});
			};

			router.get('/one', testActionOne);

			router.get('/two', testActionTwo);

			return router.dispatch(eventData).then(function(results) {
				expect(results.name).to.equal('InternalServerError');
				expect(results.message).to.equal('Internal Server Error');
				expect(results).to.not.have.property('log');
			});

		});

		it('should respond with a 500 custom error when an exception is thrown', function() {

			var eventData = util.createEventData({
				method: 'GET',
				originalUrl: '/1/2/3/4/two'
			});

			var testActionOne = function() {};

			var testActionTwo = function() {
				return new Promise(function(resolve, reject) {
					var error = new Error('Test Error');
					error.name = 'TestError';
					error.customProperty = { one: 1, two: 2};
					error.log = { myCustomLog: 1 };
					throw error;
				});
			};

			router.get('/one', testActionOne);

			router.get('/two', testActionTwo);

			return router.dispatch(eventData).then(function(results) {
				expect(results.name).to.equal('TestError');
				expect(results.message).to.equal('Test Error');
				expect(results.customProperty).to.deep.equal({ one: 1, two: 2});
				expect(results.log).to.deep.equal({ myCustomLog: 1 });
			});

		});

		it('should respond with a 500 default error when an empty exception is thrown', function() {

			var eventData = util.createEventData({
				method: 'GET',
				originalUrl: '/1/2/3/4/two'
			});

			var testActionOne = function() {};

			var testActionTwo = function() {
				return new Promise(function(resolve, reject) {
					throw {};
				});
			};

			router.get('/one', testActionOne);

			router.get('/two', testActionTwo);

			return router.dispatch(eventData).then(function(results) {
				expect(results.name).to.equal('InternalServerError');
				expect(results.message).to.equal('Internal Server Error');
				expect(results).to.not.have.property('log');
			});

		});

	});

});
