'use strict';

var Promise = require('bluebird');
var includes = require('lodash.includes');

var InvalidWebhookSecretError = function() {
    this.name = 'InvalidWebhookSecret';
    this.message = 'Invalid Webhook Secret';
    this.status = 401;
};

InvalidWebhookSecretError.prototype = Object.create(Error.prototype);
InvalidWebhookSecretError.prototype.constructor = InvalidWebhookSecretError;


var createWebhooksModule = function() {

	var webhooks = {};

	webhooks.validateSecret = function(secret, allowedSecrets) {

		if (!includes(allowedSecrets, secret)) {
			throw new InvalidWebhookSecretError();
		}

		return Promise.resolve(true);

	};

	return webhooks;

};

module.exports = createWebhooksModule;
