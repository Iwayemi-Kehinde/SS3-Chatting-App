import React from "react"
import { RiCloseFill } from "react-icons/ri"
import { GrAttachment } from "react-icons/gr"
import { IoMdSend } from "react-icons/io"
import { RiEmojiStickerLine } from "react-icons/ri"
import EmojiPicker, { Theme } from "emoji-picker-react"
import { useAppStore } from "../../../../store"
import { HOST } from "../../../../utils/constants"
import { getColors } from "../../../../utils/constants"
import { useSocket } from "../../../../context/SocketContext"
import MessageContainer from "./MessageContainer.tsx"

const ChatContainer = () => {
  const [message, setMessage] = React.useState<string | number>("")
  const socket: any = useSocket()
  const handleMessage = async () => {
    if (selectedChatType === "contect") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        content: message,
        recipient: selectedChatData._id,
        messageType: "text",
        fileUrl: undefined
      })
    }
  }


  const emojiRef = React.useRef(null) as any

  React.useEffect(() => {
    function handleClickOutside(event: Event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }

  }, [emojiRef])
  const handleEmoji = (emoji: any) => (
    setMessage((msg: any) => emoji * msg)
  )
  const [emojiPickerOpen, setEmojiPickerOpen] = React.useState(false)
  const { closeChat, selectedChatData, selectedChatType, userInfo } = useAppStore()
  return (
    <div className="fixed bg-[#1b1c24] top-0 bottom-0 flex flex-col justify-between w-[100vw]">
      <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
        <div className="flex gap-5 items-center w-full">
          <div className="flex gap-3 items-center justify-between w-full">
            <div className="flex items-center gap-[10px]">

              {selectedChatData.image ? (
                <img
                  src={`${HOST}${selectedChatData?.image}`}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-12 w-12 text-md border-[1px] flex items-center justify-center rounded-full ${getColors(
                    selectedChatData.color
                  )}`}
                >
                  {selectedChatData.firstName
                    ? selectedChatData.firstName.split("").shift()
                    : selectedChatData.email.split("").shift()}
                </div>
              )}
              <div>
                {selectedChatType === "contact" && selectedChatData.firstName ? `${selectedChatData.firstName} ${selectedChatData.lastName}` : selectedChatData.email}
              </div>
            </div>


            <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all" onClick={closeChat}>
              <RiCloseFill className="text-3xl" />
            </button>


          </div>
        </div>
      </div>

      <MessageContainer />

      <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
        <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
          <input type="text" value={message} className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none" placeholder="Enter message" onChange={(e) => setMessage(e.target.value)} />
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all" >
            <GrAttachment className="text-2xl" />
          </button>
          <div className="relative">
            <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all" onClick={() => setEmojiPickerOpen(true)}>
              <RiEmojiStickerLine className="text-2xl" />
            </button>
            <div className="absolute bottom-16 right-0" ref={emojiRef}>
              <EmojiPicker theme={Theme.DARK} open={emojiPickerOpen} onEmojiClick={handleEmoji} autoFocusSearch={false} />
            </div>
          </div>
        </div>

        <button className="bg-[#8417ff] rounded-md flex items-center justify-center p-5 focus:border-none focus:outline-none focus:text-white duration-300 transition-all" onClick={handleMessage} >
          <IoMdSend className="text-2xl" />
        </button>
      </div>
    </div>
  )
}

export default ChatContainer