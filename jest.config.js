/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
export default {
	// Automatically clear mock calls and instances between every test
	clearMocks: true,
	preset: 'ts-jest',
	moduleFileExtensions: ['js', 'ts', 'vue'],
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.vue$': 'vue-jest',
		'^.+\\.js$': 'babel-jest',
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
