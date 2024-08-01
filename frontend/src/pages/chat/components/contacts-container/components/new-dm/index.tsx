import React from "react"
import { FaPlus } from "react-icons/fa"
import axios from "axios"
import { HOST } from "../../../../../../utils/constants"

interface contactInterface {
    _id: string
}
const NewDm = () => {
    const [openNewContactModel, setopenNewContactModel] = React.useState<Boolean>(false)

    const [searchedContacts, setSearchedContacts] = React.useState([])

    const searchContacts = async (searchTerm: any) => {
        try {
            if(searchTerm.length > 0) {
                const res = await axios.post(`${HOST}api/contact/search`, {searchTerm}, {withCredentials: true})
                if(res.status === 200 && res.data.contacts) {
                    setSearchedContacts(res.data.contacts)
                }
            } else {
                setSearchedContacts([])
            }
        } catch (error) {

        }
    }
  return (
    <div>
      <FaPlus className="text-neutral-400 font-light text-opacity-90 cursor-pointer transition-all duration-300 hover:text-neutral-100" onClick={() => setopenNewContactModel(true)}/>

        <div className={`text-white border-none bg-[#1c1b1e] w-[400px] h-[400px] flex-col ${openNewContactModel ? "flex" : "hidden"}`}>
            <span className="block text-white font-bold text-[14px] text-center">Please select a contact</span>

            <div>
                <input type="text" placeholder="Search Contacts" className="rounded-lg p-6 bg-[#2c2e3b] outline-none text-gray-500" onChange={(e) => searchContacts(e.target.value)}/>
            </div>
            <div className="flex flex-col gap-5">
                {searchedContacts.map((contact: contactInterface) => <div key={contact._id} className="flex gap-3 item-center cursor-pointer">
            
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
  )
}

export default NewDm
