import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import AppComponent from '../../src/App.vue'
import { Room } from '../../src/core/Room'
import axios from 'axios'
import { when } from 'jest-when'
import { v4 as uuid } from 'uuid'
import { User } from '../../src/core/User'
import { createStore } from 'vuex'
import store, { State } from '../../src/store'
import MockWebSocket from 'jest-websocket-mock'
import MockCommunicationServer from './MockCommunicationServer'

jest.mock('axios')

let mockServer: MockWebSocket

beforeEach(async () => {
	mockServer = new MockCommunicationServer()
})

afterEach(() => {
	MockWebSocket.clean()
})

it('should join a user in the default room.', async () => {
	const room = new Room('Flur')
	mockGetSpace([room])
	mockGetUsers()
	const wrapper = await createWrapper()
	expect(wrapper.find('[data-id=join-form]').exists()).toBe(true)
	expect(wrapper.find('[data-id=room]').exists()).toBe(false)
	await executeLogin(wrapper, 'Jane')
	expect(wrapper.find('[data-id=join-form]').exists()).toBe(false)
	expect(wrapper.find('header').element).toHaveTextContent(/Hi, Jane./)
	const defaultRoom = wrapper.find('[data-id=room]')
	expect(defaultRoom.find('[data-id=name]').element).toHaveTextContent(
		room.name
	)
	expect(defaultRoom.find('[data-id=user]').element).toHaveTextContent(/Jane/)
})

it('should allow users to switch rooms', async () => {
	const user = new User('Jane')
	mockGetUsers([user])
	const room1 = new Room('Room 1')
	const room2 = new Room('Room 2')
	mockGetSpace([room1, room2])

	const wrapper = await createWrapper()
	await mockServer.connected
	await executeLogin(wrapper, user.name)

	let room1Wrapper = wrapper.find(`[data-id=room][data-name="${room1.name}"]`)
	expect(room1Wrapper.find('[data-id=user]').element).toHaveTextContent(
		user.name
	)
	let room2Wrapper = wrapper.find(`[data-id=room][data-name="${room2.name}"]`)
	expect(room2Wrapper.findAll('[data-id=user]')).toHaveLength(0)

	mockGetUser(user.id, user)
	await room2Wrapper.trigger('dblclick')
	await expect(mockServer).toReceiveMessage(
		expect.objectContaining({ eventType: 'JOIN_ROOM' })
	)
	room1Wrapper = wrapper.find(`[data-id=room][data-name="${room1.name}"]`)
	expect(room1Wrapper.findAll('[data-id=user]')).toHaveLength(0)
	room2Wrapper = wrapper.find(`[data-id=room][data-name="${room2.name}"]`)
	expect(room2Wrapper.findAll('[data-id=user]')).toHaveLength(1)
})

async function createWrapper() {
	const div = document.createElement('div')
	div.id = 'root'
	document.body.appendChild(div)

	const wrapper = mount(AppComponent, {
		attachTo: '#root',
		global: {
			plugins: [createStore<State>(store)],
		},
	})
	await flushPromises()
	return wrapper
}

function mockGetSpace(rooms: Room[]) {
	when(axios.get)
		.calledWith('/api/spaces/some-space-id')
		.mockResolvedValueOnce({
			data: {
				id: uuid(),
				name: 'Crazy Space',
				rooms,
			},
		})
}
function mockGetUsers(users: User[] = [new User('Jane')]) {
	when(axios.get)
		.calledWith('/api/users')
		.mockResolvedValueOnce({
			data: [...users],
		})
}
function mockGetUser(userId: string, user: User = new User('Jane')) {
	when(axios.get)
		.calledWith(`api/users/${userId}`)
		.mockResolvedValueOnce({
			data: { ...user },
		})
}

async function executeLogin(wrapper: VueWrapper<any>, username: string) {
	await wrapper
		.find('[data-id=join-form] input[data-id=username]')
		.setValue(username)
	await wrapper.find('button[data-id=join]').trigger('click')
	await flushPromises()
}
