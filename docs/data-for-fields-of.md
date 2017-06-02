

### get

Arguments

Name      | Type            | Required  | Description
----------|-----------------|-----------|----------------------
fieldId   | String, Number  | &check;   | Field Id

Returns a field `Object`.

Example

```js
var formId = 123;
var fields = require('zengo').data.forFieldsOf(formId);

fields.get(456).then(
  function(result) {
    // `result` is a field Object
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

Returns an `Array` of fields.

Example

```js
var formId = 123;
var fields = require('zengo').data.forFieldsOf(formId);

var params = {
  attributes: 'id, name',
  sort: 'id'
}

fields.query(params).then(
  function (result) {
    // `result` is an Array of fields
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
var fields = require('zengo').data.forFieldsOf(formId);

var data = { name: 'Field name' };

fields.save(data).then(
  function (result) {
    // `result` is an Object or Array of fields
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
var fields = require('zengo').data.forFieldsOf(formId);

forms.count().then(
  function (count) {
    // `count` is a Number
  },
  function(error) {
    // catch an error
  }
);
```
