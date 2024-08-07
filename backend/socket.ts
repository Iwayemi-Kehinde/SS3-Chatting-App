import { Server as SocketIOServer } from "socket.io"

const setupSocket = (server: any) => {
	const io = new SocketIOServer(server, {
		cors: {
			origin: process.env.ORIGIN,
			methods:["GET","POST"],
			credentials: true
		}
	})

	const userSocketMap = new Map()

	const disconnect = (socket: any) => {
		console.log(`Client disconnected ${socket.id}`)
		for(const [userId, socketId] of userSocketMap.entries()) {
			if(socketId === socket.id) {
				break;
			}
		}
	}

	io.on("connection", (socket: any) => {
		const userId = socket.handshake.query.userId
		if(userId) {
			userSocketMap.set(userId, socket.id)
			console.log(`user connected: ${userId} with socket ID: ${socket.id}`)
		} else {
			console.log("User ID not provided during connection")
		}
		socket.on("disconnect", () => disconnect(socket))
	})
}

export default setupSocket