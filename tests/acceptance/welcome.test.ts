import { Fusion, Given, Then, When } from 'jest-cucumber-fusion'
import { App } from '../../src/core/App'
import { User } from '../../src/core/User'
import { Room } from '../../src/core/Room'
import Space from '../../src/core/Space'

let app: App
let user: User

describe('join default room', () => {
	Given('the app is opened by a user', () => {
		app = new App()
		user = new User('Jane')
	})

	When('a space with a default room is selected', () => {
		const room = new Room('Lobby')
		app.joinSpace(new Space('Crazy Company', [room]), user)
	})

	Then('the user joins the default room', () => {
		expect(app.space?.getDefaultRoom().getUsers()).toContain(user)
	})
})

describe('switching rooms', () => {
	const room1 = new Room('Room 1')
	const room2 = new Room('Room 2')

	Given('the use is joined to a space that has multiple rooms', () => {
		app = new App()
		const space = new Space('Crazy Company', [room1, room2])
		user = new User('Joe')
		app.joinSpace(space, user)
		expect(app.space?.getRooms()).toHaveLength(2)
	})
	When('a user joins a room', () => {
		app.space?.joinRoom(room1, user)
	})
	Then('the user is part of that room', () => {
		expect(app.space?.getRoom(room1.id)?.getUsers()).toContain(user)
	})
	When('the user joins another room', () => {
		app.space?.joinRoom(room2, user)
	})
	Then('the user is only part of that second room', () => {
		expect(app.space?.getRoom(room1.id)?.getUsers()).toHaveLength(0)
		expect(app.space?.getRoom(room2.id)?.getUsers()).toContain(user)
	})
})

Fusion('welcome.feature')
