module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	env: { es6: true, node: true },
	plugins: ['@typescript-eslint', 'jest'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-recommended',
		'plugin:jest/recommended',
		'plugin:import/recommended',
		'prettier',
	],
}
