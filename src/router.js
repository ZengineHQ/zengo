'use strict';

var merge = require('lodash.merge');

var actions = {
	'GET': {},
	'POST': {},
	'PUT': {},
	'DELETE': {},
	'PATCH': {}
};

var registerAction = function(method, action, callback) {

	var firstAction;

	if (action === '/') {
		firstAction = action;
	} else {
		var components = action.split('/');
		firstAction = components.length > 1 ? components[1] : '/';
	}

	actions[method][firstAction] = callback;
};

var registerGetAction = function(action, callback) {
	return registerAction('GET', action, callback);
};

var registerPostAction = function(action, callback) {
	return registerAction('POST', action, callback);
};

var registerPutAction = function(action, callback) {
	return registerAction('PUT', action, callback);
};

var registerDeleteAction = function(action, callback) {
	return registerAction('DELETE', action, callback);
};

var registerPatchAction = function(action, callback) {
	return registerAction('PATCH', action, callback);
};

var findCallback = function(method, firstAction) {

	var actionsForMethod = actions[method];

	var callback = actionsForMethod[firstAction];

	return callback;
};

var extractFirstAction = function(originalUrl) {

	var endpoint = originalUrl.split('?')[0];

	var urlComponents = endpoint.split('/');

	return urlComponents.length > 5 ? urlComponents[5] : '/';
};

var dispatch = function(eventData) {

	var request = eventData.request;
	var response = eventData.response;

	var method = request.method;
	var firstAction = extractFirstAction(request.originalUrl);

	var onSuccess = function(data) {
		return response.status(200).send(data);
	};

	var onError = function(err) {

		err = err || {};

		var status = err.status || err.code || 500;

		var defaultPayload = {
			name: 'InternalServerError',
			message: 'Internal Server Error'
		};

		/* jshint ignore:start */
		if (err instanceof Error && err.hasOwnProperty('message')) {
			Object.defineProperty(err, 'message', { enumerable: true });
		}
		/* jshint ignore:end */

		var payload = merge(defaultPayload, err);

		if (!payload.log && status === 500 && err.stack) {
			payload.log = err.stack;
		}

		delete payload.status;

		return response.status(status).send(payload);

	};

	var callback = findCallback(method, firstAction);

	if (callback) {
		try {
			return callback(request, response).then(onSuccess).catch(onError);
		}
		catch(e) {
			return onError(e);
		}
	}

	var error = {
		name: 'NotFound',
		message: 'Not Found',
		status: 404
	};

	return onError(error);

};

module.exports = {
	get: registerGetAction,
	post: registerPostAction,
	put: registerPutAction,
	delete: registerDeleteAction,
	patch: registerPatchAction,
	dispatch: dispatch
};
