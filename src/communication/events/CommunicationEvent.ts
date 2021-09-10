import { EventType } from './EventType'

export interface CommunicationEventData {
	spaceId: string
}

export class CommunicationEvent<D extends CommunicationEventData> {
	eventType: EventType
	data: D

	constructor(eventType: EventType, data: D) {
		this.eventType = eventType
		this.data = data
	}
}
