'use strict';

var createAttribute = require('./attribute');
var createRecord = require('./record');
var createUser = require('./user');

module.exports = {
	attribute: createAttribute,
	record: createRecord,
	user: createUser
};
