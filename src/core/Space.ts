import { v4 as uuid } from 'uuid'
import { User } from './User'
import { Room } from './Room'

export default class Space {
	id: string
	name: string
	rooms: Room[]

	constructor(name: string, rooms: Room[]) {
		this.id = uuid()
		this.name = name
		this.rooms = rooms
	}

	join(user: User): void {
		this.rooms[0].addUser(user)
	}

	joinRoom(room: Room, user: User): void {
		this.removeUserFromCurrentRoom(user)
		this.getRoom(room.id)?.addUser(user)
	}

	getDefaultRoom(): Room {
		return this.rooms[0]
	}

	getRooms(): Room[] {
		return this.rooms
	}

	getRoom(id: string): Room | undefined {
		return this.rooms.find((r) => r.id === id)
	}

	private removeUserFromCurrentRoom(user: User) {
		const room = this.rooms.find((r) =>
			r.getUsers().some((u: User) => u.id === user.id)
		)
		if (room) {
			room.removeUser(user)
		}
	}
}
