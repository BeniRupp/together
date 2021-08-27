<template>
	<div data-id="room" :data-name="room.name" class="room">
		<h3 data-id="name" class="room__name">{{ room.name }}</h3>
		<span
			v-for="user in room.users"
			:key="user.name"
			class="user"
			data-id="user"
		>
			<span class="user__icon">{{ user.name.slice(0, 1) }}</span>
			<span class="user__name">{{ user.name }}</span>
		</span>
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

<style scoped>
.room {
	border: 1px solid #eee;
	padding: 1rem 2rem;
}
.room__name {
	margin-top: 0;
}

.user {
	display: inline-flex;
	flex-direction: column;
	align-items: center;
	width: 60px;
}
.user__icon {
	display: inline-block;
	background-color: #eee;
	border-radius: 50%;
	height: 50px;
	width: 50px;
	font-size: 1.4rem;
	line-height: 50px;
	text-align: center;
}
.user__name {
	width: 60px;
	text-overflow: ellipsis;
	overflow: hidden;
	font-size: 0.7rem;
	text-align: center;
	white-space: nowrap;
}
</style>
