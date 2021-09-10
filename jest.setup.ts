import '@testing-library/jest-dom'
import { resetAllWhenMocks, verifyAllWhenMocksCalled } from 'jest-when'

global.beforeEach(() => {
	resetAllWhenMocks()
})

global.afterEach(() => {
	verifyAllWhenMocksCalled()
})
