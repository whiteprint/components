# Whiteprint Components

## Use

See [whiteprint.io](https://whiteprint.io/)

## Development

Install dependencies `npm ci`

Run dev server `npx gulp`

### CSS

PostCSS

### JS

JS needs to be run through [JSCC](https://github.com/aMarCruz/jscc).
```
const selectors = require('./selectors.js');
```
```
values: {
  _SEL: selectors.customSelectors,
  _SEP: ", "
}
```
