import React from "react";
import victoryImg from "../../assets/victory.svg";
import loginBackground from "../../assets/login2.png";
import { toast } from "react-toastify";
import { HOST } from "../../utils/constants.ts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/index.ts";

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

const Auth = () => {
  const [formData, setFormData] = React.useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [isSignUp, setIsSignUp] = React.useState<boolean>(true);

  const validateForm = () => {
    if (!formData.email.length) {
      toast.error("Email is required");
      return false;
    }
    if (!formData.password.length) {
      toast.error("Password is required");
      return false;
    }
    if (isSignUp && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlePageToggle = () => {
    setIsSignUp(!isSignUp);
    setFormData({ email: "", password: "", confirmPassword: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      if (isSignUp) {
        axios
          .post(`${HOST}api/auth/signup`, {
            email: formData.email,
            password: formData.password,
          }, {withCredentials: true})
          .then((res) => {
            if (res.status === 201) {
              toast.success("Successfull");
              setUserInfo(res.data.user);
              navigate("/profile");
            }
          })
          .catch((err) => toast.error(err.response.data.message));
      } else {
        axios
          .post(`${HOST}api/auth/signin`, {
            email: formData.email,
            password: formData.password,
          }, {withCredentials: true})
          .then((res) => {
            if (res.data.user.id) {
              if (res.data.user.profileSetup) {
                navigate("/chat");
              } else {
                navigate("/profile");
              }
            }
          })
          .catch((err) => toast.error(err.response.data));
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="min-h-[100vh] bg-blue-100 flex justify-center">
      <img src={loginBackground} alt="img" className="hidden" />
      <div className="my-20">
        <div className="flex items-center justify-center mb-[-15px]">
          <h2 className="text-gray-800 text-center uppercase">Welcome!</h2>
          <img className="w-20" src={victoryImg} alt="img" />
        </div>
        <span className="text-center block mb-[15px] text-gray-500">
          Fill in the details to get started
        </span>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg w-[500px] h-[max-content] py-6 px-12"
        >
          <div className="mb-[12px]">
            <label className="block text-lg">Email:</label>
            <input
              type="email"
              required
              className="w-full text-base rounded-sm border border-gray-400 border-solid focus:border-blue-500  p-2 outline-none"
              placeholder="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-[12px]">
            <label className="block text-lg">Password:</label>
            <input
              type="password"
              className="w-full text-base rounded-sm border border-gray-400 border-solid focus:border-blue-500  p-2 outline-none"
              placeholder="password"
              id="password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>

          {isSignUp && (
            <div className="mb-[12px]">
              <label className="block text-lg">confirm-password:</label>
              <input
                type="password"
                className="w-full text-base rounded-sm border border-gray-400 border-solid focus:border-blue-500  p-2 outline-none"
                placeholder="confirm password"
                id="confirmPassword"
                onChange={handleChange}
                value={formData.confirmPassword}
              />
            </div>
          )}

          <div className="mb-[30px]">
            <p className="block text-lg">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <span
                onClick={handlePageToggle}
                className="text-blue-500 cursor-pointer"
              >
                {isSignUp ? "SignIn" : "SignUp"}
              </span>
            </p>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className=" w-[100%] cursor-pointer p-1 text-lg rounded-[3px] text-white bg-blue-500 border-0 hover:opacity-90  disabled:opacity-50 transition"
            >
              {isSignUp ? "SignUp" : "SignIn"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Auth;
