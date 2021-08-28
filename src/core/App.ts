import { User } from './User'
import Space from './Space'

export class App {
	space?: Space

	joinSpace(space: Space, user: User): void {
		this.space = space
		this.space.join(user)
	}
}
