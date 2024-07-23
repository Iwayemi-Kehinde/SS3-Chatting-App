import { useAppStore } from "../../store";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { FaTrash, FaPlus } from "react-icons/fa"
import { colors } from "../../utils/constants"
const Profile = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [hovered, setHovered] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(0);

  const saveChanges = async () => {};
  return (
    <div className="bg-blue-100 h-[100vh] flex flex-col items-center justify-center gap-10">
      {userInfo?.id}
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoMdArrowBack className="text-4xl lg:text-6xl text-black cursor-pointer hover:opacity-80" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:h-48 relative flex md:w-48 items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div className="uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex item-center justify-center rounded-full ">
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo?.email.split("").shift()}
                </div>
              )}
            </div>
            {hovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full">
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <div className="flex md:min-w-64 flex-col gap-5 text-white items-center justify-center">
              <div className="w-full">
                <input
                  placeholder="Email"
                  type="email"
                  disabled
                  value={userInfo?.email}
                  className="rounded-lg p-6 border-none"
                />
              </div>

              <div className="w-full">
                <input
                  placeholder="first name"
                  type="text"
                  disabled
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="rounded-lg p-6 border-none"
                />
              </div>

              <div className="w-full">
                <input
                  placeholder="Last name"
                  type="text"
                  disabled
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="rounded-lg p-6 border-none"
                />
              </div>
              <div className="w-full flex gap-5">
                {colors.map((color: string, index: number) => (
                  <div
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`${color} h-8 w-8 cursor-pointer duration-300 transition-all ${selectedColor === index ? "outline outline-white/50 outline-1" : ""}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
