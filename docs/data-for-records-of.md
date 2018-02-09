

### get

Arguments

Name      | Type            | Required  | Description
----------|-----------------|-----------|----------------------
params    | Object          | &check;   | Object containing record id

Returns a record `Object`.

Example

```js
var formId = 123;
var records = require('zengo').data.forRecordsOf(formId);

records.get({id: 456}).then(
  function(result) {
    // `result` is a record Object
  },
  function(error) {
    // catch an error
  }
)
```

### query

Arguments

Name      | Type            | Required      | Description
----------|-----------------|---------------|----------------------
params    | Object          | *Optional*    | An object with [query params](https://zenginehq.github.io/developers/rest-api/conventions/querying-options/)

Returns an `Array` of records.

Example

```js
var formId = 123;
var records = require('zengo').data.forRecordsOf(formId);

var params = {
  attributes: 'id, name',
  sort: 'id'
}

records.query(params).then(
  function (result) {
    // `result` is an Array of records
  },
  function(error) {
    // catch an error
  }
);
```

### save

Arguments

Name      | Type            | Required  | Description
----------|-----------------|-----------|----------------------
data      | Object, Array   | &check;   | Data to be saved

Returns an `Object` when saving a single object or an `Array` when batch saving.

Example

```js
var formId = 123;
var records = require('zengo').data.forRecordsOf(formId);

var data = { name: 'Record name' };

records.save(data).then(
  function (result) {
    // `result` is an Object or Array of records
  },
  function(error) {
    // catch an error
  }
);
```

### delete

Arguments

Name      | Type            | Required  | Description
----------|-----------------|-----------|----------------------
params    | Object          | &check;   | Params to delete on

Returns a success code when deleting a single object or a `totalCount` when batch deleting.

Example

```js
var formId = 123;
var records = require('zengo').data.forRecordsOf(formId);

records.delete({ id: 456 }).then(
  function () {
    // success
  },
  function(error) {
    // catch an error
  }
);
```

### count

Arguments

Name      | Type            | Required      | Description
----------|-----------------|---------------|----------------------
params    | Object          | *Optional*    | An object with [query params](https://zenginehq.github.io/developers/rest-api/conventions/querying-options/)

Returns a `Number` with the total count.

Example

```js
var formId = 123;
var records = require('zengo').data.forRecordsOf(formId);

records.count().then(
  function (count) {
    // `count` is a Number
  },
  function(error) {
    // catch an error
  }
);
```
