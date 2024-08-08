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

	const sendMessage = async (message) => {
		const senderSocketId = userSocketMap.get(message.sender)
		const recipeintSocketId = userSocketMap.get(message.recipient)

		const createMessage = await Message.create(message)

		const messageData = await MessageChannel.findById(createdMessage._id).populate("sender", "id email firstName lastNsme image color").populate("recipient", "id email firstName lastNsme image color")
		if(recipeintSocketId) {
			io.to(recipientSocketId).emit("recieveMessage", messageData)
		}

		if(senderSocketId) {
			io.to(senderSocketId).emit("recieveMessage", messageData)
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
		socket.on("sendMessaage", sendMessage)
		socket.on("disconnect", () => disconnect(socket))
	})
}

export default setupSocket