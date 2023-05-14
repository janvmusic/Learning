## An introduction to the NPM package manager

- `NPM` is the standard package manager for NodeJS

### Dependencies

- Manages dependencies for an application
- To install use `$ npm install` to add dependencies to `package.json`
- There are other flags:

  - `--save` => Add the dependency to `package.json#devDependencies`
  - `--no-save` => Installs the package but don't add the dependency to `package.json`
  - `--save-optional` => installs and adds the entry to `package.json#optionalDependencies`
  - `--no-optional` => will prevent optional dependencies from being installed

  The difference between `devDependencies` and `dependencies` is that the later contains tools for development while the later contains tools for production

### Versioning

- `NPM` manages versioning as well. You can manage these versions through `package.json` or `package-lock.json`

### Update

To update a dependency you can execute `npm update`

### Running tasks

`NPM` allows you to run tasks through `scripts` in `package.json`. For example:

```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```
