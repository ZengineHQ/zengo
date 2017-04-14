'use strict';

var actions = {
	'GET': {},
	'POST': {}
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

		var status = err.status || 500;

		var payload = {
			name: err.name || 'InternalServerError',
			message: err.message || 'Internal Server Error'
		};

		if (status === 500 && err.stack) {
			payload.log = err.stack;
		}

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
	dispatch: dispatch
};
