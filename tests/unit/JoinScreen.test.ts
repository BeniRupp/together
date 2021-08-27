import { flushPromises, mount } from '@vue/test-utils'
import AppComponent from '../../src/App.vue'
import { Room } from '../../src/core/Room'
import axios from 'axios'
import { when } from 'jest-when'
import { User } from '../../src/core/User'

jest.mock('axios')

it('should join a user in the default room.', async () => {
	const room = new Room('Flur')
	mockGetRooms([room])
	await flushPromises()
	const wrapper = await createWrapper()
	expect(wrapper.find('[data-id=join-form]').exists()).toBe(true)
	await wrapper.find('input[data-id=username]').setValue('Jane')
	expect(wrapper.find('[data-id=room]').exists()).toBe(false)
	await wrapper.find('button[data-id=join]').trigger('click')
	expect(wrapper.find('[data-id=join-form]').exists()).toBe(false)
	expect(wrapper.find('header').element).toHaveTextContent(/Hi, Jane./)
	const defaultRoom = wrapper.find('[data-id=room]')
	expect(defaultRoom.find('[data-id=name]').element).toHaveTextContent(
		room.name
	)
	expect(defaultRoom.find('[data-id=user]').element).toHaveTextContent(/Jane/)
})

it('should allow users to switch rooms', async () => {
	const room1 = new Room('Room 1')
	const room2 = new Room('Room 2')

	mockGetRooms([room1, room2])
	const wrapper = await createWrapper()
	const userName = 'Jane'
	await wrapper.find('input[data-id=username]').setValue(userName)
	await wrapper.find('button[data-id=join]').trigger('click')
	let room1Wrapper = wrapper.find(`[data-id=room][data-name="${room1.name}"]`)
	expect(room1Wrapper.find('[data-id=user]').element).toHaveTextContent(
		userName
	)
	let room2Wrapper = wrapper.find(`[data-id=room][data-name="${room2.name}"]`)
	expect(room2Wrapper.findAll('[data-id=user]')).toHaveLength(0)
	await room2Wrapper.trigger('dblclick')
	wrapper.vm.$data.app.join(new User('Beni'))
	room1Wrapper = wrapper.find(`[data-id=room][data-name="${room1.name}"]`)
	room2Wrapper = wrapper.find(`[data-id=room][data-name="${room2.name}"]`)
	expect(room1Wrapper.findAll('[data-id=user]')).toHaveLength(0)
	expect(room2Wrapper.findAll('[data-id=user]')).toHaveLength(1)
})

async function createWrapper() {
	const div = document.createElement('div')
	div.id = 'root'
	document.body.appendChild(div)

	const wrapper = mount(AppComponent, {
		attachTo: '#root',
	})
	await flushPromises()
	return wrapper
}

function mockGetRooms(rooms: Room[]) {
	when(axios.get)
		.calledWith('/api/spaces/some-space-id/rooms')
		.mockResolvedValueOnce({ data: rooms })
}
