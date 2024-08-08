import { createContext, useContext, useEffect, useRef } from "react";
import { useAppStore } from "../store";
import { HOST } from "../utils/constants";
import io from "socket.io-client"

const SocketContext = createContext(null)


export const useSocket = () => {
	return useContext(SocketContext)
}

export const SocketProvider = ({ Children }: any) => {
	const socket = useRef<any>()
	const { userInfo } = useAppStore()

	useEffect(() => {
		if (userInfo) {
			socket.current = io(HOST, {
				withCredentials: true,
				query: { userId: userInfo.id }
			})
			socket.current.on("connect", () => {
				console.log("Connected to socket server")
			})
		}

		socket.current.on("connect", () => {
			console.log("Connetcted to the socket server")
		})

		const handleRecieveMessage = (message: any) => {
			const { selectedChatData, selectedChatType, addMessage } = useAppStore.getState()

			if (selectedChatType !== undefined && selectedChatData._id === message.sender._id || selectedChatData._id === message.recipient._id) {
				addMessage(message)
			}
		}
		socket.current.on("recieveMessage", handleRecieveMessage)
		return () => {
			socket.current.disconnect()
		}
	}, [userInfo])


	return (
		<SocketContext.Provider value={socket.current}>
			{Children}
		</SocketContext.Provider>
	)
}



