'use strict';

var find = require('lodash.find');
var isObject = require('lodash.isobject');
var reduce = require('lodash.reduce');

var isKey = function(key) {
	return function(paramValue, paramKey) {
		return paramKey === key;
	};
};

var isSimpleValue = function(paramValue) {
	return !isObject(paramValue) || Array.isArray(paramValue);
};

var joinWith = function(separator) {
	return function(paramValue) {
		if (Array.isArray(paramValue)) {
			return paramValue.join(separator);
		}
		return paramValue;
	};
};

var assembleFilter = function(paramValue) {
	if (isObject(paramValue)) {
		return JSON.stringify(paramValue);
	}
	return paramValue;
};

var assembleObject = function(assembled, obj, objName) {
	var addObjectKey = function(assembled, value, key) {
		assembled[objName + '.' + key] = value;
		return assembled;
	};
	return reduce(obj, addObjectKey, assembled);
};

var assemblers = [
	{
		when: isKey('related'),
		assemble: joinWith(','),
	},
	{
		when: isKey('attributes'),
		assemble: joinWith(','),
	},
	{
		when: isKey('filter'),
		assemble: assembleFilter,
	},
	{
		when: isSimpleValue,
		assemble: joinWith('|'),
	},
];

var assembleParam = function(assembled, paramValue, paramKey) {

	var assembler = find(assemblers, function(assembler) {
		return assembler.when(paramValue, paramKey);
	});

	if (assembler) {
		assembled[paramKey] = assembler.assemble(paramValue);
		return assembled;
	}

	return assembleObject(assembled, paramValue, paramKey);
};

var assembleParams = function(params) {
	return reduce(params, assembleParam, {});
};

module.exports = assembleParams;
