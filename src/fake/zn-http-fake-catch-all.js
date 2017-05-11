'use strict';

var Promise = require('bluebird');
var RoutePattern = require('route-pattern');
var get = require('lodash.get');
var isObject = require('lodash.isobject');
var forEach = require('lodash.foreach');
var find = require('lodash.find');
var findIndex = require('lodash.findindex');
var merge = require('lodash.merge');
var orderBy = require('lodash.orderby');
var query = require('./zn-http-fake-query');

var fakeDao = function(datum) {

	var dao = {};

	datum = datum || {};

	var getNamedParams = function(endpoint) {

		var patterns = [
			'/:resource',
			'/:resource/:resourceId',
			'/:resource/:resourceId/:subResource',
			'/:resource/:resourceId/:subResource/:subResourceId'
		];

		var namedParams;

		forEach(patterns, function(pattern) {
			pattern = RoutePattern.fromString(pattern);
			namedParams = pattern.match(endpoint) ? pattern.match(endpoint).namedParams : namedParams;
		});

		return namedParams;

	};

	var getPath = function(endpoint) {

		var data;

		var namedParams = getNamedParams(endpoint);

		if (!namedParams) {
			return data;
		}

		data = get(datum, namedParams.resource);

		if (!namedParams.resourceId || namedParams.resourceId === 'count') {
			return data;
		}

		data = find(data, { 'id': parseInt(namedParams.resourceId) });

		if (!namedParams.subResource) {
			return data;
		}

		data = get(data, namedParams.subResource);

		if (!namedParams.subResourceId || namedParams.subResourceId === 'count') {
			return data;
		}

		data = find(data, { 'id': parseInt(namedParams.subResourceId) });

		return data;

	};

	var getLastIdAndIndex = function(data) {

		if (!data) {
			return { id: 0 };
		}

		var ordered = orderBy(data, 'id');

		var lastIndex = ordered.length - 1;

		var lastId = ordered[lastIndex].id;

		return { id: lastId, index: lastIndex };

	};

	dao.get = function(endpoint, options) {

		var data = getPath(endpoint);

		var params = get('options', 'params');

		if (endpoint && endpoint.endsWith('/count')) {

			data = query.filter(data, params);
			data = query.count(data);

			return {
				status: 200,
				code: 2000,
				totalCount: data
			};

		}

		else if (isObject(data) && !Array.isArray(data)) {

			data = query.project(data, params);
			data = data || {};

		}

		else if (Array.isArray(data)) {

			data = query.filter(data, params);
			data = query.sortAndPaginate(data, params);
			data = query.project(data, params);
			data = data || [];

		}

		return {
			status: 200,
			code: 2000,
			limit: 20,
			offset: 0,
			totalCount: query.count(data),
			data: data
		};

	};

	dao.post = function(endpoint, dataToSave, options) {

		// todo: support batch saves (create/updates)

		if (!dataToSave) {
			return;
		}

		var namedParams = getNamedParams(endpoint);

		if (!namedParams) {
			return;
		}

		// /resource/resourceId
		if (namedParams.resourceId && !namedParams.subResource) {
			return;
		}

		// /resource/resourceId/subResource/subResourceId
		if (namedParams.subResource && namedParams.subResourceId) {
			return;
		}

		var data = getPath(endpoint);

		// /resource (new)
		if (!data && !namedParams.resourceId) {
			dataToSave.id = 1;
			datum[namedParams.resource] = [dataToSave];
			return dataToSave;
		}

		var last = getLastIdAndIndex(data);

		if (!dataToSave.hasOwnProperty('id')) {
			dataToSave.id = ++last.id;
		}

		// /resource/resourceId/subResource (new)
		if (!data && namedParams.subResource) {
			data = getPath(['/', namedParams.resource, namedParams.resourceId].join('/'));
			data[namedParams.subResource] = [];
			data = data[namedParams.subResource];
		}

		data.push(dataToSave);

		return dataToSave;

	};

	dao.put = function(endpoint, dataToSave, options) {

		if (!dataToSave) {
			return;
		}

		var namedParams = getNamedParams(endpoint);

		if (!namedParams) {
			return;
		}

		var data = getPath(endpoint);

		// /resource/resourceId
		if (data && namedParams.resourceId && !namedParams.subResource) {
			data = merge(data, dataToSave);
		}

		// /resource/resourceId/subResource/subResourceId
		if (data && namedParams.subResourceId) {
			data = merge(data, dataToSave);
		}

		return data;

	};

	dao.del = function(endpoint, options) {

		// todo: support batch delete

		var namedParams = getNamedParams(endpoint);

		if (!namedParams) {
			return;
		}

		// /resource
		if (!namedParams.resourceId) {
			return;
		}

		// /resource/resourceId/subResource
		if (namedParams.subResource && !namedParams.subResourceId) {
			return;
		}

		var path = namedParams.subResourceId ?
			['/', namedParams.resource, namedParams.resourceId, namedParams.subResource] :
			['/', namedParams.resource];

		var data = getPath(path.join('/'));

		if (!data) {
			return;
		}

		var id = namedParams.subResourceId || namedParams.resourceId;

		var index = findIndex(data, { 'id': parseInt(id) });

		data.splice(index, 1);

		return;

	};

	dao.catchAll = function(method, endpoint, optionsOrData, options) {

		// won't work for everything
		// the general idea is to support common api operations for the following
		// resources
		//
		// /:resource
		// /:resource/count
		// /:resource/:resourceId
		// /:resource/:resourceId/:subResource
		// /:resource/:resourceId/:subResource/count
		// /:resource/:resourceId/:subResource/:subResourceId
		//
		// a list of all public available resources can be found in here:
		// https://github.com/Wizehive/sandy/blob/master/app/Console/Command/ApiDocsShell.php#L172
		//
		// for special resources it can be implemented using custom dao's

		switch (method) {

			case 'GET':
				return dao.get(endpoint, optionsOrData);

			case 'POST':
				return dao.post(endpoint, optionsOrData, options);

			case 'PUT':
				return dao.put(endpoint, optionsOrData, options);

			case 'DEL':
			case 'DELETE':
				return dao.del(endpoint, optionsOrData);

			default:
				return Promise.reject(new Error('ZnHttpFake(catchAll): unimplemented method: ' + method));

		}

	};

	return dao;

};

module.exports = fakeDao;
