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

### Developing locally as dependency on another project

```bash
# from zengo source code folder
# this creates a symbolic link from a global folder to the zengo folder
npm link

# from project folder
# this links "node_modules/zengo" in this particular project to the global folder, so that "require" calls looking for zengo wind up loading it from your development folder
npm link zengo
```
