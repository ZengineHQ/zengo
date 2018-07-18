# zengo
An idiom for Zengine backend services.

[![CircleCI](https://circleci.com/gh/evert0n/zengo.svg?style=svg&circle-token=0938859179484143e684561562ef1932487c0b51)](https://circleci.com/gh/evert0n/zengo)

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

See the [contributing](docs/contributing.md) doc.

# Documentation

See the [API reference](http://wizehive.github.io/zengo/).
