import React from "react"
import { FaPlus, FaSearch, FaTimes } from "react-icons/fa"
import axios from "axios"
import { getColors } from "../../../../utils/constants"
import { HOST } from "../../../../utils/constants"
import { useAppStore } from "../../../../store"
import { FiEdit2 } from "react-icons/fi"
import { IoLogOut } from "react-icons/io5"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

interface contactInterface {
  _id: string;
  lastName: string;
  firstName: string;
  email: string;
  color: number;
  image: string;
  password: string
  __v: number
}
const ContactsContainer = () => {
  const { userInfo, setUserInfo, setSelectedChatType, setSelectedChatData } = useAppStore()
  const navigate = useNavigate()
  const handleLogout = async () => {
    const res = await axios.post(`${HOST}api/auth/logout`, { withCredentials: true })
    if (res.status === 200) {
      toast.success("Logout successfull")
      navigate("/auth")
      setUserInfo(null)
    }
  }


  const [openNewContactModel, setopenNewContactModel] = React.useState<Boolean>(false)

  const [searchedContacts, setSearchedContacts] = React.useState([])

  const [searchTerm, setSearchTerm] = React.useState<string>("")

  const searchContacts = async () => {
    try {
      if (searchTerm.length > 0) {
        const res = await axios.post(`${HOST}api/contact/search`, { searchTerm }, { withCredentials: true })
        if (res.status === 200 && res.data.contacts) {
          setSearchedContacts(res.data.contacts)
          setSearchTerm("")
        } else if (res.status === 404) {
          toast.info("No user found !")
        }
      } else {
        toast.info("Input field cannot be empty")
      }
    } catch (error) {
      console.log(error)
    }
  }




    const selectNewContact = (contact: any) => {
      setopenNewContactModel(false)
      setSelectedChatType("contact")
      setSelectedChatData(contact)
      setSearchedContacts([])
    }
    return (
      <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full ">
        <div className="pt-3">
          <img src={""} alt="logo" />
        </div>
        <div className="my-5">
          <div className="flex items-center justify-between pr-10">
            <Title text="## direct messages" />
            <div>
              <FaPlus className="w-10 h-5 cursor-pointer hover:text-gray-500 transition duration-300" onClick={() => setopenNewContactModel(true)} />
            </div>

            <div className={`bg-black/60 backdrop-filter hover:backdrop-blur-sm transition duration-200 cursor-pointer left-0 absolute top-0 bottom-0 right-0 ${openNewContactModel ? "scale-100 opacity-1" : "scale-0 opacity-0"}`}>
              <FaTimes onClick={() => setopenNewContactModel(false)} className="w-10 h-10 absolute right-0 mt-3 mr-3 text-3xl cursor-pointer hover:text-gray-500 transition duration-300" />
              <div className={`px-4`}>
                <span className="block text-white font-bold text-[14px] mt-20 mb-10 text-center">Please select a contact</span>

                <div className="relative rounded-lg p-2 w-full bg-[#2c2e3b]">
                  <input type="text" placeholder="Search Contacts" className="border-none rounded-lg p-2 w-full bg-[#2c2e3b] outline-none text-white" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  <button type="button" onClick={searchContacts} className="active:scale-60 transition duration-800 absolute right-[20px] bg-purple-600 text-white p-2 rounded hover:bg-purple-700">
                    <FaSearch className="w-5 h-5 text-white" />
                  </button>
                </div>
                <div className="flex flex-col gap-5 mt-4">
                  {searchedContacts.map((contact: contactInterface) => <div key={contact._id} className="flex gap-3 item-center cursor-pointer" onClick={() => selectNewContact(contact)}>
                    <div className="w-12 h-12 relative">
                      <div className="h-12 w-12 rounded-full overflow-hidden">

                        {contact?.image ? (
                          <img
                            src={`${HOST}${contact?.image}`}
                            alt="profile"
                            className="object-cover w-full h-full bg-black"
                          />
                        ) : (
                          <div
                            className={`uppercase h-12 w-12 text-md border-[1px] flex items-center justify-center rounded-full ${getColors(
                              contact?.color
                            )}`}
                          >
                            {contact?.firstName
                              ? contact?.firstName.split("").shift()
                              : contact?.email.split("").shift()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span>
                        {contact?.firstName && contact?.lastName ? `${contact?.firstName} ${contact?.lastName}` : contact?.email}
                      </span>
                      <span className="text-xs">{contact.email}</span>
                    </div>
                  </div>)}
                </div>
                {
                  searchedContacts.length <= 0 && (
                    <div className="text-center mt-20">No Contacts</div>
                  )
                }
              </div>

              <div className="bg-[#1c1b1e] border-none mb-2 p-3 text-white hidden" id="tooltip">Select new contact</div>
            </div>
          </div>
        </div>



        <div className="my-5">
          <div className="flex items-center justify-between pr-10">
            <Title text="## channels" />
          </div>
        </div>




        <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
          <div className="flex gap-3 items-center justify-center">
            <div className="w-12 h-12 relative ">
              <div className="h-12 w-12  rounded-full overflow-hidden">
                {userInfo?.image ? (
                  <img
                    src={`${HOST}${userInfo?.image}`}
                    alt="profile"
                    className="object-cover w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={`uppercase h-12 w-12 text-md border-[1px] flex items-center justify-center rounded-full ${getColors(
                      userInfo?.color
                    )}`}
                  >
                    {userInfo?.firstName
                      ? userInfo?.firstName.split("").shift()
                      : userInfo?.email.split("").shift()}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            {userInfo?.firstName && userInfo?.lastName ? `${userInfo?.firstName} ${userInfo?.lastName}` : ""}
          </div>
          <div className="flex gap-5">
            <div>
              <FiEdit2 className="text-lg hover" onClick={() => navigate("/profile")} />
              <div className="bg-[#1c1b1e] border-none text-white hidden">Edit profile</div>
            </div>

            <div>
              <IoLogOut onClick={handleLogout} className="text-lg" />
            </div>
          </div>
        </div>

      </div>
    );
  };


export default ContactsContainer;

interface text {
  text: string | number
}


const Title = ({ text }: text) => {
  return (
    <h4 className="uppercase tracking-videst text-neutral-400 pl-10 font-light text-opacity-90 text-sm">{text}</h4>
  )
}
