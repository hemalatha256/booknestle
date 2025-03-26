import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../../assets/constants";
import axios from "axios";

const SellerBooks = () => {
  const navigate = useNavigate();

  // Dummy books data (replace with real API data later)
  const [sellerBooks, setSellerBooks] = useState([]);

  const containerStyle = {
    padding: "20px",
    maxWidth: "1200px",
    margin: "auto",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  };

  const cardStyle = {
    backgroundColor: "#f4f4f4",
    borderRadius: "10px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  };

  const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
  };

  const titleStyle = {
    fontSize: "18px",
    margin: "10px 0",
    color: "#333",
  };

  const priceStyle = {
    fontSize: "16px",
    color: "#555",
    marginBottom: "10px",
  };

  const btnStyle = {
    padding: "8px 16px",
    margin: "5px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const editBtn = { ...btnStyle, backgroundColor: "#007bff", color: "#fff" };
  const deleteBtn = { ...btnStyle, backgroundColor: "#dc3545", color: "#fff" };

  useEffect(() => {
    axios
      .get(BACKEND_URL + "/seller/books")
      .then((res) => {
        setSellerBooks(res.data);
      })
      .catch((reason) => {
        alert("Error fetching books data: " + reason.response.data.toString());
      });
  }, []);


  // ✅ Function to handle Edit click and navigate
  const handleEdit = (bookID) => {
    navigate(`/seller/edit-book/${bookID}`);
  };
  const handleDelete = (bookID) => {
    toast.success(`✅ Book deleted successfully`);

    //delete functional
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Your Books</h2>
      <div style={gridStyle}>
        {sellerBooks.map((book) => (
          <div key={book._id} style={cardStyle}>
            <img src={
              BACKEND_URL + "/bookImage?bookID=" + book._id
            } alt={book.title} style={imageStyle} />
            <h3 style={titleStyle}>{book.title}</h3>
            <p style={priceStyle}>Price: ${book.price}</p>

            {/* ✅ Edit Button triggers navigation */}
            <button style={editBtn} onClick={() => handleEdit(book._id)}>
              Edit
            </button>

            <button style={deleteBtn} onClick={() => handleDelete(book._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SellerBooks;
