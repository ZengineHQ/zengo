'use strict';

var get = require('lodash.get');
var find = require('lodash.find');
var findIndex = require('lodash.findindex');
var merge = require('lodash.merge');
var orderBy = require('lodash.orderby');
var query = require('./zn-http-fake-query');
var isArray = Array.isArray;
var forEach = require('lodash.foreach');


var fakeDao = function(datum) {

	var dao = {};

	datum = datum || {};

	var getLastId = function(data) {

		if (!data || !data.length) {
			return 0;
		}

		var ordered = orderBy(data, 'id');

		var lastIndex = ordered.length - 1;

		var lastId = ordered[lastIndex].id;

		return lastId;

	};

	var batchSave = function(datum, dataToSave, lastId) {

		var savedIds = [];

		forEach(dataToSave, function(data) {

			var existing;

			if (data.hasOwnProperty('id')) {
				existing = find(datum, { 'id': parseInt(data.id) });
			}

			if (existing) {
				data = merge(existing, data);
				savedIds.push(data.id);
				return;
			}

			data.id = ++lastId;
			savedIds.push(data.id);
			datum.push(data);

		});

		return savedIds;

	};

	dao.queryResource = function(options) {

		var data = get(datum, options.namedParams.resource);

		data = query.filter(data, options.params);
		data = query.sortAndPaginate(data, options.params);
		data = query.project(data, options.params);

		return {
			status: 200,
			code: 2000,
			limit: 20,
			offset: 0,
			totalCount: query.count(data),
			data: data || []
		};

	};

	dao.querySubResource = function(options) {

		var data = get(datum, options.namedParams.resource);

		data = find(data, { 'id': parseInt(options.namedParams.resourceId) });

		data = get(data, options.namedParams.subResource);

		data = query.filter(data, options.params);
		data = query.sortAndPaginate(data, options.params);
		data = query.project(data, options.params);

		return {
			status: 200,
			code: 2000,
			limit: 20,
			offset: 0,
			totalCount: query.count(data),
			data: data || []
		};

	};

	dao.getResource = function(options) {

		var data = get(datum, options.namedParams.resource);

		data = find(data, { 'id': parseInt(options.namedParams.resourceId) });

		data = query.project(data, options.params);

		return {
			status: 200,
			code: 2000,
			limit: 20,
			offset: 0,
			totalCount: query.count(data),
			data: data || {}
		};

	};

	dao.getSubResource = function(options) {

		var data = get(datum, options.namedParams.resource);

		data = find(data, { 'id': parseInt(options.namedParams.resourceId) });

		data = get(data, options.namedParams.subResource);

		data = find(data, { 'id': parseInt(options.namedParams.subResourceId) });

		return {
			status: 200,
			code: 2000,
			limit: 20,
			offset: 0,
			totalCount: query.count(data),
			data: data || {}
		};

	};

	dao.countResource = function(options) {

		var data = get(datum, options.namedParams.resource);

		data = query.filter(data, options.params);

		return {
			status: 200,
			code: 2000,
			totalCount: query.count(data)
		};

	};

	dao.countSubResource = function(options) {

		var data = get(datum, options.namedParams.resource);

		data = find(data, { 'id': parseInt(options.namedParams.resourceId) });

		data = get(data, options.namedParams.subResource);

		data = query.filter(data, options.params);

		return {
			status: 200,
			code: 2000,
			totalCount: query.count(data)
		};

	};

	dao.saveResource = function(dataToSave, options) {

		var data = get(datum, options.namedParams.resource);

		if (!data) {
			datum[options.namedParams.resource] = [];
			data = datum[options.namedParams.resource];
		}

		var lastId = getLastId(data);

		if (isArray(dataToSave)) {
			return batchSave(data, dataToSave, lastId);
		}

		if (!dataToSave.hasOwnProperty('id')) {
			dataToSave.id = ++lastId;
		}

		data.push(dataToSave);

		return dataToSave;

	};

	dao.saveSubResource = function(dataToSave, options) {

		var data = get(datum, options.namedParams.resource);

		data = find(data, { 'id': parseInt(options.namedParams.resourceId) });

		if (!data) {
			return;
		}

		data = get(data, options.namedParams.subResource);

		if (!data) {
			data = get(datum, options.namedParams.resource);
			data = find(data, { 'id': parseInt(options.namedParams.resourceId) });
			data[options.namedParams.subResource] = [];
			data = data[options.namedParams.subResource];
		}

		var lastId = getLastId(data);

		if (isArray(dataToSave)) {
			return batchSave(data, dataToSave, lastId);
		}

		if (!dataToSave.hasOwnProperty('id')) {
			dataToSave.id = ++lastId;
		}

		data.push(dataToSave);

		return dataToSave;

	};

	dao.updateResource = function(dataToSave, options) {

		var data = get(datum, options.namedParams.resource);

		data = find(data, { 'id': parseInt(options.namedParams.resourceId) });

		if (!data) {
			return;
		}

		data = merge(data, dataToSave);

		return data;

	};

	dao.updateSubResource = function(dataToSave, options) {

		var data = get(datum, options.namedParams.resource);

		data = find(data, { 'id': parseInt(options.namedParams.resourceId) });

		data = get(data, options.namedParams.subResource);

		data = find(data, { 'id': parseInt(options.namedParams.subResourceId) });

		if (!data) {
			return;
		}

		data = merge(data, dataToSave);

		return data;

	};

	dao.deleteResource = function(options) {

		// todo: support batch delete

		var data = get(datum, options.namedParams.resource);

		if (!data) {
			return;
		}

		var index = findIndex(data, { 'id': parseInt(options.namedParams.resourceId) });

		if (index !== -1) {
			data.splice(index, 1);
		}

		return;

	};

	dao.deleteSubResource = function(options) {

		// todo: support batch delete

		var data = get(datum, options.namedParams.resource);

		data = find(data, { 'id': parseInt(options.namedParams.resourceId) });

		data = get(data, options.namedParams.subResource);

		if (!data) {
			return;
		}

		var index = findIndex(data, { 'id': parseInt(options.namedParams.subResourceId) });

		if (index !== -1) {
			data.splice(index, 1);
		}

		return;

	};

	return dao;

};

module.exports = fakeDao;
