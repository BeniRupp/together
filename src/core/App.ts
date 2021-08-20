import { Room } from './Room'
import { User } from './User'

export class App {
	_defaultRoom?: Room
	set defaultRoom(defaultRoom: Room) {
		this._defaultRoom = defaultRoom
	}

	get defaultRoom(): Room {
		return this._defaultRoom || new Room('default')
	}

	join(user: User): void {
		this._defaultRoom?.users.push(user)
	}
}
