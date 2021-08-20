<template>
	<div data-id="room">
		<h3 data-id="name">{{ room.name }}</h3>
		<span v-for="user in room.users" :key="user.name" data-id="user">{{
			user.name
		}}</span>
	</div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { Room } from '../core/Room'

export default defineComponent({
	name: 'AppRoom',
	props: {
		room: {
			type: Object as PropType<Room>,
			required: true,
		},
	},
})
</script>
