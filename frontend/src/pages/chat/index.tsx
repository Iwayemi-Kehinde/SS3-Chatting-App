import React from "react"
import { useAppStore } from "../../store"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ContactContainer from "./components/ContactContainer/index.tsx"
import EmptyChatContainer from "./components/EmptyChatConatiner"
import ChatContainer from "./components/ChatContainer/Index.tsx"


const Chat = () => {
  const { userInfo } = useAppStore()
  const navigate = useNavigate()
  React.useEffect(() => {
    if (userInfo.profileSetup === false) {
      toast("Please setup profile to continue")
      navigate("/profile")
    }
  }, [userInfo, navigate])
  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      <ContactContainer />
<<<<<<< HEAD
      {/* {
        selectedChatType === undefined ? <EmptyChatContainer /> : <ChatContainer />
      } */}
      <EmptyChatContainer />
      {/* <ChatContainer /> */}
=======
      {
        selectedChatType === undefined ? <EmptyChatContainer /> : <ChatContainer />
      }
      {/* <EmptyChatContainer />
      <ChatContainer /> */}
>>>>>>> 5dcd9f9c23dfa312d495664dca923511f330c984
    </div>
  )
} 

export default Chat