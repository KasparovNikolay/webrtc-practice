import { io } from 'socket.io-client'

const SERVER_URI = import.meta.env.DEV ? 'http://localhost:3002' : 'production url'

const socket = io(SERVER_URI)

export default socket
