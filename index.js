'use strict';

var createCore = require('./src/core');
var createData = require('./src/data');
var createRouter = require('./src/router');
var createWebhooks = require('./src/webhooks');
var createZnHttpFake = require('./src/fake/zn-http-fake');
var createFirebaseFake = require('./src/fake/firebase-fake');

module.exports = {
	core: createCore,
    data: createData,
    router: createRouter,
    webhooks: createWebhooks,
    znHttpFake: createZnHttpFake,
    firebaseFake: createFirebaseFake
};
