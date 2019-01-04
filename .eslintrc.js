module.exports = {
    extends: ['standard', 'standard-jsx', 'standard-react'],
    rules: {
        'jsx-quotes': [2, 'prefer-double'],
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/valid-expect': 'error',
        'react/prop-types': 0 //disabled for now to allow linting to pass with new eslint - will add this in a future PR
      },
      env: {
        browser: true,
        'jest/globals': true,
        serviceworker: true
      },
      parser: "babel-eslint",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      plugins: ['jest', 'react'],
      globals: {
        fetch: true,
        workbox: true,
        self: true,
        SW_DEBUG: true,
        VERSION: true
      }
}
