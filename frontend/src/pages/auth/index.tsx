import React from "react";
import victoryImg from "../../assets/victory.svg";
import loginBackground from "../../assets/login2.png"

interface FormData {
  email: string;
  password: string;
}

const Auth = () => {
  const [formData, setFormData] = React.useState<FormData>({
    email: "",
    password: "",
  });

  const [isNotSignedIn, setIsNotSignedIn] = React.useState<Boolean>(true)

  const handlePage = () => {
    setIsNotSignedIn((prev) => !prev)
  }


  const handleChange = (e: any) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    isNotSignedIn ? (
    <div className="min-h-[100vh] bg-blue-100 flex justify-center">
      <img src={loginBackground} alt="img" className="hidden"/>
      <div className="my-20">
        <div className="flex items-center justify-center mb-[-15px]">
          <h2 className="text-gray-800 text-center uppercase">Welcome!</h2>
          <img className="w-20" src={victoryImg} alt="img" />
        </div>
          <span className="text-center block mb-[15px] text-gray-500">Fill in the details to get started</span>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg w-[500px] h-[max-content] py-6 px-12">
          <div className="mb-[12px]">
            <label className="block text-lg">Email:</label>
            <input
              type="email"
              required
              className="w-full text-base rounded-sm border border-gray-400 border-solid focus:border-blue-500  p-2 outline-none"
              placeholder="email"
              id="email"
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
            />
          </div>

          
          <div className="mb-[12px]">
            <label className="block text-lg">confirm-password:</label>
            <input
              type="password"
              className="w-full text-base rounded-sm border border-gray-400 border-solid focus:border-blue-500  p-2 outline-none"
              placeholder="confirm password"
              id="confirmPassword"
              onChange={handleChange}
            />
          </div>


          <div className="mb-[30px]">
            <p className="block text-lg">
              {"Alreday have an account?"}{" "}
              <span onClick={handlePage} className="text-blue-500 cursor-pointer">
                Sign in
              </span>
            </p>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className=" w-[100%] cursor-pointer p-1 text-lg rounded-[3px] text-white bg-blue-500 border-0 hover:opacity-90  disabled:opacity-50 transition"
            >
              {"Sign up"}
            </button>
          </div>
        </form>
      </div>
      </div>) : (
         <div className="min-h-[100vh] bg-blue-100 flex justify-center">
         <img src={loginBackground} alt="img" className="hidden"/>
         <div className="my-20 h-[max-content] ">
           <div className="flex items-center justify-center mb-[-15px]">
             <h2 className="text-gray-800 text-center uppercase">Welcome!</h2>
             <img className="w-20" src={victoryImg} alt="img" />
           </div>
             <span className="text-center block mb-[15px] text-gray-500">Fill in the details to get started</span>
           <form onSubmit={handleSubmit} className="bg-white rounded-lg w-[500px] h-[max-content]  py-6 px-12">
             <div className="mb-[12px]">
               <label className="block text-lg">Email:</label>
               <input
                 type="email"
                 required
                 className="w-full text-base rounded-sm border border-gray-400 border-solid focus:border-blue-500  p-2 outline-none"
                 placeholder="email"
                 id="email"
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
               />
             </div>
   
   
             <div className="mb-[30px]">
               <p className="block text-lg">
                 {"don't have an account?"}{" "}
                 <span onClick={handlePage} className="text-blue-500 cursor-pointer">
                   Sign up
                 </span>
               </p>
             </div>
   
             <div className="text-center">
               <button
                 type="submit"
                 className=" w-[100%] cursor-pointer p-1 text-lg rounded-[3px] text-white bg-blue-500 border-0 hover:opacity-90  disabled:opacity-50 transition"
               >
                 {"Sign in"}
               </button>
             </div>
           </form>
         </div>
         </div>
    )
  );
};


export default Auth;
