import MockWebSocket from 'jest-websocket-mock'
import {
	CommunicationEvent,
	CommunicationEventData,
} from '../../src/communication/events/CommunicationEvent'
import { EventType } from '../../src/communication/events/EventType'

export default class MockCommunicationServer extends MockWebSocket {
	constructor() {
		super('ws://localhost:8080', { jsonProtocol: true })

		this.on('connection', (socket) => {
			socket.on('message', (message: any) => {
				const event: CommunicationEvent<CommunicationEventData> =
					JSON.parse(message)
				if (event.eventType === EventType.JOIN_ROOM) {
					socket.send(JSON.stringify(event))
				}
			})
		})
	}
}
