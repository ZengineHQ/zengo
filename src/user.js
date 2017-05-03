'use strict';

var Promise = require('bluebird');
var get = require('lodash.get');

var User = function(api) {

	var user = {};

	var apiError = function() {
		return {
			name: 'ApiError',
			message: 'API error',
			status: 500
		};
	};

	var unauthorizedError = function() {
		return {
			name: 'Unauthorized',
			message: 'User is not authorized',
			status: 401
		};
	};

	user.getId = function() {

		var getUser = function() {
			return api.get('/users/me?attributes=id&related=null');
		};

		var onError = function(response) {

			var error;

			switch (response.code) {

				case 401:
				case 403:
				case 404:
					error = unauthorizedError();
					break;

				default:
					error = apiError();

			}

			return Promise.reject(error);

		};

		var onSuccess = function(response) {

			var userId = get(response, 'id') || false;

			return userId;

		};

		return getUser().then(onSuccess, onError);

	};

	user.isAuthorizedInWorkspace = function(workspaceId, userId) {

		var getUserId = function() {
			return userId ? Promise.resolve(userId) : user.getId();
		};

		var getMembershipCount = function(userId) {

			var endpoint = ['/workspaces', workspaceId, 'members'].join('/');

			var options = {
				'user.id': userId
			};

			return api.count(endpoint, options);

		};

		var checkMembership = function(count) {

			if (count === 1) {
				return Promise.resolve(true);
			} else {
				return Promise.reject(unauthorizedError());
			}

		};

		var onError = function(error) {

			if (error.name === 'Unauthorized') {
				return Promise.reject(error);
			} else {
				return Promise.reject(apiError());
			}

		};

		var onSuccess = function(isAuthorized) {
			return isAuthorized;
		};

		return getUserId()
			.then(getMembershipCount)
			.then(checkMembership)
			.then(onSuccess, onError);
	};

	return user;

};

module.exports = User;

