import { Fusion, Given, Then, When } from 'jest-cucumber-fusion'

Given('a person is knocking at the door', () => {
	console.log('Person is knocking')
})

When('another person is open the door', () => {
	console.log('Another person is locking')
})

Then('both persons should say "hello"', () => {
	expect(true).toBe(true)
})

Fusion('sample.feature')
