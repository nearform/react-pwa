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
    browser: true,
    'jest/globals': true,
    serviceworker: true
  },
  plugins: ['jest'],
  globals: {
    workbox: true,
    SW_DEBUG: true,
    VERSION: true
  }
}
