'use strict';

var createData = require('./src/data.js');
var createZnHttpFake = require('./src/fake/zn-http-fake.js');
var createRouter = require('./src/router');

module.exports = {
    data: createData,
    znHttpFake: createZnHttpFake,
    router: createRouter
};
