'use strict';

var Promise = require('bluebird');
var set = require('lodash.set');
var get = require('lodash.get');
var isObject = require('lodash.isobject');
var query = require('./zn-http-fake-query');

var fakeDao = function(collection) {

	var dao = {};

	collection = collection || {};

	dao.get = function(endpoint, params) {

		// todo remove /count from endpoint

		return new Promise(function(resolve, reject) {

			var data = get(collection, endpoint);

			if (isObject(data)) {

				data = query(data, params)
					.restrictToAttributes()
					.restrictToRelated()
					.getResults();

			} else {

				data = query(data, params)
					.filter()
					.paginate()
					.sort()
					.restrictToAttributes()
					.restrictToRelated()
					.getResults();

			}

			resolve(data);

		});

	};

	dao.post = function(endpoint, data) {

		return new Promise(function(resolve, reject) {

			// todo: needs to act like the api and support
			// batch saves that creates or updates

			// todo: needs to act like the api and return
			// only ids

			// todo: needs to `set` or `push`

			set(collection, endpoint, data);

			resolve(data);

		});

	};

	dao.put = function(endpoint, data) {

		// todo use `set` or `push`

		return Promise.resolve();

	};

	dao.del = function(endpoint, params) {

		// todo use `remove` or `unset`

		return Promise.resolve();

	};

	return dao;

};

module.exports = fakeDao;
