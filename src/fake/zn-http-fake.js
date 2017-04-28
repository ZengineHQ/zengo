'use strict';

var Promise = require('bluebird');
var RoutePattern = require('route-pattern');
var find = require('lodash.find');
var merge = require('lodash.merge');

var httpFakeForm = require('./zn-http-fake-form.js');
var httpFakeRecord = require('./zn-http-fake-record.js');


var createGenericRouter = function() {

	var actions = {
		'GET': [],
		'POST': [],
		'PUT': [],
	};

	var register = function(method, pattern, callback) {
		var route = {
			pattern: pattern,
			callback: callback,
		};
		actions[method].push(route);
	};

	var registerGetAction = function(pattern, callback) {
		return register('GET', pattern, callback);
	};

	var registerPostAction = function(pattern, callback) {
		return register('POST', pattern, callback);
	};

	var registerPutAction = function(pattern, callback) {
		return register('PUT', pattern, callback);
	};

	var dispatch = function(method, endpoint, params) {
		var route = find(actions[method], function(route) {
			return RoutePattern.fromString(route.pattern).matches(endpoint);
		});
		if (!route) {
			throw Error('ZnHttpFake: unimplemented route: ' + method + ': ' + endpoint);
		}
		var match = RoutePattern.fromString(route.pattern).match(endpoint);
		var allParams = merge(params, match.namedParams);
		return route.callback(allParams);
	};

	return {
		get: registerGetAction,
		post: registerPostAction,
		put: registerPutAction,
		dispatch: dispatch,
	};
};

var createZnCoreFake = function() {

	var router = createGenericRouter();
	var fakeFormRepo = httpFakeForm();
	var fakeRecordRepo = httpFakeRecord();

	router.get('/forms', function(params) {
		return fakeFormRepo.query(params);
	});

	router.post('/forms', function(data) {
		return fakeFormRepo.save(data);
	});

	router.get('/forms/:formId', function(data) {
		var formId = parseInt(data.formId);
		delete data.formId;
		return fakeFormRepo.get(formId);
	});

	router.get('/forms/:formId/records', function(data) {
		var formId = parseInt(data.formId);
		delete data.formId;
		return fakeRecordRepo.forForm(formId).query();
	});

	router.post('/forms/:formId/records', function(data) {
		var formId = parseInt(data.formId);
		delete data.formId;
		return fakeRecordRepo.forForm(formId).save(data);
	});

	router.put('/forms/:formId/records/:recordId', function(data) {
		var formId = parseInt(data.formId);
		delete data.formId;
		data.id = parseInt(data.recordId);
		delete data.recordId;
		return fakeRecordRepo.forForm(formId).save(data);
	});

	return {
		dispatch: router.dispatch,
	};
};

var createZnHttpFake = function() {
	var znHttp = {};

	var core = createZnCoreFake();

	var respond = function(body) {
		var response = {
			getBody: function() {
				return body;
			}
		};
		return Promise.resolve(response);
	};

	znHttp.get = function(endpoint, options) {
		var body = core.dispatch('GET', endpoint, options.params);
		return respond(body);
	};

	znHttp.post = function(endpoint, data) {
		var responseData = core.dispatch('POST', endpoint, data);
		var body = {
			data: responseData,
		};
		return respond(body);
	};

	znHttp.put = function(endpoint, data) {
		var responseData = core.dispatch('PUT', endpoint, data);
		var body = {
			data: responseData,
		};
		return respond(body);
	};

	return znHttp;
};

module.exports = createZnHttpFake;
