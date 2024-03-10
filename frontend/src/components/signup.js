import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { localBackendUrl } from "../utility";
import "./form.css";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);


  const signup = async () => {
    const userData = {
      firstName,
      lastName,
      email,
      password,
      username,
    };

    axios
      .post(`${localBackendUrl}/signup`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // response.data;
        resetValues();
        navigate("/login");
      })
      .catch((err) => {
        return err.message;
      });
  };

  const resetValues = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUsername("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (confirmpassword === password) {
      signup();
    } else {
      setPasswordError(true);
    }
  };

  return (
    <div className="bg-white justify-center items-center  md:w-[70%] w-[100%] min-h-screen flex flex-col mt-6">
      <form onSubmit={handleSubmit}>
        <h2 className="text-center text-xl">Sign up Form</h2>
        <div className="flex gap-2 item-center">
          <div className="input-details">
            <input
              id="firstName"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              placeholder="Firstname"
              required
            />
          </div>
          <div className="input-details">
            <input
              id="lastName"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              placeholder="Lastname"
              required
            />
          </div>
        </div>
        <div className="input-details input-width">
          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            type="email"
            required
          />
        </div>
        <div className="input-details input-width">
          <input
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Username"
            type="text"
            required
          />
        </div>

        <div className="flex gap-2 item-center">
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
          <div className="input-details">
            <input
              id="confirmpassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmpassword}
              placeholder="confirm password"
              type="password"
              required
            />
          </div>
        </div>
        <button className="form-submit-button" type="submit">
          Submit
        </button>

        <p
          className={`mt-2 text-center text-red-500 ${
            !passwordError ? "hidden" : ""
          }`}
        >
          Kindly confirm the password
        </p>
      </form>
    </div>
  );
}

export default SignUp;
