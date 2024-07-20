import React from "react";
import { Link } from "react-router-dom";
import victoryImg from "../../assets/victory.svg";

interface FormData {
  email: string;
  password: string;
}

const Auth = () => {
  const [formData, setFormData] = React.useState<FormData>({
    email: "",
    password: "",
  });

  return (
    <div className="min-h-[100vh] bg-blue-100 flex justify-center">
      <div className="my-20">
        <div className="flex items-center justify-center mb-[-15px]">
          <h2 className="text-gray-800 text-center uppercase">Welcome!</h2>
          <img className="w-20" src={victoryImg} alt="img" />
        </div>
          <span className="text-center block mb-[15px] text-gray-500">Fill in the details to get started</span>
        <form className="bg-white rounded-lg w-[500px] min-h-[350px] py-6 px-12">
          <div className="mb-[12px]">
            <label className="block text-lg">Email:</label>
            <input
              type="email"
              required
              className="w-full text-base rounded-sm border border-gray-400 border-solid focus:border-blue-500  p-2 outline-none"
              placeholder="email"
              id="email"
            />
          </div>

          <div className="mb-[12px]">
            <label className="block text-lg">Password:</label>
            <input
              type="password"
              className="w-full text-base rounded-sm border border-gray-400 border-solid focus:border-blue-500  p-2 outline-none"
              placeholder="password"
              id="password"
            />
          </div>

          <div className="mb-[30px]">
            <p className="block text-lg">
              {"Don't have an account"}{" "}
              <Link to="/signup" className="text-blue-500 cursor-pointer">
                Sign up
              </Link>
            </p>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className=" w-[100%] cursor-pointer p-1 text-lg rounded-[3px] text-white bg-blue-500 border-0 hover:opacity-90  disabled:opacity-50 transition"
            >
              {"Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
