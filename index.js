'use strict';

var createCore = require('./src/core');
var createData = require('./src/data');
var createRouter = require('./src/router');
var createWebhooks = require('./src/webhooks');
var createZnHttpFake = require('./src/fakes/zn-http-fake');
var createFirebaseFake = require('./src/fakes/firebase-fake');
var createFakes = require('./src/fakes');

module.exports = {
	core: createCore,
    data: createData,
    fakes: createFakes,
	router: createRouter,
    webhooks: createWebhooks,
	// todo: these two fakes needs to get remove in major version
    znHttpFake: createZnHttpFake,
    firebaseFake: createFirebaseFake
};
