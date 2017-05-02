'use strict';

var Promise = require('bluebird');
var get = require('lodash.get');

var User = function(http) {

	var user = {};

	var apiError = function() {
		return {
			name: 'ApiError',
			message: 'API error',
			status: 500
		};
	};

	var UnauthorizedError = function() {
		return {
			name: 'Unauthorized',
			message: 'User is not authorized',
			status: 401
		};
	};

	user.getId = function() {

		var getUser = function() {
			return http.get('/users/me?attributes=id&related=null');
		};

		var onError = function(response) {

			var error;

			switch (response.code) {

				case 401:
				case 403:
				case 404:
					error = UnauthorizedError();
					break;

				default:
					error = apiError();

			}

			return Promise.reject(error);

		};

		var onSuccess = function(response) {

			var userId = get(response.getBody(), 'data.id') || false;

			return userId;

		};

		return getUser().then(onSuccess, onError);

	};

	user.isAuthorizedInWorkspace = function(workspaceId, userId) {

		var getUserId = function() {
			return userId ? Promise.resolve(userId) : user.getId();
		};

		var getMembershipCount = function(userId) {

			var endpoint = ['/workspaces', workspaceId, 'members', 'count'].join('/');

			var options = {
				params: {
					'user.id': userId
				}
			};

			return http.get(endpoint, options);

		};

		var checkMembership = function(response) {

			var body = response.getBody();

			var count = get(body, 'totalCount');

			return count === 1 ? true : false;

		};

		var onError = function(error) {
			return Promise.reject(apiError());
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

