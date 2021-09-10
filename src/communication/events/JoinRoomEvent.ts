import { User } from '../../core/User'
import { Room } from '../../core/Room'
import Space from '../../core/Space'
import {
	CommunicationEvent,
	CommunicationEventData,
} from './CommunicationEvent'
import { EventType } from './EventType'

export class JoinRoomEventData implements CommunicationEventData {
	spaceId: string
	roomId: string
	userId: string

	constructor(spaceId: string, roomId: string, userId: string) {
		this.spaceId = spaceId
		this.roomId = roomId
		this.userId = userId
	}
}

export default class JoinRoomEvent extends CommunicationEvent<JoinRoomEventData> {
	constructor(user: User, space: Space, room: Room) {
		super(
			EventType.JOIN_ROOM,
			new JoinRoomEventData(space.id, room.id, user.id)
		)
	}
}
