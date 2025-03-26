import React, { useState } from "react";
import "./UserSignup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../assets/constants";
// import Home from "./Home";

const UserSignup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleOnSubmit(e) {
    e.preventDefault();

    axios
      .post(BACKEND_URL + "/user/signup", {
        name,
        email,
        password: CryptoJS.MD5(password).toString(),
      })
      .then((res) => {
        alert("Signup successful.");
        navigate("/login");
      })
      .catch((reason) => {
        alert(reason.response.data.toString());
        // navigate("/books");
      });
  }

  return (
    <>
      {/* <Home /> */}
      <div className="signup-container">
        <h2>Create Account</h2>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Create a password"  onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm your password" />
        </div>
        <button onSubmit={handleOnSubmit}>Sign Up</button>

        <div className="login-text">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </>
  );
};

export default UserSignup;
