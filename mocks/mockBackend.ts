import express from 'express'
import bodyParser from 'body-parser'
import { Room } from '../src/core/Room'

const port = 3010
const app = express()
app.use(bodyParser.json())

app.get('/api/spaces/:spaceId/rooms', (req: any, res: any) => {
	const rooms = [
		new Room('Some Room'),
		new Room('Top Secret Meeting'),
		new Room('Lobby'),
	]
	res.send(rooms)
})

app.get('/health', (req: any, res: any) => {
	res.send()
})

app.listen(port, () => {
	console.log(`🤖 Mock backend is listening at http://localhost:${port}`)
})
