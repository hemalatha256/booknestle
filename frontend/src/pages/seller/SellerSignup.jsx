import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../assets/constants";

const SellerSignup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post(BACKEND_URL + "/sellers/signup", {})
      .then((res) => {
        setSellers(res.data);
      })
      .catch((reason) => {
        alert("Error fetching sellers data: " + reason.response.data.toString());
      });
    alert("Seller Registered Successfully");
    navigate("/seller/login");
  };

  return (
    <div
      className="container mt-5 p-4 shadow rounded bg-light"
      style={{ maxWidth: "500px" }}
    >
      <h2 className="text-center mb-4">Seller Signup</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
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

        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" onClick={handleSignup}>
          Sign Up
        </button>
      </form>

      <div className="mt-3 text-center">
        <p>
          Already have an account?{" "}
          <span
            className="text-primary"
            role="button"
            onClick={() => navigate("/seller/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SellerSignup;
