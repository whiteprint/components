module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-mixins': {},
    'postcss-custom-media': {},
    'postcss-custom-selectors': {exportTo: 'selectors.js'},
    'postcss-custom-properties': {preserve: false},
    'postcss-advanced-variables': {disable: '@mixin, @include, @content, @import'},
    'postcss-color-function': {},
    'postcss-calc': {},
    'postcss-nesting': {}
  }
}
