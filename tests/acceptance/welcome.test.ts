import { Fusion, Given, Then, When } from 'jest-cucumber-fusion'
import { App } from '../../src/core/App'
import { User } from '../../src/core/User'
import { Room } from '../../src/core/Room'

let app: App
let user: User

Given('the app is opened by a user', () => {
	app = new App()
	user = new User('Jane')
})

When('a default room is set', () => {
	app.defaultRoom = new Room('Lobby')
})

Then('the user joins the default room', () => {
	app.join(user)
	expect(app.defaultRoom.users).toContain(user)
})

Fusion('welcome.feature')
