'use strict';

var createData = require('./src/data.js');
var createZnHttpFake = require('./src/fake/zn-http-fake.js');

module.exports = {
    data: createData,
    znHttpFake: createZnHttpFake,
};
