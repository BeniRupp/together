import { User } from './User'

export class Room {
	name: string
	_users: User[]

	constructor(name: string) {
		this.name = name
		this._users = []
	}

	set users(users: User[]) {
		this._users.push(...users)
	}
	get users(): User[] {
		return this._users
	}
}
