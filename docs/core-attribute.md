

## isField

Checks if the given attribute name is a field using the Regex `/^field[0-9]+/`.

Arguments

Name      | Type      | Required  | Description
----------|-----------|-----------|----------------------
attribute | String    | &check;   | Attribute name to check

Returns `Boolean`

Example

```js
var attribute = require('zengo').core.attribute;


if (attribute.isField('field123')) {
  console.log('this is a field attribute'); // Prints: this message
} else {
  console.log('not a field attribute');
}

if (attribute.isField('id')) {
  console.log('this is a field attribute');
} else {
  console.log('not a field attribute'); // Prints this message
}
```

## forFieldId

Arguments

Name      | Type            | Required  | Description
----------|-----------------|-----------|----------------------
id        | String, Number  | &check;   | Field Id

Returns `String`

Example

```js
var attribute = require('zengo').core.attribute;

console.log(attribute.forFieldId(123)); // Prints: field123
```

## forField

Arguments

Name      | Type            | Required  | Description
----------|-----------------|-----------|----------------------
field     | Object          | &check;   | A field object

Returns `String`

Example

```js
var attribute = require('zengo').core.attribute;

console.log(attribute.forField({id: 123, name: 'Test'})); // Prints: field123
```

## getFieldId

Arguments

Name      | Type            | Required  | Description
----------|-----------------|-----------|----------------------
attribute | String          | &check;   | An attribute name

Returns `Number`

Example

```js
var attribute = require('zengo').core.attribute;

console.log(attribute.getFieldId('field123')); // Prints: 123
```
