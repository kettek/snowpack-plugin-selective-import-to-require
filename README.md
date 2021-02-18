# snowpack-plugin-selective-import-to-require
Selectively convert `import` calls into `require` calls. Useful for running snowpack with Electron.

```
npm install --save-dev snowpack-plugin-selective-import-to-require
```

```js
// snowpack.config.json
module.exports = {
  "plugins": [
    [
      "snowpack-plugin-selective-import-to-require",
      {
        "modules": ["os", "child_process"],
        "types": ['.js'],
      }
    ]
  ]
}
```

#### Plugin Options

| Name               | Type       | Description |
| :----------------- | :--------- | :---------- |
| `modules` | `string[]` | An array of module names to match against, such as `['os', 'child_process']`.
| `types`   | `string[]` | (optional) By default, this plugin matches against `['.js']`. Provide an array if you need to match other extensions.
| `externalize` | `boolean` | (optional) By default, this plugin will insert all modules in `modules` into snowpack's `packageOptions.external` array. Set to false if modules should not be externalized.

#### Match Built-in Node Modules
It may be convenient to match all built-in node modules.

```
npm install builtin-modules --save-dev
```

```js
// snowpack.config.json
const builtinModules = require('builtin-modules')

module.exports = {
  "plugins": [
    [
      "snowpack-plugin-selective-import-to-require",
      {
        "modules": builtinModules,
        "types": ['.js'],
      }
    ]
  ]
}

```
