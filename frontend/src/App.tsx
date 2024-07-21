import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from "./pages/auth/index.tsx"
import Chat from "./pages/chat/index.tsx"
import  Profile from "./pages/profile/index.tsx"

function App() {
  return (
    <>
      <BrowserRouter>
          <ToastContainer
             position="bottom-right"
             autoClose={5000}
             hideProgressBar={false}
             newestOnTop={false}
             closeOnClick
             rtl={false}
             pauseOnFocusLoss
             draggable
             pauseOnHover
             theme="dark" 
          />
        <Routes>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="*" element={<Navigate to={"/auth"}/>}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
