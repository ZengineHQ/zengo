'use strict';

var Promise = require('bluebird');
var RoutePattern = require('route-pattern');
var find = require('lodash.find');
var merge = require('lodash.merge');

var httpFakeCatchAll = require('./zn-http-fake-catch-all');

var createGenericRouter = function() {

	var actions = {
		'GET': [],
		'POST': [],
		'PUT': [],
		'DELETE': []
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

	var registerDelAction = function(pattern, callback) {
		return register('DELETE', pattern, callback);
	};

	var dispatch = function(method, endpoint, optionsOrData, options) {
		var route = find(actions[method], function(route) {
			return RoutePattern.fromString(route.pattern).matches(endpoint);
		});
		if (!route) {
			throw Error('ZnHttpFake: unimplemented route: ' + method + ': ' + endpoint);
		}
		var match = RoutePattern.fromString(route.pattern).match(endpoint);
		if (method === 'POST' || method === 'PUT') {
			options = merge(options, { namedParams: match.namedParams });
		} else {
			optionsOrData = merge(optionsOrData, { namedParams: match.namedParams });
		}
		return route.callback(optionsOrData, options);
	};

	return {
		get: registerGetAction,
		post: registerPostAction,
		put: registerPutAction,
		del: registerDelAction,
		dispatch: dispatch,
	};
};

var createZnCoreFake = function(data) {

	var catchAll = httpFakeCatchAll(data);
	var router = createGenericRouter();

	router.get('/:resource', catchAll.queryResource);
	router.get('/:resource/count', catchAll.countResource);
	router.get('/:resource/:resourceId', catchAll.getResource);

	router.get('/:resource/:resourceId/:subResource', catchAll.querySubResource);
	router.get('/:resource/:resourceId/:subResource/count', catchAll.countSubResource);
	router.get('/:resource/:resourceId/:subResource/:subResourceId', catchAll.getSubResource);

	router.post('/:resource', catchAll.saveResource);
	router.post('/:resource/:resourceId/:subResource', catchAll.saveSubResource);

	router.put('/:resource/:resourceId', catchAll.updateResource);
	router.put('/:resource/:resourceId/:subResource/:subResourceId', catchAll.updateSubResource);

	router.del('/:resource/:resourceId', catchAll.deleteResource);
	router.del('/:resource/:resourceId/:subResource/:subResourceId', catchAll.deleteSubResource);

	return {
		dispatch: router.dispatch,
	};
};

var createZnHttpFake = function(data) {

	var znHttp = {};

	var core = createZnCoreFake(data);

	var respond = function(body) {
		var response = {
			getBody: function() {
				return body;
			}
		};
		return Promise.resolve(response);
	};

	znHttp.get = function(endpoint, options) {
		var body = core.dispatch('GET', endpoint, options);
		return respond(body);
	};

	znHttp.post = function(endpoint, data, options) {
		var responseData = core.dispatch('POST', endpoint, data, options);
		var body = {
			data: responseData,
		};
		return respond(body);
	};

	znHttp.put = function(endpoint, data, options) {
		var responseData = core.dispatch('PUT', endpoint, data, options);
		var body = {
			data: responseData,
		};
		return respond(body);
	};

	znHttp.del = function(endpoint, options) {
		var responseData = core.dispatch('DELETE', endpoint, options);
		var body = {
			data: responseData,
		};
		return respond(body);
	};

	return znHttp;
};

module.exports = createZnHttpFake;
