<template>
	<header class="header">
		<span class="header__space-name">{{ space?.name }}</span>
		<span class="header__logo">Together</span>
		<span v-if="user" class="header__greeting">Hi, {{ user.name }}.</span>
	</header>
	<main>
		<communication-handler ref="communicationHandler" v-slot="{ sendEvent }">
			<join-form v-if="!user" class="app__join" @success="join" />
			<template v-else>
				<app-room
					v-for="room in space?.getRooms()"
					:key="room.id"
					:room="room"
					class="app__room"
					:title="`Join ${room.name} using double click.`"
					@dblclick="sendEvent(new JoinRoomEvent(user, space, room))"
				/>
			</template>
		</communication-handler>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppRoom from './components/AppRoom.vue'
import JoinForm from './components/JoinForm.vue'
import { mapActions, mapGetters } from 'vuex'
import CommunicationHandler from './components/CommunicationHandler.vue'
import JoinRoomEvent from './communication/events/JoinRoomEvent'

export default defineComponent({
	name: 'App',
	components: { CommunicationHandler, JoinForm, AppRoom },
	data() {
		return {
			JoinRoomEvent,
		}
	},
	computed: {
		...mapGetters(['user', 'space']),
	},
	methods: {
		async join(username: string, spaceId = 'some-space-id'): Promise<void> {
			await this.loadUser(username)
			await this.joinSpace(spaceId)
			// TODO: Send join room event
		},
		...mapActions(['loadUser', 'joinSpace']),
	},
})
</script>

<style scoped>
.header {
	display: grid;
	grid-template-columns: 3fr 1fr 3fr;
	grid-gap: 1rem;
	align-items: center;
	padding: 0.5rem 1rem;
	background-color: gold;
}
.header__space-name,
.header__greeting {
	font-size: 0.85rem;
}
.header__logo {
	font-weight: bold;
	font-size: 1.5rem;
}
.header__greeting {
	font-style: italic;
	text-align: right;
}

main {
	flex: 1 0 auto;
}
.app__join {
	margin: 1rem;
}
@media screen and (min-width: 500px) {
	.app__join {
		max-width: 40%;
		margin: 5rem auto;
	}
}

.app__room {
	cursor: pointer;
	user-select: none;
	margin: 2rem;
}
</style>
