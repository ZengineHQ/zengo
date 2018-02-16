

### getLinkedForm

Arguments

Name      | Type            | Required  | Description
----------|-----------------|-----------|----------------------
form      | Object          | &check;   | A form object
formId    | String, Number  | &check;   | A linked form Id

Returns linked form object.

Example

```js
var form = require('zengo').core.form;

var myForm = {
	id: '123',
	name: 'Form',
	linkedForms: [
		{
			form: {
				id: 2
			},
			type: 'hasOne',
			keyField: {
				id: 22
			}
		}
	]
};

console.log(form.getLinkedForm(form, 2));
// Prints: { form: { id: 2 }, type: 'hasOne', keyField: { id: 22 }}
```

### getLinkedAttributeTo

Arguments

Name      | Type            | Required  | Description
----------|-----------------|-----------|----------------------
form      | Object          | &check;   | A form object
formId    | String, Number  | &check;   | A linked form Id

Returns the attribute on the `form` object that links to the passed `formId`.

Example

```js
var form = require('zengo').core.form;

var myForm = {
	id: '123',
	name: 'Form',
	linkedForms: [
		{
			form: {
				id: 2
			},
			type: 'hasOne',
			keyField: {
				id: 22
			}
		},
		{
			form: {
				id: 3
			},
			type: 'belongsTo',
			keyField: {
				id: 23
			}
		},
		{
			form: {
				id: 4
			},
			type: 'hasMany',
			keyField: {
				id: 24
			}
		}
	]
};
console.log(form.getLinkedAttributeTo(form, 2));
// Prints: form2

console.log(form.getLinkedAttributeTo(form, 3));
// Prints: field23

console.log(form.getLinkedAttributeTo(form, 4));
// Prints: false

```
