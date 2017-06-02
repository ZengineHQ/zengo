
Routing for backend services.

!> For now the `router` only supports single path, `/test/nested` won't work
if you also have `/test` setup for the sample HTTP method

## dispatch

Arguments

Name          | Type      | Required  | Description
--------------|-----------|-----------|----------------------
eventData     | Object    | &check;   | An instance of `eventData`

Example

*/backend/my-plugin/plugin.js*

```js
'use strict';

var dispatch = require('./src/my-plugin-router.js');

exports.run = function(eventData) {
	dispatch(eventData);
};
```

*/backend/my-plugin/src/my-plugin-router.js*

```js
var router = require('zengo').router;

router.get('/test', function(request, response) {
    return Promise.resolve({message: 'Got GET request...'});
});

router.post('/test', function(request, response) {
    return Promise.resolve({message: 'Got POST request...'});
});

module.exports = router.dispatch;
```

## get

Arguments

Name          | Type      | Required  | Description
--------------|-----------|-----------|----------------------
path          | String    | &check;   | Url path for routing
callback      | Function  | &check;   | A callback

!> **Important** the callback needs to return an `Promise` instance

Example

```js
var router = require('zengo').router;

router.get('/test', function(request, response) {
    return Promise.resolve({message: 'Got GET request...'});
});
```

## post

Arguments

Name          | Type      | Required  | Description
--------------|-----------|-----------|----------------------
path          | String    | &check;   | Url path for routing
callback      | Function  | &check;   | A callback

!> **Important** the callback needs to return an `Promise` instance

Example

```js
var router = require('zengo').router;

router.post('/test', function(request, response) {
    return Promise.resolve({message: 'Got POST request...'});
});
```

## put

Arguments

Name          | Type      | Required  | Description
--------------|-----------|-----------|----------------------
path          | String    | &check;   | Url path for routing
callback      | Function  | &check;   | A callback

!> **Important** the callback needs to return an `Promise` instance

Example

```js
var router = require('zengo').router;

router.put('/test', function(request, response) {
    return Promise.resolve({message: 'Got PUT request...'});
});
```

## delete

Arguments

Name          | Type      | Required  | Description
--------------|-----------|-----------|----------------------
path          | String    | &check;   | Url path for routing
callback      | Function  | &check;   | A callback

!> **Important** the callback needs to return an `Promise` instance

Example

```js
var router = require('zengo').router;

router.delete('/test', function(request, response) {
    return Promise.resolve({message: 'Got DELETE request...'});
});
```
