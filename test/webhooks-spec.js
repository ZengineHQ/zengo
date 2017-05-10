'use strict';

describe('Webhooks', function() {

	var Webhooks = require('../').webhooks;

	var webhooks;

	beforeEach(function() {
		webhooks = Webhooks();
	});

	it('should validate a secret with single or multiple allowed secrets', function() {

		var singleSecret = 'test123';

		var multiSecrets = [singleSecret];

		var secret = singleSecret;

		var assertToTrue = function(results) {
			expect(results).to.be.true;
		};

		var testSingleSecret = function() {
			return webhooks.validateSecret(secret, singleSecret).then(assertToTrue);
		};

		var testMultiSecrets = function() {
			return webhooks.validateSecret(secret, multiSecrets).then(assertToTrue);
		};

		return testSingleSecret().then(testMultiSecrets);

	});

	it('should throw an exception for an invalid secret', function() {

		var secret = 'invalid';

		var allowedSecret = 'test123';

		var check = function() {
			return webhooks.validateSecret(secret, allowedSecret);
		};

		expect(check).to.throw('InvalidWebhookSecret');

		try {
			check();
		} catch (e) {
			expect(e.name).to.be.equal('InvalidWebhookSecret');
			expect(e.message).to.be.equal('Invalid Webhook Secret');
			expect(e.status).to.be.equal(401);
		}

	});

});
