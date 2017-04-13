'use strict';

var Promise = require('bluebird');

var httpFakeForm = require('./zn-http-fake-form.js');
var httpFakeRecord = require('./zn-http-fake-record.js');

var createZnHttpFake = function() {
	var znHttp = {};

	var fakeFormRepo = httpFakeForm();
	var fakeRecordRepo = httpFakeRecord();

	var dispatchGetFormOrRecord = function(tokens, params) {
		if (!tokens.length) {
			return fakeFormRepo.query(params);
		}
		var formId = parseInt(tokens[0]);
		if (tokens.length === 1) {
			return fakeFormRepo.get(formId);
		}
		if (tokens.length === 2) {
			return fakeRecordRepo.forForm(formId).query();
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
			return fakeFormRepo.save(data);
		}
		var formId = parseInt(tokens[0]);
		if (tokens.length === 1) {
			return;
		}
		if (tokens.length === 2) {
			return fakeRecordRepo.forForm(formId).save(data);
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
