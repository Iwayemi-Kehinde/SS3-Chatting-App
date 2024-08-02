import { useAppStore } from "../../store";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { FaTrash, FaPlus } from "react-icons/fa";
import { colors, getColors, HOST } from "../../utils/constants";
import { toast } from "react-toastify";
import axios from "axios";
const Profile = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [image, setImage] = React.useState<string | null>(null);
  const [hovered, setHovered] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(0);

  React.useEffect(() => {
    if (userInfo.profileSetup === true) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }
    if (userInfo.image) {
      setImage(`${HOST}${userInfo.image}`);
    }
  }, [userInfo]);

  const fileInputRef = React.useRef<HTMLInputElement>(null!);

  const handleNavigate = () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Fill in the fields!");
    }
  };

  const validateProfile = () => {
    if (!firstName) {
      toast.error("FirstName is reqiured");
      return false;
    }
    if (!lastName) {
      toast.error("LastName is reqiured");
      return false;
    }
    return true;
  };
  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const res = await axios.post(
          `${HOST}api/auth/update-profile`,
          { firstName, lastName, color: selectedColor },
          { withCredentials: true }
        );
        if (res.status === 200 && res.data) {
          setUserInfo({ ...res.data });
          toast.success(
            `${res.data.firstName}, you can now begin to chat with your loved ones`
          );
          navigate("/chat");
        }
      } catch (error) {
        console.log({ error });
      }
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };
  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile-image", file);
      const res = await axios.post(
        `${HOST}api/auth/add-profile-image`,
        formData,
        { withCredentials: true }
      );
      if (res.status === 200 && res.data.image) {
        setUserInfo({ ...userInfo, image: res.data.image });
        console.log(res.data.image)
        toast.success("Image updated successfully");
      }
    }
  };

  const handleDeleteImage = async () => {
    try {
      const res = await axios.delete(`${HOST}api/auth/remove-profile-image`, { withCredentials: true })
      if (res.status === 200) {
        setUserInfo({ ...userInfo, image: null })
        toast.success("Image removed successfully")
        setImage(null)
      }
    } catch (error) {
      console.log({error})
    }
  };
  return (
    <div className="bg-[#1b1c24] h-[100vh] flex flex-col items-center justify-center gap-10">
      {/* {userInfo?.id} */}
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoMdArrowBack
            onClick={handleNavigate}
            className="text-4xl lg:text-6xl text-white/50 cursor-pointer hover:opacity-80"
          />
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
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColors(
                    selectedColor
                  )}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo?.email.split("").shift()}
                </div>
              )}
            </div>
            {hovered && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full"
                onClick={image ? handleDeleteImage : handleFileInputClick}
              >
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
              name="profile-image"
              accept=".png, . jpg, .jpeg, .svg, .webp"
            />
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo?.email}
                className="rounded-lg p-6 border-none bg-[#2c2e3b]"
              />
            </div>

            <div className="w-full">
              <input
                placeholder="first name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="rounded-lg p-6 border-none  bg-[#2c2e3b] outline-none"
              />
            </div>

            <div className="w-full">
              <input
                placeholder="Last name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="rounded-lg p-6 border-none  bg-[#2c2e3b] outline-none"
              />
            </div>
            <div className="w-full flex gap-5">
              {colors.map((color: string, index: number) => (
                <div
                  key={index}
                  className={`${color} md:h-10 md:w-10 h-8 w-8 cursor-pointer rounded-full duration-300 transition-all ${
                    selectedColor === index
                      ? "outline outline-white/50 outline-1"
                      : ""
                  }`}
                  onClick={() => setSelectedColor(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <button
            className="h-16 w-full bg-purple-700 text-white text-lg hover:bg-purple-900 transition-all duration-300 rounded-md"
            onClick={saveChanges}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
