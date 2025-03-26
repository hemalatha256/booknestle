import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { BACKEND_URL } from "../assets/constants";
import CryptoJS from "crypto-js";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post(BACKEND_URL + "/user/login", {
        email: email,
        password: CryptoJS.MD5(password).toString(),
      })
      .then((res) => {
        alert("Login successful.");
        navigate("/books");
      })
      .catch((reason) => {
        alert(reason.response.data.toString());
        // navigate("/books");
      });
  };

  return (
    <>
      {/* <Home/> */}
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" onClick={handleLogin}>
            Login
          </button>

          <div className="login-links">
            <a href="/signup">Sign Up</a>
          </div>
        </form>
      </div>
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
    </>
  );
};

export default Login;
