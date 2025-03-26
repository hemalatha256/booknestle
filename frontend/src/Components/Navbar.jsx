// src/components/Navbar.jsx

import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../assets/constants";

const NavigationBar = () => {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await Promise.allSettled([
        axios.get(BACKEND_URL + "/user/logout"),
        axios.get(BACKEND_URL + "/seller/logout"),
        axios.get(BACKEND_URL + "/admin/logout"),
      ]);
    } catch (e) {
      console.log(e);
    }
    navigate("/login");
  }

  return (
    <>
      <Navbar
        expand="lg"
        style={{
          backgroundColor: "#4A90E2",
          padding: "15px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
        }}
        variant="dark"
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            style={{ fontSize: "28px", fontWeight: "bold", color: "#FFFBE7" }}
          >
            BookNest 📚
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex gap-3">
              <Link
                to="/login"
                className="btn"
                style={{
                  backgroundColor: "#6BCB77",
                  color: "#fff",
                  fontWeight: "500",
                }}
              >
                User
              </Link>

              <Link
                to="/seller/login"
                className="btn"
                style={{
                  backgroundColor: "#FFD54F",
                  color: "#333",
                  fontWeight: "500",
                }}
              >
                Seller
              </Link>

              <Link
                to="/admin/login"
                className="btn"
                style={{
                  backgroundColor: "#FF6B6B",
                  color: "#fff",
                  fontWeight: "500",
                }}
              >
                Admin
              </Link>

              {document.cookie && (
                <Button
                  className="btn"
                  style={{
                    backgroundColor: "#FF6B6B",
                    color: "#fff",
                    fontWeight: "500",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
