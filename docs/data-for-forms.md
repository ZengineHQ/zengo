

### get

Arguments

Name      | Type            | Required  | Description
----------|-----------------|-----------|----------------------
formId    | String, Number  | &check;   | Form Id

Returns a form `Object`.

Example

```js
var forms = require('zengo').data.forForms();

forms.get(123).then(
  function(result) {
    // `result` is a form Object
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

Returns an `Array` of forms.

Example

```js
var forms = require('zengo').data.forForms();

var params = {
  attributes: 'id, name, fields',
  related: 'fields, permissions'
}

forms.query(params).then(
  function (result) {
    // `result` is an Array of forms
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
var forms = require('zengo').data.forForms();

var data = { name: 'Form name' };

forms.save(data).then(
  function (result) {
    // `result` is an Object or Array of forms
  },
  function(error) {
    // catch an error
  }
);
```

### count

Arguments

Name      | Type            | Required  | Description
----------|-----------------|-----------|----------------------
params    | Object          | *Optional*    | An object with [query params](https://zenginehq.github.io/developers/rest-api/conventions/querying-options/)

Returns a `Number` with the total count.

Example

```js
var forms = require('zengo').data.forForms();

forms.count().then(
  function (count) {
    // `count` is a Number
  },
  function(error) {
    // catch an error
  }
);
```
