# zengo
An idiom for Zengine backend services.

The goal of this project is to incorporate all the infrastructural code necessary to develop a backend service, so plugin developers can focus on business rules instead. Project scope includes, for example, basic data access, test helpers (fakes and builders), routing, common advanced queries and data manipulation. 

The project should also be a place of discussion, where any developer can collaborate and where code is developed in a consensus-driven way.

# Install

With npm
```bash
npm install git+ssh://git@github.com/WizeHive/zengo --save
```

Or reference the github url in your package.json.
```json
"dependencies": {
    "zengo": "git+ssh://git@github.com/WizeHive/zengo.git"
 },
```

# Contribute

See the [contributing](CONTRIBUTING.md) doc.

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

# Router

See the [router docs](docs/router.md).
