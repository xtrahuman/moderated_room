import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { localBackendUrl } from "../utility";
import "./form.css";

function SignUp() {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  // const avatars = [
  //   "avatar1.png",
  //   "avatar2.png",
  //   "avatar3.png",
  //   "avatar4.png",
  //   "avatar5.png",
  //   "avatar6.png",
  //   "avatar7.png",
  //   "avatar8.png",
  //   "avatar9.png",
  //   "avatar10.png",
  // ];

  const signup = async () => {
    const userData = {
      firstname,
      lastname,
      email,
      password,
      username
    };

    await fetch(`${localBackendUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        resetValues();
        navigate("/login");
      })
      .catch((err) => {

        return (err.message);
      });
  };

  const resetValues =() => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUsername("");
  }

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
              id="firstname"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstname}
              placeholder="Firstname"
              required
            />
          </div>
          <div className="input-details">
            <input
              id="lastname"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastname}
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
            value={email}
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
