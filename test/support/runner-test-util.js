'use strict';


function convertKeysToLowerCase(map) {
    var newMap = {};
    for(var key in map) {
        newMap[key.toLowerCase()] = map[key];
    }
    return newMap;
}

var createRequest = function(options) {

	if (!options) {
		var options = {};
	}

	var mockRequest = Object.create(null);

	mockRequest.method = options.method ? options.method : 'GET';

    mockRequest.originalUrl = options.originalUrl || '/workspaces/123/testService/testEndpoint';
    
    var defaultParams = {
		workspaceId: null,
		pluginNamespace: null,
		pluginRoute: null
    }

    var fragments = mockRequest.originalUrl.split('/');

    if (fragments.length >= 4) {
    	defaultParams.workspaceId = fragments[1];
    	defaultParams.pluginNamespace = fragments[2];
    	defaultParams.pluginRoute = fragments[3];
    }
    
    mockRequest.params = options.params ? Object.assign(options.params, defaultParams) : defaultParams;
    
    mockRequest.headers = options.headers ? convertKeysToLowerCase(options.headers) : {};
    
    mockRequest.body = options.body ? options.body : {};
    
    mockRequest.query = options.query ? options.query : {};
    
	return mockRequest;

}

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

}

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

module.exports = RunnerTestUtil
