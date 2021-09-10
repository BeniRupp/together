// see https://github.com/DefinitelyTyped/DefinitelyTyped/pull/55151
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { WebSocketServer } from 'ws'
import {
	CommunicationEvent,
	CommunicationEventData,
} from '../src/communication/events/CommunicationEvent'
import { EventType } from '../src/communication/events/EventType'

const wss = new WebSocketServer({ port: 8080 })
console.log('Start communication mock server ...')

wss.on('listening', () => {
	console.log(
		`📡 Communication mock server is listening on port ${wss.address().port}`
	)
})
wss.on('connection', function connection(ws: any) {
	ws.on('message', function incoming(message: any) {
		const event = JSON.parse(
			message
		) as CommunicationEvent<CommunicationEventData>
		console.log('received event', event)
		if (event.eventType === EventType.JOIN_ROOM) {
			broadcast(event)
		}
	})
})

wss.on('error', (error: any) => {
	console.log('error', error)
})

function broadcast(event: any) {
	console.log('send broadcast', event)
	wss.clients.forEach((client: WebSocket) => {
		client.send(JSON.stringify(event))
	})
}
