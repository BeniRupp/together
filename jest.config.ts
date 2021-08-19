/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
	// Automatically clear mock calls and instances between every test
	clearMocks: true,
	transform: {
		'^.+\\.[t|j]sx?$': 'babel-jest',
	},
}
