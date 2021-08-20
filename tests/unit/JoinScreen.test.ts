import { flushPromises, mount } from '@vue/test-utils'
import AppComponent from '../../src/App.vue'

it('should join a user in the default room.', async () => {
	const div = document.createElement('div')
	div.id = 'root'
	document.body.appendChild(div)

	const DEFAULT_ROOM_NAME = 'Flur'
	const appConfig = { defaultRoomName: DEFAULT_ROOM_NAME }
	const configStub = jest.fn().mockResolvedValueOnce(appConfig)
	const wrapper = mount(AppComponent, {
		attachTo: '#root',
		global: { stubs: { loadAppConfig: configStub } },
	})
	await flushPromises()
	expect(wrapper.find('[data-id=join-screen]').element).toHaveTextContent(/Hi/)
	expect(wrapper.find('[data-id=join-screen]').element).toHaveTextContent(/Hi/)
	await wrapper.find('input[data-id=username]').setValue('Jane')
	expect(wrapper.find('[data-id=room]').exists()).toBe(false)
	await wrapper.find('button[data-id=join]').trigger('click')
	expect(wrapper.find('[data-id=join-screen]').exists()).toBe(false)
	const defaultRoom = wrapper.find('[data-id=room]')
	expect(defaultRoom.exists()).toBe(true)
	expect(defaultRoom.find('[data-id=name]').element).toHaveTextContent(
		DEFAULT_ROOM_NAME
	)
	expect(defaultRoom.find('[data-id=user]').element).toHaveTextContent(/Jane/)
})
