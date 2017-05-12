'use strict';

// from https://github.com/Wizehive/anglerfish/blob/stage/app/js/core/services/zn-filter-matcher.js

var isEmpty = require('lodash.isempty');
var has = require('lodash.has');
var get = require('lodash.get');
var all = require('lodash.every');
var any = require('lodash.some');
var BigNumber = require('bignumber.js');

	var ruleFunctionMap = {
		'': 'ruleEquals',
		'not': 'ruleDoesNotEqual',
		'min': 'ruleMinimum',
		'max': 'ruleMaximum',
		'contains': 'ruleContains',
		'not-contains': 'ruleDoesNotContain',
		'starts-with': 'ruleStartsWith',
		'ends-with': 'ruleEndsWith'
	};

	/**
	 * Parse a numeric value from a record field input.
	 * Strips '$' and ',' characters. If the value is not a valid number
	 * after stripping characters, 0 is returned
	 */
	function parseNumber(input) {

		var formatted = String(input || '')
			.replace('$', '')
			.replace(',', '');

		return formatted;

	}

	var matchers = {
		ruleEquals: function(recordValue, ruleValue) {

			if (Array.isArray(recordValue)) {
				return false;
			}

			return String(ruleValue).toLowerCase() === String(recordValue).toLowerCase();

		},
		ruleDoesNotEqual: function(recordValue, ruleValue) {

			if (Array.isArray(recordValue)) {
				return false;
			}

			return String(ruleValue).toLowerCase() !== String(recordValue).toLowerCase();

		},
		ruleMinimum: function(recordValue, ruleValue) {

			if (Array.isArray(recordValue)) {
				return false;
			}

			if (recordValue === '') {
				return false;
			}

			// Do numeric comparison if filter rule value is numeric. For consistency with API,
			// record values are somewhat forgiving, while filter rules must be a valid number
			if (ruleValue && !isNaN(Number(ruleValue))) {
				recordValue = parseNumber(recordValue);

				try {
					ruleValue = new BigNumber(ruleValue);
					recordValue = new BigNumber(recordValue);

				} catch (err) {
					return false;
				}

				return recordValue.greaterThanOrEqualTo(ruleValue);
			}

			// Loose comparison; don't use 'localeCompare' because we only want to compare
			// numbers or well-formatted dates, which work with normal string comparison
			return recordValue >= ruleValue;
		},
		ruleMaximum: function(recordValue, ruleValue) {

			if (Array.isArray(recordValue)) {
				return false;
			}

			if (recordValue === '') {
				return false;
			}

			// Do numeric comparison if filter rule value is numeric. For consistency with API,
			// record values are somewhat forgiving, while filter rules must be a valid number
			if (ruleValue && !isNaN(Number(ruleValue))) {
				recordValue = parseNumber(recordValue);

				try {
					ruleValue = new BigNumber(ruleValue);
					recordValue = new BigNumber(recordValue);

				} catch (err) {
					return false;
				}

				return recordValue.lessThanOrEqualTo(ruleValue);

			}

			// Loose comparison; don't use 'localeCompare' because we only want to compare
			// numbers or well-formatted dates, which work with normal string comparison
			return recordValue <= ruleValue;

		},
		ruleContains: function(recordValue, ruleValue) {

			if (Array.isArray(recordValue)) {

				// Normalize Value as Array
				if (!Array.isArray(ruleValue)) {
					ruleValue = [ruleValue];
				}

				// Loop Array of Values
				for (var index = 0; index < ruleValue.length; index++) {

					// Value Not Found in Record
					if (recordValue.indexOf(ruleValue[index]) === -1) {
						return false;
					}

				}

				return true;

			} else {
				return String(recordValue).indexOf(String(ruleValue)) !== -1;
			}


		},
		ruleDoesNotContain: function(recordValue, ruleValue) {

			return !matchers.ruleContains(recordValue, ruleValue);

		},
		ruleStartsWith: function(recordValue, ruleValue) {

			if (Array.isArray(recordValue)) {
				return false;
			}

			return String(recordValue).startsWith(String(ruleValue));
		},
		ruleEndsWith: function(recordValue, ruleValue) {

			if (Array.isArray(recordValue)) {
				return false;
			}

			return String(recordValue).endsWith(String(ruleValue));
		}
	};

	function getConditionValues(condition) {

		if (typeof condition.value === 'string' && condition.value.indexOf('|') !== -1) {
			return condition.value.split('|');
		}

		if (condition.value === 'null' || condition.value === null) {
			return [''];
		}

		return [condition.value];

	}

	function getRecordObjValue(value) {
		if (value.value !== undefined) {
			// file-upload
			return value.value;
		}
		if (value.id !== undefined) {
			// linked and member
			return value.id;
		}
	}

	function getRecordValue(record, condition) {
		var recordValue = get(record, condition.attribute);
		if (recordValue === null || recordValue === undefined) {
			return '';
		}
		if (recordValue instanceof Object) {
			return getRecordObjValue(recordValue);
		}
		return recordValue;
	}

	function isFilter(condition) {
		return has(condition, 'and') || has(condition, 'or');
	}

	function isSubfilter(condition) {
		return condition.filter !== undefined;
	}

	function isDynamicCondition(condition) {
		return typeof condition.value === 'string' &&
			condition.value.split('|').indexOf('logged-in-user') !== -1;
	}

	function assertSupportedCondition(condition) {
		if (isSubfilter(condition)) {
			throw new Error("Subfilter matching is not supported");
		}
		if (isDynamicCondition(condition)) {
			throw new Error("Dynamic filter conditions are not supported");
		}
	}

	function recordMatchesValueCondition(record, condition) {
		var recordValue = getRecordValue(record, condition);
		var expectedValues = getConditionValues(condition);

		var match = matchers[
			ruleFunctionMap[condition.prefix]
		];
		var valueMatches = function(expectedValue) {
			return match(recordValue, expectedValue);
		};
		return any(expectedValues, valueMatches);
	}

	function recordMatchesFilter(record, filter) {

		var aggregationType = Object.keys(filter)[0];
		var conditions = filter[aggregationType];

		var matches = function(condition) {
			assertSupportedCondition(condition);

			if (isFilter(condition)) {
				return recordMatchesFilter(record, condition);
			}
			return recordMatchesValueCondition(record, condition);
		};

		if (isEmpty(conditions)) {
			return true;
		}

		if (aggregationType === 'and') {
			return all(conditions, matches);
		}

		if (aggregationType === 'or') {
			return any(conditions, matches);
		}
	}

module.exports = {
	recordMatchesFilter: recordMatchesFilter,
};
