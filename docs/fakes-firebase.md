A fake of `Firebase` to help testing backend services.

No real requests are made to Firebase all data is read and written in memory.

!> This do not provide full support and compatibility with Firebase.

### set

Arguments

Name          | Type              | Required    | Description
--------------|-------------------|-------------|----------------------
value         | Any valid JS type | &check;     | Value to set
callback      | Function          | *Optional*  | A callback function

This method do not return a value.

Example

```js

var Firebase = require('zengo').fakes.firebase;

var fb;

beforeEach(function() {
	fb = new Firebase();
});

it('should be able to set data', function() {

	var ref = fb.child('test');

	var data = { test: 1 };

	ref.set(data, function() {

		var expected = { test: data };

		expect(ref.data).to.deep.equal(expected);

	});

});

```

### once

Arguments

Name          | Type              | Required    | Description
--------------|-------------------|-------------|----------------------
value         | Any valid JS type | &check;     | Value to set
callback      | Function          | *Optional*  | A callback function

Returns an `Object` with all data stored or to a specific path.

Example

```js

var Firebase = require('zengo').fakes.firebase;

var fb;

beforeEach(function() {
	fb = new Firebase();
});

it('should be able to get data with `once`', function() {
	
	var ref = fb.child('test');

	var data = { test: 1 };

	ref.set(data);

	ref.once('event', function(snapshot) {
		expect(snapshot.val()).to.deep.equal(data);
	});

});

```

### child

Arguments

Name          | Type              | Required    | Description
--------------|-------------------|-------------|----------------------
path          | String            | &check;     | A data path

Returns an `Object` with all data stored or to a specific path.

Example

```js

var Firebase = require('zengo').fakes.firebase;

it('should initialize with data pre loaded', function() {

	var data = {
		settings: {
			forms: {
				id: 1
			}
		}
	};

	var firebase = new Firebase(null, data);

	var ref = firebase.child('settings/forms');

	ref.once('value', function(snapshot) {
		expect(snapshot.val()).to.be.eql({id: 1});
	});

});

```
