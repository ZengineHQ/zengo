'use strict';

var createAttribute = require('./attribute');
var createRecord = require('./record');
var createForm = require('./form');

module.exports = {
	attribute: createAttribute,
	record: createRecord,
	form: createForm
};
