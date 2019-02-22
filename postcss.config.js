module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-mixins': {},
    'postcss-preset-env': {
      features: {
        'nesting-rules': true,
        'custom-selectors': true
      }
    }
  }
}
