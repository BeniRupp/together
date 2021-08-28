import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { Room } from '../src/core/Room'
import Space from '../src/core/Space'

const port = 3010
const app = express()
app.use(bodyParser.json())

app.get('/api/spaces/:spaceId', (req: Request, res: Response) => {
	const rooms = [
		new Room('Lobby'),
		new Room('Some Room'),
		new Room('Top Secret Meeting'),
	]
	const space = new Space('MySpace', rooms)
	res.send(space)
})

app.get('/health', (req: Request, res: Response) => {
	res.send()
})

app.listen(port, () => {
	console.log(`🤖 Mock backend is listening at http://localhost:${port}`)
})
