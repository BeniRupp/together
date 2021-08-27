import { Room } from './Room'
import { User } from './User'

export class App {
	_defaultRoom?: Room
	_rooms: Room[] = []

	set defaultRoom(defaultRoom: Room) {
		this._defaultRoom = defaultRoom
	}

	get defaultRoom(): Room {
		return this._defaultRoom || new Room('default')
	}

	join(user: User): void {
		this._defaultRoom?.addUser(user)
	}

	joinRoom(room: Room, user: User): void {
		this.removeUserFromCurrentRoom(user)
		this.getRoom(room.id)?.addUser(user)
	}

	addRoom(room: Room): void {
		this._rooms.push(room)
	}

	getRoom(id: string): Room | undefined {
		return this._rooms.find((r) => r.id === id)
	}

	getRooms(): Room[] {
		return this._rooms
	}

	private removeUserFromCurrentRoom(user: User) {
		const room = this._rooms.find((r) => r.getUsers().includes(user))
		if (room) {
			room.removeUser(user)
		}
	}
}
