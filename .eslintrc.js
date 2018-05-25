module.exports = {
  extends: ['./node_modules/@cowtech/eslint-config/react.js'],
  rules: {
    'jsx-quotes': [2, 'prefer-double']
  },
  globals: {
    fetch: true,
    workbox: true,
    self: true,
    SW_DEBUG: true,
    VERSION: true
  }
}
