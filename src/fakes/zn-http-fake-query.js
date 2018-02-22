'use strict';

var util = require('./zn-http-fake-query-util');
var orderBy = require('lodash.orderby');
var forEach = require('lodash.foreach');
var recordMatchesFilter = require('zn-filter-matcher').recordMatchesFilter;

var fakeQuery = {};

fakeQuery.filter = function(data, params) {

	// todo: needs a lot of work to be close
	// to what the api does

	var filter;

	filter = util.getFilterParam(params);

	if (!filter) {
		filter = util.getQueryParamsFilter(params);
	}

	if (filter) {
		data = data.filter(function(record) {
			return recordMatchesFilter(record, filter, {subfiltering: true});
		});
	}

	return data;

};

fakeQuery.sortAndPaginate = function(data, params) {

	// todo: needs to support php array like params
	// sort[0]=id,sort[1]=name direction[0]=asc,direction[1]=desc
	var sorting = util.getSortingParams(params);

	if (sorting) {
		data = orderBy(data, sorting.sort, sorting.direction);
	}

	var paginate = util.getPaginateParams(params);

	if (data && paginate) {

		var page = paginate.page || 1;

		var limit = paginate.limit || 20;

		--page;

		data = data.slice(page * limit, (page + 1) * limit);

	}

	return data;

};

fakeQuery.project = function(data, params) {

	var attributes = util.getAttributesParam(params);

	// todo: for now no support for projecting `related`
	// when implemented it needs to understand when an
	// attribute represents a related data before
	// removing attributes

	forEach(data, function(obj, index) {

		if (attributes) {

			attributes.push('id'); // implicit

			data[index] = attributes.reduce(function(result, key) {
				result[key] = obj[key];
				return result;
			}, {});

		}

	});

	return data;

};

fakeQuery.timezone = function(data, params) {

	// todo: small chance for use case but
	// if we decide to implement also needs
	// a small timezone module to convert

	return data;

};

fakeQuery.count = function(data) {

	if (!!data && data.constructor === Array) {
		return data.length || 0;
	}

	if (!!data && data.constructor === Object) {
		return 1;
	}

	return 0;

};

module.exports = fakeQuery;
