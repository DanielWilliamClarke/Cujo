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
    tsconfigRootDir: __dirname
  },
  plugins: [
    'react'
  ],
  rules: {
    semi: [2, 'always'],
    '@typescript-eslint/semi': [2, 'always'],
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    'no-new': 'off',
    'new-cap': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-floating-promises': 'off'
    // Best to turn these rules back on at some point
  }
};
