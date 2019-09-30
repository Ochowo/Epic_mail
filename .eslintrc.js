module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/require-default-props': 0,
    'function-paren-newline': ['error', 'multiline'],
    'jsx-a11y/anchor-is-valid': 0,
    'object-curly-newline': ['error', { consistent: true }],
    'no-underscore-dangle': 0,
    'import/no-named-as-default': 0,
    'no-nested-ternary': 0,
  },
};