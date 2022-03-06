# typedoc-cross-link-types

TypeDoc plugin that enables cross-linking to types from other packages.

## Installation
Use [npm] to install the package.

```bash
npm install typedoc-cross-link-types
```

## Usage
Add the following to your `typedoc.json`:
```json
{
  "cross-package-definitions": [
    "package//type => url"
  ]
}
```
Here's an example:
```json
{
  "cross-package-definitions": [
    "moment//moment.Moment => https://momentjs.com/docs/"
  ]
}
```

## License
[MIT]

[npm]: https://www.npmjs.com
[MIT]: https://opensource.org/licenses/MIT