import { useEffect, useRef } from "react"
import { useAppStore } from "../../../../store"
import moment from "moment"

const MessageContainer = () => {
  const scrollRef = useRef()
  const { selectedChatType, selectedChatData, userInfo, selectedChatMessages } = useAppStore()
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" })
    }
  }, [selectedChatMessages])
  const renderMessage = () => {
    let lastDate: any = null
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timeStamp).format("YYYY-MM-DD")
      const showDate = messageDate !== lastDate
      lastDate = messageDate
      return (
        <div key={message._id}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {
            selectedChatType === "contact" && renderDMMessages(message)
          }
        </div>
      )
    })
  }

  function renderDMMessages(message: any) {
    return (
      <div className={`${message.sender === selectedChatData._id ? "text-right":"text-left"}`}>
       {
        message.messageType === "text" && (
          <div className={`${message.sender !== selectedChatData._id ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50" : "bg-[#2a2b33]/5 text-[#fff] border-[#fff]/20"}border inline-block p-4 rounded my-1 max-w-[50%] break-words`}>{message.content}</div>
        )
       }
       <div className="text-xs text-gray-500">{moment(message.timestamp).format("LT")}</div>
      </div>
    )
  }
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessage()}
      <div ref={scrollRef}></div>
    </div>
  )
}

export default MessageContainer