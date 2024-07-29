import ChatHeader from "./components/chat-header"

import MessageBar from "./components/message-bar"

const ChatContainer = () => {
  return (
    <div className="fixed top-0 h-[100vh] bg-[#1c1d25] flex flex-col w-[100vw]">
      <ChatHeader />
      <MessageBar />
      <ChatContainer />
    </div>
  )
} 

export default ChatContainer