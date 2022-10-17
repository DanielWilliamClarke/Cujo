module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    project: ['./tsconfig.json']
  },
  plugins: [
    'react'
  ],
  rules: {
    semi: [2, 'always'],
    '@typescript-eslint/semi': [2, 'always']
  }
};
