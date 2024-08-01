import React from "react"
import { GrAttachment } from "react-icons/gr"
import { IoMdSend } from "react-icons/io"
import { RiEmojiStickerLine } from "react-icons/ri"
import EmojiPicker, { Theme } from "emoji-picker-react"


const MessageBar = () => {
  const [message, setMessage] = React.useState<string | number>("")
  const handleMessage = async () => {
    
  }
  const emojiRef = React.useRef()

React.useEffect(() => {
  function handleClickOutside(event: Event){
    if(emojiRef.current && !emojiRef.current.contains(event?.target)) {
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
  return (
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
          <div className="absolute bottom-16 right-0">
            <EmojiPicker theme={Theme.DARK} open={emojiPickerOpen} onEmojiClick={handleEmoji} autoFocusSearch={false}/>
          </div>
        </div>
      </div>
 
      <button className="bg-[#8417ff] rounded-md flex items-center justify-center p-5 focus:border-none focus:outline-none focus:text-white duration-300 transition-all" onClick={handleMessage} >
        <IoMdSend className="text-2xl" />
      </button>
    </div>

  )
}
export default MessageBar