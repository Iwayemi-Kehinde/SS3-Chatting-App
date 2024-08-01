import { useNavigate } from "react-router-dom"
import { useAppStore } from "../../../../../../store"
import { HOST } from "../../../../../../utils/constants"
import axios from "axios"
import { getColors } from "../../../../../../utils/constants"
import { FiEdit2 } from "react-icons/fi"
import { IoLogOut } from "react-icons/io5"
import { toast } from "react-toastify"


const Profile = () => {
    const { userInfo, setUserInfo } = useAppStore()
    const navigate = useNavigate()
    const handleLogout = async () => {
        const res = await axios.post(`${HOST}api/auth/logout`, {withCredentials: true})
        if(res.status === 200) {
            toast.success("Logout successfull")
            navigate("/auth")
            setUserInfo(null)
        }
    }
    return (
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
                    <IoLogOut onClick={handleLogout} className="text-lg"/>
                </div>
            </div>
        </div>
    )
}

export default Profile