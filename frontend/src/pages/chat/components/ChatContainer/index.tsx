import React from "react"
import { RiCloseFill } from "react-icons/ri"
import { GrAttachment } from "react-icons/gr"
import { IoMdSend } from "react-icons/io"
import { RiEmojiStickerLine } from "react-icons/ri"
import EmojiPicker, { Theme } from "emoji-picker-react"
import { useAppStore } from "../../../../store"
import { HOST } from "../../../../utils/constants"
import { getColors } from "../../../../utils/constants"

const ChatContainer = () => {
  const [message, setMessage] = React.useState<string | number>("")

  const handleMessage = async () => {

  }


  const emojiRef = React.useRef(null) as any

  React.useEffect(() => {
    function handleClickOutside(event: Event) {
      if (emojiRef.current && !emojiRef.current.contains(event?.target)) {
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
  const { closeChat, selectedChatData } = useAppStore()
  return (
    <div className="fixed top-0 h-[100vh] bg-[#1c1d25] flex flex-col w-[100vw]">
      <div className="h-[100vh] border-b-2 border-[#2f303b] flex items-center justify-center">
        <div className="flex gap-5 items-center">
          <div className="flex gap-3 items-center justify-center">

<<<<<<< HEAD
            <div className="w-12 h-12 relative">
              <div className="h-12 w-12 rounded-full overflow-hidden">

                {selectedChatData?.image ? (
                  <img
                    src={`${HOST}${selectedChatData?.image}`}
                    alt="profile"
                    className="object-cover w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={`uppercase h-12 w-12 text-md border-[1px] flex items-center justify-center rounded-full ${getColors(
                      selectedChatData?.color
                    )}`}
                  >
                    {selectedChatData?.firstName
                      ? selectedChatData?.firstName.split("").shift()
                      : selectedChatData?.email.split("").shift()}
                  </div>
                )}
              </div>
            </div>

=======


          <div className="w-12 h-12 relative">
                    <div className="h-12 w-12 rounded-full overflow-hidden">

                      {selectedChatData?.image ? (
                        <img
                          src={`${HOST}${selectedChatData?.image}`}
                          alt="profile"
                          className="object-cover w-full h-full bg-black"
                        />
                      ) : (
                        <div
                          className={`uppercase h-12 w-12 text-md border-[1px] flex items-center justify-center rounded-full ${getColors(
                            selectedChatData?.color
                          )}`}
                        >
                          {selectedChatData?.firstName
                            ? selectedChatData?.firstName.split("").shift()
                            : selectedChatData?.email.split("").shift()}
                        </div>
                      )}
                    </div>
                  </div>
            
>>>>>>> 5dcd9f9c23dfa312d495664dca923511f330c984


            <div className="flex items-center justify-center gap-5">
              <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all" onClick={closeChat}>
                <RiCloseFill className="text-3xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
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