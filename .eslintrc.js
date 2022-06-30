module.exports = {
  root: true,

  env: {
    node: true,
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  extends: ['plugin:vue/essential', '@vue/airbnb', 'prettier'],
  plugins: ['prettier'],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'consistent-return': 'off',
    'no-return-await': 'off',
    'no-plusplus': 'off',
    'vue/no-unused-components': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-unused-vars': 'warn',
    'class-methods-use-this': ['error', { exceptMethods: ['data'] }],
    'no-shadow': ['error', { allow: ['state', 'getters'] }],
    'no-param-reassign': ['error', { props: false }],
    'func-names': ['error', 'as-needed'],
    'import/extensions': [
      'warn',
      {
        '.js': 'never',
        '.jsx': 'never',
        '.mjs': 'never',
        '.ts': 'never',
        '.tsx': 'never',
        '.vue': 'never',
      },
    ],
    'prettier/prettier': ['error'],
  },

  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
