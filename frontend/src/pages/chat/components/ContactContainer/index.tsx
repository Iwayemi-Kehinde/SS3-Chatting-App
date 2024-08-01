import React from "react"
import { FaPlus } from "react-icons/fa"
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
  image: string
}
const ContactsContainer = () => {
  const { userInfo, setUserInfo } = useAppStore()
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

  const searchContacts = async (searchTerm: any) => {
    try {
      if (searchTerm.length > 0) {
        const res = await axios.post(`${HOST}api/contact/search`, { searchTerm }, { withCredentials: true })
        if (res.status === 200 && res.data.contacts) {
          setSearchedContacts(res.data.contacts)
        }
      } else {
        setSearchedContacts([])
      } ``
    } catch (error) {

    }
  }
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f343b] w-full ">
      <div className="pt-3">
        <img src={""} alt="logo" />
      </div>
      <div className="my-5">
        <div className="flex items-center flex-col justify-between pr-10">
          <Title text="##direct messages" />
          <div>
            <FaPlus className="text-neutral-400 font-light text-opacity-90 cursor-pointer transition-all duration-300 hover:text-neutral-100" onClick={() => setopenNewContactModel(true)} />

            <div className={`text-white border-none bg-[#1c1b1e] w-[400px] h-[400px] flex-col ${openNewContactModel ? "flex" : "hidden"}`}>
              <span className="block text-white font-bold text-[14px] text-center">Please select a contact</span>

              <div>
                <input type="text" placeholder="Search Contacts" className="rounded-lg p-6 bg-[#2c2e3b] outline-none text-gray-500" onChange={(e) => searchContacts(e.target.value)} />
              </div>
              <div className="flex flex-col gap-5">
                {searchedContacts.map((contact: contactInterface) => <div key={contact._id} className="flex gap-3 item-center cursor-pointer">
                  <div className="h-12 w-12 rounded-full overflow-hidden">

                    {contact.image ? (
                      <img
                        src={`${HOST}${contact.image}`}
                        alt="profile"
                        className="object-cover w-full h-full bg-black"
                      />
                    ) : (
                      <div
                        className={`uppercase h-12 w-12 text-md border-[1px] flex items-center justify-center rounded-full ${getColors(
                          contact.color
                        )}`}
                      >
                        {contact.firstName
                          ? contact.firstName.split("").shift()
                          : contact?.email.split("").shift()}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span>
                      {contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}` : contact.email}
                    </span>
                    <span className="text-xs">{contact.email}</span>
                  </div>
                </div>)}
              </div>
              {
                searchedContacts.length <= 0 && (
                  <div>No Contacts (Loading icon)</div>
                )
              }
            </div>

            <div className="bg-[#1c1b1e] border-none mb-2 p-3 text-white hidden" id="tooltip">Select new contact</div>
          </div>

        </div>
      </div>



      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="##channels" />
        </div>
      </div>




      <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-12 h-12 relative ">
            <div className="h-12 w-12  rounded-full overflow-hidden">
              {userInfo.image ? (
                <img
                  src={`${HOST}${userInfo.image}`}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-12 w-12 text-md border-[1px] flex items-center justify-center rounded-full ${getColors(
                    userInfo.color
                  )}`}
                >
                  {userInfo.firstName
                    ? userInfo.firstName.split("").shift()
                    : userInfo?.email.split("").shift()}
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          {userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : ""}
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
