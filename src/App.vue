<template>
	<header class="header">
		<span class="header__logo">Together</span>
		<span v-if="user" class="header__greeting">Hi, {{ user.name }}.</span>
	</header>
	<main>
		<join-form v-if="!user" class="app-join" @success="join" />
		<template v-else>
			<app-room
				v-for="room in app.getRooms()"
				:key="room.id"
				:room="room"
				@dblclick="joinRoom(room)"
			/>
		</template>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User } from './core/User'
import { App } from './core/App'
import { Room } from './core/Room'
import AppRoom from './components/AppRoom.vue'
import JoinForm from './components/JoinForm.vue'
import axios from 'axios'

interface AppData {
	user: User | undefined
	app: App
}

export default defineComponent({
	name: 'App',
	components: { JoinForm, AppRoom },
	data(): AppData {
		return {
			user: undefined,
			app: new App(),
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		async init(): Promise<void> {
			try {
				const response = await axios.get('/api/spaces/some-space-id/rooms')
				const rooms: Room[] = response.data.map((r: Room) => new Room(r.name))
				if (rooms.length) {
					this.app.defaultRoom = rooms[0]
					rooms.forEach((r) => this.app.addRoom(r))
				}
			} catch (e) {
				console.error('Could not load rooms.', e)
			}
		},
		join(username: string): void {
			const user = new User(username)
			this.user = user
			this.app.join(user)
		},
		joinRoom(room: Room): void {
			if (this.user) {
				this.app.joinRoom(room, this.user)
			}
		},
	},
})
</script>

<style scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem 1rem;
	background-color: gold;
}
.header__logo {
	font-weight: bold;
	font-size: 1.5rem;
}
.header__greeting {
	font-style: italic;
}

main {
	flex: 1 0 auto;
}

.app-join {
	max-width: 40%;
	margin: 5rem auto;
}
</style>
