'use strict';

var get = require('lodash.get');
var forEach = require('lodash.foreach');

var queryUtil = {};

var reservedQueryParams = [
	'page',
	'limit',
	'sort',
	'direction',
	'filter', // only on form records endpoint
	'attributes',
	'related',
	'timezone'
];

var filterPrefixes = [
	'not',
	'contains',
	'not-contains',
	'starts-with',
	'ends-with',
	'min',
	'max'
];

queryUtil.getPaginateParams = function(params) {

	var paginate = {
		page: get(params, 'page') || 1,
		limit: get(params, 'limit') || 20

	};

	return paginate;

};

// todo: needs to support php array like params
// sort[0]=1,sort[1]=2 direction[0]=asc,direction[1]=desc
queryUtil.getSortingParams = function(params) {

	var sorting = {
		sort: get(params, 'sort') || 'id',
		direction: get(params, 'direction') || 'asc'
	};

	return sorting;

};

queryUtil.getFilterParam = function(params) {

	var filter = get(params, 'filter');

	if (typeof filter === 'string') {
		try { filter = JSON.parse(filter); } catch(e) {}
	}

	return filter ? filter : undefined;
};

queryUtil.getAttributesParam = function(params) {

	var attributes = get(params, 'attributes');

	if (attributes) {
		attributes = attributes.split(',');
	}

	return attributes ? attributes : undefined;

};

// todo: should not be undefined if ?related=null
// the api will remove related data in this case
queryUtil.getRelatedParam = function(params) {

	var related = get(params, 'related');

	if (related && related.includes(',')) {
		related = related.split(',');
	}

	return related ? related : undefined;

};

queryUtil.getTimezoneParam = function(params) {

	var timezone = get(params, 'timezone');

	return timezone ? timezone : undefined;
};

queryUtil.getQueryParamsFilter = function(allParams) {

	var params = {};

	forEach(allParams, function(paramValue, paramName) {
		if (reservedQueryParams.indexOf(paramName) === -1) {
			params[paramName] = paramValue;
		}
	});

	var conditions = [];

	forEach(params, function(paramValue, paramName) {

		var prefix = '';
		var attribute = paramName;
		var value = paramValue;

		forEach(filterPrefixes, function(filterPrefix) {
			if (paramName.startsWith(filterPrefix + '-')) {
				prefix = filterPrefix;
				attribute = paramName.substr(filterPrefix.length + 1);
			}
		});

		var hasPipes = value.toString().indexOf('|') > -1;

		if (hasPipes) {

			var values = value.split('|');
			var subConditions = [];

			forEach(values, function(value) {
				subConditions.push({
					prefix: prefix,
					attribute: attribute,
					value: value
				});
			});

			var operator = 'or',
				condition = {};

			if (prefix.indexOf('not') !== -1) {
				operator = 'and';
			}

			condition[operator] = subConditions;

			conditions.push(condition);

			return;

		}

		conditions.push({
			prefix: prefix,
			attribute: attribute,
			value: value
		});


	});

	return conditions.length ? { and: conditions } : undefined;

};

module.exports = queryUtil;
