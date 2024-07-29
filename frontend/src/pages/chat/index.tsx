import { useAppStore } from "../../store"
import { useNavigate } from "react-router-dom"
import React from "react"
import { toast } from "react-toastify"
import ContactContainer from "./components/contacts-container"
import EmptyChatContainer from "./components/empty-chat-container"
import ChatContainer from "./components/chat-container"

const Chat = () => {
  const { userInfo } = useAppStore()
  const navigate = useNavigate()
  React.useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup profile to continue")
      navigate("/profile")
    }
  }, [userInfo, navigate])
  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      <ContactContainer />
      {/* <EmptyChatContainer /> */}
      <ChatContainer />
    </div>
  )
} 

export default Chat