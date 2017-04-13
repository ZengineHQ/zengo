# zengo
An idiom for Zengine backend services.

# Install
For now, reference the github url in package.json.

# Data

```js
// require the built-in ZnHttp (notice the path depends on where you are)
var ZnHttp = require('../../lib/zn-http.js');

// inject ZnHttp into zengo data module
var data = require('zengo').data(znHttp);

// ask for the resource you want
var formDao = data.forForms();
var recordDao = data.forRecordsOf(form_id = 7);
```

You should be able to get forms and records as objects. In zengo, all record objects have a reference to the corresponding form, which is queried implicitly.
