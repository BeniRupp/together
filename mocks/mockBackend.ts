import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { Room } from '../src/core/Room'
import Space from '../src/core/Space'
import { User } from '../src/core/User'

const port = 3010
const app = express()
app.use(bodyParser.json())

const users = [new User('Jane'), new User('Jack'), new User('Beni')]
const rooms = [
	new Room('Lobby'),
	new Room('Some Room'),
	new Room('Top Secret Meeting'),
]

app.get('/api/users/', (req: Request, res: Response) => {
	res.send(users)
})
app.get('/api/users/:userId', (req: Request, res: Response) => {
	res.send(users.find((u: User) => u.id === req.params['userId']))
})

app.get('/api/spaces/:spaceId', (req: Request, res: Response) => {
	const space = new Space('MySpace', rooms)
	res.send(space)
})

app.get('/health', (req: Request, res: Response) => {
	res.send()
})

app.listen(port, () => {
	console.log(`🤖 Mock backend is listening at http://localhost:${port}`)
})
