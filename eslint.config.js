import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import eslintParserTs from '@typescript-eslint/parser';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    ignores: ['node_modules/', 'dist/'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: eslintParserTs,
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs,
    },
    rules: {
      'indent': ['error', 2],

      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'semi': ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      'linebreak-style': ['error', 'unix'],
      'prefer-const': 'error',
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
    },
  },
];
