'use strict';

var createData = require('./src/data');
var createRouter = require('./src/router');

var createZnHttpFake = require('./src/fake/zn-http-fake');
var createFirebaseFake = require('./src/fake/firebase-fake');

module.exports = {
    data: createData,
    router: createRouter,
    znHttpFake: createZnHttpFake,
    firebaseFake: createFirebaseFake
};
