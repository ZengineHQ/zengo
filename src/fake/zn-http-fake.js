'use strict';

var Promise = require('bluebird');

var httpFakeForm = require('./zn-http-fake-form.js');
var httpFakeRecord = require('./zn-http-fake-record.js');

var createZnFake = function() {
	var znFake = {
		formDao: httpFakeForm(),
		recordDao: httpFakeRecord()
	};

	znFake.forResource = function(name) {
		if (name === 'form') {
			return znFake.formDao;
		}
		if (name === 'record') {
			return znFake.recordDao;
		}
	};

	return znFake;
};

var createZnHttpFake = function() {
	var znHttp = {};
	var zn = createZnFake();

	var dispatchGetFormOrRecord = function(tokens, params) {
		if (!tokens.length) {
			return zn.forResource('form').query(params);
		}
		var formId = parseInt(tokens[0]);
		if (tokens.length === 1) {
			return zn.forResource('form').get(formId);
		}
		if (tokens.length === 2) {
			return zn.forResource('record').forForm(formId).query();
		}
	};

	var dispatchGet = function(endpoint, params) {
		var tokens = endpoint.split('/');
		tokens.shift();
		var resource = tokens.shift();
		if (resource === 'forms') {
			return dispatchGetFormOrRecord(tokens, params);
		}
		return [];
	};

	var dispatchPostFormOrRecord = function(tokens, data) {
		if (!tokens.length) {
			return zn.forResource('form').save(data);
		}
		var formId = parseInt(tokens[0]);
		if (tokens.length === 1) {
			return;
		}
		if (tokens.length === 2) {
			return zn.forResource('record').forForm(formId).save(data);
		}
	};

	var dispatchPost = function(endpoint, data) {
		var tokens = endpoint.split('/');
		tokens.shift();
		var resource = tokens.shift();
		if (resource === 'forms') {
			return dispatchPostFormOrRecord(tokens, data);
		}
		return [];
	};

	znHttp.get = function(endpoint, options) {
		var data = dispatchGet(endpoint, options.params);
		var body = {
			data: data,
			totalCount: data.length || 0,
			offset: 0,
			limit: 500
		};
		var response = {
			getBody: function() {
				return body;
			}
		};
		return Promise.resolve(response);
	};

	znHttp.post = function(endpoint, data) {
		var responseData = dispatchPost(endpoint, data);
		var body = {
			data: responseData,
		};
		var response = {
			getBody: function() {
				return body;
			}
		};
		return Promise.resolve(response);
	};

	return znHttp;
};

module.exports = createZnHttpFake;
