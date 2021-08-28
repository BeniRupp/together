<template>
	<header class="header">
		<span class="header__logo">Together</span>
		<span v-if="user" class="header__greeting">Hi, {{ user.name }}.</span>
	</header>
	<main>
		<join-form v-if="!user" class="app__join" @success="join" />
		<template v-else>
			<app-room
				v-for="room in app.space?.getRooms()"
				:key="room.id"
				:room="room"
				class="app__room"
				:title="`Join ${room.name} using double click.`"
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
import Space from './core/Space'

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
	methods: {
		async join(username: string, spaceId = 'some-space-id'): Promise<void> {
			this.user = new User(username)

			try {
				const response = await axios.get(`/api/spaces/${spaceId}`)
				const rooms: Room[] = response.data.rooms.map(
					(r: Room) => new Room(r.name)
				)
				const space = new Space(response.data.name, rooms)
				this.app.joinSpace(space, this.user)
			} catch (e) {
				console.error('Could not load rooms.', e)
			}
		},
		joinRoom(room: Room): void {
			if (this.user) {
				this.app.space?.joinRoom(room, this.user)
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

.app__join {
	max-width: 40%;
	margin: 5rem auto;
}

.app__room {
	cursor: pointer;
	user-select: none;
	margin: 2rem;
}
</style>
