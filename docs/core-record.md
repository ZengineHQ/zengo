

### getFieldValue

Arguments

Name      | Type            | Required  | Description
----------|-----------------|-----------|----------------------
record    | Object          | &check;   | A record object
fieldId   | String, Number  | &check;   | A field Id

Returns one of `String, Number, Array, Object and etc...`
or `undefined` if not set in the record object.

Example

```js
var record = require('zengo').core.record;

var myRecord = { id: '123', name: 'Test', field456: '7890' };

console.log(record.getFieldValue(myRecord, 456)); // Prints: 7890
```

### setFieldValue

Arguments

Name      | Type            | Required  | Description
----------|-----------------|-----------|----------------------
record    | Object          | &check;   | A record object
fieldId   | String, Number  | &check;   | A field Id
value     | Any             | &check;   | A value to update field

Returns the updated `record` object.

Example

```js
var record = require('zengo').core.record;

var myRecord = { id: '123', name: 'Test', field456: '7890' };

console.log(record.setFieldValue(myRecord, 456, 'changed'));
// Prints: { id: '123', name: 'Test', field456: 'changed' }
```
