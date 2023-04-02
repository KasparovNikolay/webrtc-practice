import { io } from 'socket.io-client'

const SERVER_URI = process.env.DEV ? 'http://localhost:3002' : 'production url'

export const socket = io(SERVER_URI)
