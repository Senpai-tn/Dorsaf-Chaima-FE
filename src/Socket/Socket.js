import { io } from 'socket.io-client'

const socket = new io('http://127.0.0.1:5000') // tlanci event connection

export default socket
