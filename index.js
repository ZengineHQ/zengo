'use strict';

var createData = require('./src/data.js');
var createZnHttpFake = require('./src/fake/zn-http-fake.js');
var createFirebaseFake = require('./src/fake/firebase-fake.js');

module.exports = {
    data: createData,
    znHttpFake: createZnHttpFake,
    firebaseFake: createFirebaseFake
};
