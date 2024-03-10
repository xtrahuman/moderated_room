import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoutes";
import Navbar from "./components/navbar";
import { useSelector } from "react-redux";
import Home from "./components/home";
import MessageHome from "./components/message";
import MessageContent from "./components/message/messageContent";
import Login from "./components/login";
import SignUp from "./components/signup";
import Notifications from "./components/notification";

function Wrapper({ children, className, ...rest }) {
  return (
    <div className="w-full relative flex">
      <div className="md:w-[15%] fixed z-10 left-0">
        <Navbar />
      </div>
      <div className="w-[0] md:w-[15%] "></div>

      <div {...rest} className="w-[100%] md:w-[85%] px-2">
        {children}
      </div>
    </div>
  );
}

const App = () => {
  // //   console.log('Current route:', location.pathname);
  const { loggedin, userLoading } = useSelector((state) => state.userDetails);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <Wrapper>
                <Login page="/home" />
              </Wrapper>
            }
          />
          <Route
            path="/signup"
            element={
              <Wrapper>
                <SignUp page="/home" />
              </Wrapper>
            }
          />
            <Route
              element={
                <Wrapper>
                  <ProtectedRoute user={loggedin} isLoading={userLoading} />
                </Wrapper>
              }
            >
              <Route
                path="/notification"
                element={
                  <Notifications />
                }
              />

              <Route
                path="/home"
                element={
                  <Home />
                }
              />

              <Route path="/rooms" element={<MessageHome />} />
              <Route
                path="/rooms/:room_uuid"
                element={<MessageContent page="messageUserDetail" />}
              />

              <Route
                path="/"
                element={
                  <Home />
                }
              />
            </Route>
          <Route
            path="*"
            element={
              <Wrapper>
                <p>There's nothing here: 404!</p>
              </Wrapper>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
