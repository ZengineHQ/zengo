'use strict';

describe('User', function() {

	var zengo = require('../');

	var http = require('./support/lib/zn-http')();

	var nock = require('nock');

	var user = zengo.data(http).forUsers();

	var apiError = {
		name: 'ApiError',
		message: 'API error',
		status: 500
	};

	var unauthorizedError = {
		name: 'Unauthorized',
		message: 'User is not authorized',
		status: 401
	};

	describe('getId', function() {

		it('should reject with not authorized for 401 api responses', function() {

			var check = function(results) {
				expect(results).to.be.deep.equal(unauthorizedError);
			};

			var response = {};

			nock('https://api.zenginehq.com/v1')
				.get('/users/me?attributes=id&related=null')
				.reply(401, response);

				return user.getId().then(expect.fail, check);


		});

		it('should reject with not authorized for 403 api responses', function() {

			var check = function(results) {
				expect(results).to.be.deep.equal(unauthorizedError);
			};

			var response = {};

			nock('https://api.zenginehq.com/v1')
				.get('/users/me?attributes=id&related=null')
				.reply(403, response);

			return user.getId().then(expect.fail, check);

		});

		it('should reject with not authorized for 404 api responses', function() {

			var check = function(results) {
				expect(results).to.be.deep.equal(unauthorizedError);
			};

			var response = {};

			nock('https://api.zenginehq.com/v1')
				.get('/users/me?attributes=id&related=null')
				.reply(404, response);

				return user.getId().then(expect.fail, check);


		});

		it('should reject with api error for api responses other then 401,403 and 404', function() {

			var check = function(results) {
				expect(results).to.be.deep.equal(apiError);
			};

			var response = {};

			nock('https://api.zenginehq.com/v1')
				.get('/users/me?attributes=id&related=null')
				.reply(400, response);

				return user.getId().then(expect.fail, check);


		});

		it('should resolve with the user id', function() {

			var check = function(results) {
				expect(results).to.be.equal(1000);
			};

			var response = {
				status: 200,
				code: 2000,
				totalCount: 1,
				limit: 20,
				offset: 0,
				data: {
					id: 1000,
					resource: null
				}
			};

			nock('https://api.zenginehq.com/v1')
				.get('/users/me?attributes=id&related=null')
				.reply(200, response);

			return user.getId().then(check);

		});

	});

	describe('isAuthorizedInWorkspace', function() {

		it('should return TRUE', function() {

			var workspaceId = 101;

			var userId = 1001;

			var check = function(results) {
				expect(results).to.be.true;
			};

			var response = {
				status: 200,
				code: 2000,
				totalCount: 1
			};

			nock('https://api.zenginehq.com/v1')
				.get('/workspaces/101/members/count?user.id=1001')
				.reply(200, response);

			return user.isAuthorizedInWorkspace(workspaceId, userId).then(check, expect.fail);

		});

		it('should return FALSE', function() {

			var workspaceId = 102;

			var userId = 1002;

			var check = function(results) {
				expect(results).to.be.deep.equal(unauthorizedError);
			};

			var response = {
				status: 200,
				code: 2000,
				totalCount: 0
			};

			nock('https://api.zenginehq.com/v1')
				.get('/workspaces/102/members/count?user.id=1002')
				.reply(200, response);

			return user.isAuthorizedInWorkspace(workspaceId, userId).then(expect.fail, check);

		});

		it('should return TRUE without passing an user ID', function() {

			var workspaceId = 103;

			var check = function(results) {
				expect(results).to.be.true;
			};

			var responseOne = {
				status: 200,
				code: 2000,
				totalCount: 1,
				limit: 20,
				offset: 0,
				data: {
					id: 1003,
					resource: null
				}
			};

			nock('https://api.zenginehq.com/v1')
				.get('/users/me?attributes=id&related=null')
				.reply(200, responseOne);

			var responseTwo = {
				status: 200,
				code: 2000,
				totalCount: 1
			};

			nock('https://api.zenginehq.com/v1')
				.get('/workspaces/103/members/count?user.id=1003')
				.reply(200, responseTwo);

			return user.isAuthorizedInWorkspace(workspaceId).then(check, expect.fail);

		});

		it('should return FALSE without passing an user ID', function() {

			var workspaceId = 104;

			var check = function(results) {
				expect(results).to.be.deep.equal(unauthorizedError);
			};

			var responseOne = {
				status: 200,
				code: 2000,
				totalCount: 1,
				limit: 20,
				offset: 0,
				data: {
					id: 1004,
					resource: null
				}
			};

			nock('https://api.zenginehq.com/v1')
				.get('/users/me?attributes=id&related=null')
				.reply(200, responseOne);

			var responseTwo = {
				status: 200,
				code: 2000,
				totalCount: 0
			};

			nock('https://api.zenginehq.com/v1')
				.get('/workspaces/104/members/count?user.id=1004')
				.reply(200, responseTwo);

			return user.isAuthorizedInWorkspace(workspaceId).then(expect.fail, check);

		});

		it('should reject with an api error', function() {

			var workspaceId = 105;

			var userId = 1005;

			var check = function(results) {
				expect(results).to.be.deep.equal(apiError);
			};

			var response = {};

			nock('https://api.zenginehq.com/v1')
				.get('/workspaces/105/members/count?user.id=1005')
				.reply(400, response);

			return user.isAuthorizedInWorkspace(workspaceId, userId).then(expect.fail, check);

		});

	});

});
