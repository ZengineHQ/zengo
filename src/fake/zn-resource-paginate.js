'use strict';

var orderBy = require('lodash.orderby');

var respond = require('./zn-http-fake-util').respond;

var paginate = function(resources) {
	var data = orderBy(resources, 'id');
	return respond(data);
};

module.exports = paginate;
