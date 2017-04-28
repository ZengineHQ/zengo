'use strict';

var reduce = require('lodash.reduce');
var isObject = require('lodash.isobject');
var forEach = require('lodash.foreach');

var createApi = function(znHttp) {

	var api = {};

	var assembleParams = function(params) {

		return reduce(params, function(assembled, paramValue, paramKey) {

			var separator = '|';

			if (paramKey === 'related' || paramKey === 'attributes') {
				separator = ',';
			}

			if (Array.isArray(paramValue)) {
				paramValue = paramValue.join(separator);
				assembled[paramKey] = paramValue;
				return assembled;
			}

			if (isObject(paramValue)) {
				forEach(paramValue, function(value, key) {
					assembled[paramKey + '.' + key] = value;
				});
				return assembled;
			}

			assembled[paramKey] = paramValue;

			return assembled;

		}, {});

	};

	api.get = function(endpoint, params) {
		var returnData = function(body) {
			return body.data;
		};
		return api.query(endpoint, params).then(returnData);
	};

	api.query = function(endpoint, params) {

		var options = {
			params: assembleParams(params)
		};

		var returnParsedResponse = function(response) {
			var body = response.getBody();

			if (body.totalCount === 0) {
				body.offset = body.offset || 0;
				body.data = body.data || [];
			}

			return body;
		};

		return znHttp.get(endpoint, options).then(returnParsedResponse);
	};

	api.queryFirst = function(endpoint, params) {
		return api.query(endpoint, params).then(function(response) {
			return response.data[0];
		});
	};

	var returnResponseData = function(response) {
		return response.getBody().data;
	};

	api.post = function(endpoint, data) {
		return znHttp.post(endpoint, data).then(returnResponseData);
	};

	api.put = function(endpoint, data) {
		return znHttp.put(endpoint, data).then(returnResponseData);
	};

	return api;
};

module.exports = createApi;
