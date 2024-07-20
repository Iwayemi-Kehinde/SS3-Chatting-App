import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Auth from "./pages/auth/index.tsx"
import Chat from "./pages/chat/index.tsx"
import  Profile from "./pages/profile/index.tsx"

function App() {
  return (
    <>
      <BrowserRouter>
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
