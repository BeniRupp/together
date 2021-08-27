import { User } from './User'
import { v4 as uuid } from 'uuid'

export class Room {
	id: string
	name: string
	private users: User[]

	constructor(name: string) {
		this.id = uuid()
		this.name = name
		this.users = []
	}
	getUsers(): User[] {
		return this.users
	}
	addUser(user: User): void {
		this.users.push(user)
	}
	removeUser(user: User): void {
		this.users = this.users.filter((u) => u.id !== user.id)
	}
}
