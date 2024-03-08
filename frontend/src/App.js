import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoutes";
import Navbar from "./components/navbar";
import { useSelector } from "react-redux";
import Home from "./components/home";
// import UserProfileDetails from "./components/profileDetails";
// import PostDetails from "./components/";
import MessageHome from "./components/message";
import MessageContent from "./components/message/messageContent";
import Login from "./components/login";
import SignUp from "./components/signup";

function Wrapper({ children, className, ...rest }) {
  return (
    <div className="w-full relative flex">
      <div className="md:w-[15%] fixed z-10 left-0">
        <Navbar />
      </div>
      <div className="w-[0] md:w-[15%] ">
      </div>

      <div {...rest} className="w-[100%] md:w-[85%] px-2">
        {children}
      </div>
    </div>
  );
}

const App = () => {

  // //   console.log('Current route:', location.pathname);
  const { loggedin } = useSelector((state) => state.userDetails);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/home"
            element={
              <Wrapper>
                <Home />
              </Wrapper>
            }
          />
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
          {/* <Route
            path="/profile/:id"
            element={
              <Wrapper>
                <UserProfileDetails />
              </Wrapper>
            }
          /> */}
          {/* <Route
            path="/post/:post_id"
            element={
              <Wrapper>
                <PostDetails />
              </Wrapper>
            }
          /> */}
          <Route
            element={
              <Wrapper>
                <ProtectedRoute user={loggedin} />
              </Wrapper>
            }
          >
            <Route path="/messages" element={<MessageHome />} />
            <Route
              path="/messages/:message_id"
              element={<MessageContent page="messageUserDetail" />}
            />
            <Route
              path="/messages/ai/:message_id"
              element={<MessageContent page="messageAiDetail" />}
            />
            <Route
              path="/messages/ai"
              element={<MessageContent page="messageAi" />}
            />
            <Route
              path="/"
              element={
                <Wrapper>
                  <p>private page</p>
                </Wrapper>
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
