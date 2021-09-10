import { User } from './core/User'
import Space from './core/Space'
import axios from 'axios'
import { Room } from './core/Room'
import { ActionContext, ActionTree, StoreOptions } from 'vuex'

export interface State {
	user?: User
	space?: Space
}

const state = (): State => {
	return {
		user: undefined,
		space: undefined,
	}
}

const getters = {
	user: (state: State): User | undefined => state.user,
	space: (state: State): Space | undefined => state.space,
}

const actions: ActionTree<State, State> = {
	async loadUser(
		context: ActionContext<State, State>,
		username: string
	): Promise<void> {
		try {
			const usersResponse = await axios.get('/api/users')
			const users: User[] = usersResponse.data
			const user = users.find((user: User) => user.name === username)
			context.commit('setUser', user)
		} catch (e) {
			console.error(`Could not load user for username ${username}.`, e)
		}
	},
	async joinSpace(
		context: ActionContext<State, State>,
		spaceId: string
	): Promise<void> {
		try {
			const spacesResponse = await axios.get(`/api/spaces/${spaceId}`)
			const rooms: Room[] = spacesResponse.data.rooms.map(
				(room: Room) => new Room(room.name, room.id)
			)
			const space = new Space(spacesResponse.data.name, rooms)
			context.commit('setSpace', space)
			context.commit('joinSpace')
		} catch (e) {
			console.error(`Could not join space with id ${spaceId}.`, e)
		}
	},
	async joinRoom(
		context: ActionContext<State, State>,
		{ userId, roomId }: any
	): Promise<void> {
		const userResponse = await axios.get(`api/users/${userId}`)
		const user: User = userResponse.data
		const room: Room | undefined = context.state.space?.getRoom(roomId)
		context.commit('joinUserToRoom', { user, room })
	},
}

const mutations = {
	setUser(state: State, user: User): void {
		state.user = user
	},
	setSpace(state: State, space: Space): void {
		state.space = space
	},
	joinSpace(state: State): void {
		if (state.user) {
			state.space?.join(state.user)
		}
	},
	joinUserToRoom(state: State, { room, user }: any): void {
		if (room && user) {
			state.space?.joinRoom(room, user)
		}
	},
}

export default { state, getters, actions, mutations } as StoreOptions<State>
