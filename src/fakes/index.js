'use strict';

var createZnHttpFake = require('./zn-http-fake');
var createFirebaseFake = require('./firebase-fake');

module.exports = {
    znHttp: createZnHttpFake,
    firebase: createFirebaseFake
};
