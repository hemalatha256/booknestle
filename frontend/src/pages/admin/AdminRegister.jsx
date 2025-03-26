import React from "react";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Add signup logic here (API call)
    navigate("/admin/login"); // Redirect to login after successful signup
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
        // style={{
        //   minHeight: "100vh",
        //   backgroundImage:
        //     "url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1350&q=80)",
        //   backgroundSize: "cover",
        // }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "450px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "15px",
        }}
      >
        <h2 className="text-center text-primary mb-4">Admin Signup</h2>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Create a password"
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Register
          </button>

          <div className="mt-3 text-center">
            <span>Already have an account? </span>
            <a
              href="/admin/login"
              className="text-primary text-decoration-none"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
