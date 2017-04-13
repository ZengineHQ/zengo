'use strict';

var nock = require('nock');

var ZnHttp = require('../lib/zn-http.js');

var ZnApi = require('../src/zn-api.js');

var instantiateZnHttp = function() {
	var options = {
		headers: {}
	};
	ZnHttp(options).parseHeaders();
	return new ZnHttp();
};

var instantiateZnApi = function() {
	var znHttp = instantiateZnHttp();
	return ZnApi(znHttp);
};

var nockOnZengineApi = function() {
	return nock('https://api.zenginehq.com/v1');
};

module.exports = {
	ZnApi: instantiateZnApi,
	ZnNock: nockOnZengineApi
};
