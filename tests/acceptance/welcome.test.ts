import { Fusion, Given, Then, When } from 'jest-cucumber-fusion'
import { App } from '../../src/core/App'
import { User } from '../../src/core/User'
import { Room } from '../../src/core/Room'

let app: App
let user: User

describe('join default room', () => {
	Given('the app is opened by a user', () => {
		app = new App()
		user = new User('Jane')
	})

	When('a default room is set', () => {
		app.defaultRoom = new Room('Lobby')
	})

	Then('the user joins the default room', () => {
		app.join(user)
		expect(app.defaultRoom.getUsers()).toContain(user)
	})
})

describe('switching rooms', () => {
	const room1 = new Room('Room 1')
	const room2 = new Room('Room 2')

	Given('a app has multiple rooms', () => {
		app = new App()
		app.addRoom(room1)
		app.addRoom(room2)
		expect(app.getRooms()).toHaveLength(2)
	})
	When('a user joins a room', () => {
		user = new User('Joe')
		app.joinRoom(room1, user)
	})
	Then('the user is part of that room', () => {
		expect(app.getRoom(room1.id)?.getUsers()).toContain(user)
	})
	When('the user joins another room', () => {
		app.joinRoom(room2, user)
	})
	Then('the user is only part of that second room', () => {
		expect(app.getRoom(room1.id)?.getUsers()).toHaveLength(0)
		expect(app.getRoom(room2.id)?.getUsers()).toContain(user)
	})
})

Fusion('welcome.feature')
