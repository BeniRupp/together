<template>
	<header class="header">
		<span class="header__logo">Together</span>
		<span v-if="user" class="header__greeting">Hi, {{ user.name }}.</span>
	</header>
	<main>
		<join-form v-if="!user" class="app-join" @success="join" />
		<app-room v-else :room="app.defaultRoom" />
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User } from './core/User'
import { App } from './core/App'
import { Room } from './core/Room'
import AppRoom from './components/AppRoom.vue'
import JoinForm from './components/JoinForm.vue'

interface AppConfig {
	defaultRoomName: string
}

export default defineComponent({
	name: 'App',
	components: { JoinForm, AppRoom },
	data() {
		return {
			user: null,
			app: new App(),
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		async loadAppConfig(): Promise<AppConfig> {
			return await import('../app.config.json')
		},
		async init(): Promise<void> {
			const config = await this.loadAppConfig()
			this.app.defaultRoom = new Room(config.defaultRoomName)
		},
		join(username: string): void {
			const user = new User(username)
			this.user = user
			this.app.join(user)
			this.userJoined = true
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
