import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../../assets/constants";

const AddBook = () => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    genre: "",
    price: 0,
    description: "",
    image: "",
  });

  const containerStyle = {
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  };

  const handleChange = (e) => {
    if (e.target.name === "price")
      setBookData({ ...bookData, [e.target.name]: Number.parseInt(e.target.value) });
    else
      setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Book Data Submitted:", bookData);
    axios
      .post(BACKEND_URL + "/seller/addBook", bookData)
      .then((res) => {
        toast.success(`✅ Book Added ..`);

        // Reset the form
        setBookData({
          title: "",
          author: "",
          genre: "",
          price: 0,
          description: "",
          image: "",
        });
      })
      .catch((reason) => {
        alert("Error adding a new book: " + reason.response.data.toString());
      });
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          type="text"
          name="title"
          placeholder="Book Title"
          value={bookData.title}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          type="text"
          name="author"
          placeholder="Author"
          value={bookData.author}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          type="text"
          name="genre"
          placeholder="Genre"
          value={bookData.genre}
          onChange={handleChange}
        />
        <input
          style={inputStyle}
          type="number"
          name="price"
          placeholder="Price"
          value={bookData.price}
          onChange={handleChange}
          required
        />
        <textarea
          style={inputStyle}
          name="description"
          placeholder="Description"
          value={bookData.description}
          onChange={handleChange}
          rows="4"
        ></textarea>
        <input
          style={inputStyle}
          type="text"
          name="image"
          placeholder="Image URL"
          value={bookData.image}
          onChange={handleChange}
        />
        <input
          style={inputStyle}
          type="number"
          name="pages"
          placeholder="Number of Pages"
          value={bookData.pages}
          onChange={handleChange}
        />

        <button type="submit" style={buttonStyle}>
          Add Book
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddBook;
