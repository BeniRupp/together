module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
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
	rules: {
		'jest/no-standalone-expect': [
			'error',
			{
				additionalTestBlockFunctions: [
					'Given',
					'When',
					'Then',
					'And',
					'But',
					'Fusion',
				],
			},
		],
	},
}
