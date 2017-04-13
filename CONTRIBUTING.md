# Contributing

AWS lambda runs a specific Node version (4.3). You could use [nvm](https://github.com/creationix/nvm).

### Install dependencies

```bash
# install the compatible node version
nvm install
# changes terminal session to use the compatible node version
nvm use
# install node modules
npm install
```

### Test and lint

```bash
# changes to compatible node on the terminal session
nvm use
npm test
npm run lint
```
