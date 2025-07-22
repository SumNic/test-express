// eslint.config.cjs
const eslintPluginTs = require('@typescript-eslint/eslint-plugin');
const parserTs = require('@typescript-eslint/parser');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
	{
		ignores: ['node_modules', 'dist', 'prisma', '.env'],
		files: ['**/*.ts'],
		languageOptions: {
			parser: parserTs,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		plugins: {
			'@typescript-eslint': eslintPluginTs,
			prettier: prettierPlugin,
		},
		rules: {
			semi: ['error', 'always'],
			quotes: ['error', 'single'],
			'prettier/prettier': 'error',
		},
	},
];
