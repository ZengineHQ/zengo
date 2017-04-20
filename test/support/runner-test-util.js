'use strict';
var mapKeys = require('lodash.mapkeys'),
	merge = require('lodash.merge');


function convertKeysToLowerCase(map) {
	return mapKeys(map, function(value, key) {
		return key.toLowerCase();
	});
}

var createRequest = function(options) {

	options = options || {};

	var defaultRequest = {
		method: 'GET',
		originalUrl: '/workspaces/123/testService/testEndpoint',
		headers: {},
		body: {},
		query: {},
		params: {
			workspaceId: null,
			pluginNamespace: null,
			pluginRoute: null
		}
	};


	var mockRequest = merge(defaultRequest, options);

	var fragments = mockRequest.originalUrl.split('/');

	if (fragments.length >= 4) {
		mockRequest.params.workspaceId = fragments[1];
		mockRequest.params.pluginNamespace = fragments[2];
		mockRequest.params.pluginRoute = fragments[3];
	}

	mockRequest.headers = convertKeysToLowerCase(mockRequest.headers);

	return mockRequest;

};

var createResponse = function(options) {

	var mockResponse = Object.create(null);

	mockResponse.set = function(field, value) {
		return this;
	};

	mockResponse.status = function(status) {
		return this;
	};

	mockResponse.send = function(body) {
		mockResponse.body = body;
		return mockResponse.end();
	};

	mockResponse.end = function() {
		return mockResponse.body;
	};

	return mockResponse;

};

var createEventData = function(request, response) {

	return {
		request: createRequest(request),
		response: createResponse(response)
	};

};

var RunnerTestUtil = {
	createEventData: createEventData,
	createRequest: createRequest,
	createResponse: createResponse
};

module.exports = RunnerTestUtil;
