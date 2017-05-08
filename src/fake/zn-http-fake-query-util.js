'use strict';

var get = require('lodash.get');
var attribute = require('../attribute');
var forEach = require('lodash.forEach');

var queryUtil = {};

var reservedParams = [
	'page',
	'limit',
	'sort',
	'direction',
	'filter', // only on form records
	'attributes',
	'related',
	'timezone'
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

	return filter ? filter : undefined;
};

queryUtil.getAttributesParam = function(params) {

	var attributes = get(params, 'attributes');

	if (attributes && attributes.includes(',')) {
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

queryUtil.getConditionalParams = function(params) {

	// todo: add support for all
	//
	// ?attribute=value: attribute equals value
	// ?not-attribute=value: attribute does not equal value
	// ?contains-attribute=value: attribute contains value
	// ?not-contains-attribute=value: attribute does not contain value
	// ?starts-with-attribute=value: attribute starts with value
	// ?ends-with-attribute=value: attribute ends with value
	// ?min-attribute=5: attribute is at least 5
	// ?max-attribute=10: attribute is no more than 10

	var conditions = [];

	forEach(params, function(paramValue, paramName) {

		// /^field[0-9]+/
		if (attribute.isField(paramName) && get(params, paramName)) {
			var condition = {
				prefix: '',
				attribute: paramName,
				value: paramValue
			};
			conditions.push(condition);
		}

	});

	return conditions.length ? conditions : undefined;

};

queryUtil.conditionalParamsToFilter = function(params) {
	return {and:[{}]};
};

module.exports = queryUtil;
