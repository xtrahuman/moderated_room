import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import login from "../redux/authentication/action";
import "./form.css";

function Login({ page }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { userLoading, loggedin, error } = useSelector(
    (state) => state.userDetails
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password, setUsername, setPassword, () => navigate(page)));
  };

  return (
    <div className="flex w-full md:flex-row flex-col">
      <div className="bg-white justify-center items-center  md:w-[70%] w-[100%] min-h-screen flex flex-col">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl">Log in Form</h2>
          <div className="input-details">
            <input
              id="username"
              type="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="username"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
              required
            />
          </div>
          <div className="input-details">
            <input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              type="password"
              required
            />
          </div>
          <button className="form-submit-button" type="submit">
            Login
          </button>
        </form>
        <div className="flex mt-6 gap-3">
          <p>don't have an account?</p>
          <NavLink to="/signup" className="text-homegreen">
            signup
          </NavLink>
        </div>
        <img
          src={"https://media.giphy.com/media/17mNCcKU1mJlrbXodo/giphy.gif"}
          className={`w-[30px] h-[auto] ${
            userLoading && !loggedin ? "" : "hidden"
          }`}
          alt="loading"
        />
        <p
          className={`${
            error 
            &&
            !userLoading ? "" : "hidden"
          } text-center text-[red]`}
        >

          {error}
        </p>

        {/* <div className="text-sm text-center relative mt-5">
          <p>please Signup or use the details below to test login</p>
          <p>username: xtrahuman</p>
          <p>password: 123456789</p>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
