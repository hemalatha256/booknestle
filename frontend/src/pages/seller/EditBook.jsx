import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../../assets/constants";

const EditBook = () => {
  const navigate = useNavigate();
  const { bookID } = useParams();

  const [book, setBook] = useState({});
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get(BACKEND_URL + "/books?bookID=" + bookID)
      .then((res) => {
        setBook(res.data[0]);
      })
      .catch((reason) => {
        alert("Error adding a new book: " + reason.response.data.toString());
      });
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "price")
      setBook({ ...book, [e.target.name]: Number.parseInt(e.target.value) });
    else
      setBook({ ...book, [e.target.name]: e.target.value });
    // setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(BACKEND_URL + "/seller/modifyBook", book)
      .then((res) => {
        toast.success(`✅ Book Updated ..`);

        // Reset the form
        setBookData({
          title: "",
          author: "",
          genre: "",
          price: 0,
          description: "",
          image: "",
        });
        navigate(`/seller/books`);
      })
      .catch((reason) => {
        alert("Error adding a new book: " + reason.response.data.toString());
      });
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Edit Book - ID: {bookID}</h2>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
        <div className="mb-3">
          <label className="form-label">Book Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Genre</label>
          <input
            type="text"
            className="form-control"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={book.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Pages</label>
          <input
            type="number"
            className="form-control"
            name="pages"
            value={book.pages}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={book.price}
            onChange={handleChange}
            required
          />
        </div>

        {/*<div className="mb-3">
          <label className="form-label">Rating</label>
          <input
            type="number"
            step="0.1"
            className="form-control"
            name="rating"
            value={book.rating}
            onChange={handleChange}
            required
          />
        </div>*/}

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={book.itemImage}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Save Changes
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EditBook;
