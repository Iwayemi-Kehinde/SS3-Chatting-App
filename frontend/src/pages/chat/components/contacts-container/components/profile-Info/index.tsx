import { useAppStore } from "../../../../../../store"
import { HOST } from "../../../../../../utils/constants"
import { getColors } from "../../../../../../utils/constants"

const Profile = () => {
    const { userInfo } = useAppStore()
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
                
            </div>
        </div>
    )
}

export default Profile