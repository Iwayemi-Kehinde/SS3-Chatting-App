import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Auth from "./pages/auth/index.tsx";
import Chat from "./pages/chat/Index.tsx";
import Profile from "./pages/profile/index.tsx";
import { useAppStore } from "./store/index.ts";
import axios from "axios";
import { HOST } from "./utils/constants.ts";


const PrivateRoute = ({ children }: any) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  console.log(userInfo)
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }: any) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

function App() {
  const { userInfo, setUserInfo } = useAppStore();

  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(`${HOST}api/auth/userInfo`, {
          withCredentials: true,
        });
        if (res.status === 201 && res.data.id) {
          setUserInfo(res.data);
        } else {
          setUserInfo(undefined);
        }
      } catch (error) {
        setUserInfo(undefined);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (!userInfo) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);
  if (loading) {
    return <div>Loading....</div>;
  }
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
          <Route
            path="/auth"
            element={
              <AuthRoute>
                <Auth />
              </AuthRoute>
            }
          ></Route>
          <Route path="*" element={<Navigate to={"/auth"} />}></Route>
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
