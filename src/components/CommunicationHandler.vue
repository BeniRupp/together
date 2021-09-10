<template>
	<slot :sendEvent="sendEvent" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
	CommunicationEvent,
	CommunicationEventData,
} from '../communication/events/CommunicationEvent'
import { EventType } from '../communication/events/EventType'
import JoinRoomEvent from '../communication/events/JoinRoomEvent'
import { mapActions, mapGetters } from 'vuex'

interface Data {
	ws?: WebSocket
}

export default defineComponent({
	name: 'CommunicationHandler',
	data(): Data {
		return {
			ws: undefined,
		}
	},
	computed: {
		...mapGetters(['space', 'rooms']),
	},
	mounted() {
		this.ws = new WebSocket('ws://localhost:8080')
		this.init()
	},
	methods: {
		init(): void {
			if (!this.ws) {
				return
			}
			this.ws.onmessage = (message: any) => {
				try {
					const event: CommunicationEvent<CommunicationEventData> = JSON.parse(
						message.data
					)
					if (event.eventType === EventType.JOIN_ROOM) {
						this.handleUserJoinedRoom(event as JoinRoomEvent)
					}
				} catch (e) {
					console.error('Error while parsing message.', e)
				}
			}
		},
		sendEvent(event: CommunicationEvent<CommunicationEventData>): void {
			this.ws?.send(JSON.stringify(event))
		},
		async handleUserJoinedRoom(event: JoinRoomEvent): Promise<void> {
			// TODO: Check spaceId
			//TODO: Check if own user
			this.joinRoom({ userId: event.data.userId, roomId: event.data.roomId })
		},
		...mapActions(['joinRoom']),
	},
})
</script>
