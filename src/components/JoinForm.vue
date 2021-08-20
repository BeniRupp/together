<template>
	<form
		autocomplete="off"
		data-id="join-form"
		class="join-form"
		@submit.prevent="join"
	>
		<fieldset>
			<legend>Join together.</legend>

			<label
				>Username
				<input
					v-model="username"
					name="username"
					data-id="username"
					required
					autofocus
				/>
			</label>
			<button data-id="join">join</button>
		</fieldset>
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'JoinForm',
	emits: ['success'],
	data() {
		return { username: '' }
	},
	methods: {
		join() {
			this.$emit('success', this.username)
		},
	},
})
</script>

<style scoped>
.join-form legend {
	font-weight: bold;
}
.join-form label {
	display: block;
	margin: 1.5rem 0;
}
.join-form button {
	margin-left: auto;
}
</style>
