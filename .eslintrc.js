module.exports = {
  extends: ['./node_modules/@cowtech/eslint-config/react.js'],
  rules: {
    'jsx-quotes': [2, 'prefer-double'],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/valid-expect': 'error'
  },
  env: {
    'jest/globals': true
  },
  plugins: ['jest'],
  globals: {
    fetch: true,
    workbox: true,
    self: true,
    SW_DEBUG: true,
    VERSION: true
  }
}
