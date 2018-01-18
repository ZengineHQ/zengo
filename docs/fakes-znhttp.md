
A fake of `znHttp` to help testing backend services.

No real requests are made to the Zengine API all data is read and written in memory.

!> This do not provide full support and compatibility with the Zengine API 
for advanced uses cases using batching requests, filtering and etc it is recommended to use [nock](https://github.com/node-nock/nock).

### get

Arguments

Name          | Type            | Required    | Description
--------------|-----------------|-------------|----------------------
endpoint      | String          | &check;     | URL path
options       | Object          | *Optional*  | An object with request options

Returns a `Promise`

Example

```js

it('should return data for /:resource', function() {

	var datum = {
		workspaces: [
			{
				id: 1,
				name: 'Workspace1'
			},
			{
				id: 2,
				name: 'Workspace2'
			}
		]
	};

	var znHttpFake = zengo.fakes.znHttp(datum);

	var api = Api(znHttpFake);

	var check = function(results) {
		expect(results).to.be.eql([{id:1, name:'Workspace1'}, {id:2, name:'Workspace2'}]);
	};

	return api.get('/workspaces').then(check);

});

```

### post

Arguments

Name          | Type            | Required    | Description
--------------|-----------------|-------------|----------------------
endpoint      | String          | &check;     | URL path
data          | Object          | &check;     | Request payload
options       | Object          | *Optional*  | An object with request options

Returns a `Promise`

Example

```js

it('should save data for /:resource when resource does not exists', function() {

	var datum = {};

	var data = {
		name: 'Workspace1'
	};

	var znHttpFake = zengo.fakes.znHttp(datum);

	var api = Api(znHttpFake);

	var save = function() {
		return api.post('/workspaces', data);
	};

	var checkResponse = function(results) {
		expect(results).to.be.eql({id:1, name:'Workspace1'});
	};

	var getData = function() {
		return api.get('/workspaces');
	};

	var checkData = function(results) {
		expect(results).to.be.eql([{id:1, name:'Workspace1'}]);
	};

	return save().then(checkResponse).then(getData).then(checkData);

});

```

### put

Arguments

Name          | Type            | Required    | Description
--------------|-----------------|-------------|----------------------
endpoint      | String          | &check;     | URL path
data          | Object          | &check;     | Request payload
options       | Object          | *Optional*  | An object with request options

Returns a `Promise`

Example

```js

it('should save data for /:resource/:resourceId', function() {

	var datum = {
		workspaces: [
			{ id: 1, name: 'Workspace1' },
			{ id: 2, name: 'Workspace2' },
			{ id: 4, name: 'Workspace4' }
		]
	};

	var data = {
		name: 'Workspace2 updated'
	};

	var znHttpFake = zengo.fakes.znHttp(datum);

	var api = Api(znHttpFake);

	var save = function() {
		return api.put('/workspaces/2', data);
	};

	var checkResponse = function(results) {
		expect(results).to.be.eql({id:2, name:'Workspace2 updated'});
	};

	var getData = function() {
		return api.get('/workspaces');
	};

	var checkData = function(results) {
		var expected = [
			{ id: 1, name: 'Workspace1' },
			{ id: 2, name: 'Workspace2 updated' },
			{ id: 4, name: 'Workspace4' }
		];
		expect(results).to.be.eql(expected);
	};

	return save().then(checkResponse).then(getData).then(checkData);

});

```

### del

Arguments

Name          | Type            | Required    | Description
--------------|-----------------|-------------|----------------------
endpoint      | String          | &check;     | URL path
options       | Object          | *Optional*  | An object with request options

Returns a `Promise`

Example

```js

it('should delete data for /:resource/:resourceId', function() {

	var datum = {
		workspaces: [
			{ id: 1, name: 'Workspace1' },
			{ id: 2, name: 'Workspace2' },
			{ id: 4, name: 'Workspace4' }
		]
	};

	var znHttpFake = zengo.fakes.znHttp(datum);

	var api = Api(znHttpFake);

	var del = function() {
		return api.del('/workspaces/2');
	};

	var checkReponse = function(results) {
		expect(results).to.be.undefined;
	};

	var getData = function() {
		return api.get('/workspaces');
	};

	var checkData = function(results) {
		var expected = [
			{ id: 1, name: 'Workspace1' },
			{ id: 4, name: 'Workspace4' }
		];
		expect(results).to.be.eql(expected);
	};

	return del().then(checkReponse).then(getData).then(checkData);

});


```
