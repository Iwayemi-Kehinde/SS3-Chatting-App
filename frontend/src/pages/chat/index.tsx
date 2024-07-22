import { useAppStore } from "../../store"
import { useNavigate } from "react-router-dom"
import React from "react"
import { toast } from "react-toastify"

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
    <div>CHAT</div>
  )
} 

export default Chat