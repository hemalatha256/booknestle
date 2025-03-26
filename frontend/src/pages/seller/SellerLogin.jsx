import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { BACKEND_URL } from "../../assets/constants";
import axios from "axios";

const SellerLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(BACKEND_URL + "/seller/login", {
        email: email,
        password: CryptoJS.MD5(password).toString(),
      })
      .then((res) => {
        alert("Login successful.");
        navigate("/seller/dashboard"); // Redirect to seller dashboard
      })
      .catch((reason) => {
        alert(reason.response.data.toString());
        // navigate("/books");
      });
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1581093448794-1e7b2b4dbaf8?auto=format&fit=crop&w=1350&q=80)",
        backgroundSize: "cover",
      }}
    >
      <div
        className="card shadow p-4"
        style={{
          width: "400px",
          backgroundColor: "rgba(255,255,255,0.95)",
          borderRadius: "15px",
        }}
      >
        <h2 className="text-center text-success mb-4">Seller Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email / Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
        </form>

        {/* <div className="mt-3 text-center">
          <a
            href="/seller/forgot-password"
            className="text-decoration-none text-danger"
          >
            Forgot Password?
          </a>
        </div> */}

        <div className="mt-2 text-center">
          <span>Don't have an account? </span>
          <a
            href="/seller/register"
            className="text-decoration-none text-success"
          >
            Signup
          </a>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
