<template>
	<div id="app">
		<h1>Together</h1>
		<div v-if="!userJoined" data-id="join-screen">
			<h2>Hi</h2>
			<join-form @success="join" />
		</div>
		<app-room v-else :room="app.defaultRoom" />
	</div>
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
			userJoined: false,
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
			this.app.join(new User(username))
			this.userJoined = true
		},
	},
})
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
