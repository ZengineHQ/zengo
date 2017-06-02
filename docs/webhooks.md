# Webhooks

The `webhooks` module provides functionality for webhooks.

### validateSecret

Arguments

Name            | Type            | Required  | Description
----------------|-----------------|-----------|----------------------
secret          | String          | &check;   | The secret to validate
allowedSecrets  | Array, String   | &check;   | Allowed secrets

Returns an instance of `Promise` resolved to `true` on success
or throw an `InvalidWebhookSecretError` exception on error.

!> In the future instead of throwing the exception it will reject the `Promise` and return false

Example

```js
var webhooks = require('zengo').webhooks;

var secret = 'test123';

var allowedSecrets = ['test123', 'super-secret'];

webhooks.validateSecret(secret, allowedSecrets).then(function() {
  console.log('The secret is valid...');
});

```
