import React, { useEffect, useState } from "react";
import Book from "./Book";
import "./BookList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../assets/constants";

const BookList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    axios
      .get(BACKEND_URL + "/books")
      .then((res) => {
        setBooksData(res.data);
      })
      .catch((reason) => {
        alert("Error fetching books: " + reason.response.data.toString());
      });
  }, []);

  // Filter books based on the search input (title matching)
  const handleSearch = (book) => {
    // book.title.toLowerCase().includes(searchTerm.toLowerCase()),
    axios
      .get(BACKEND_URL + "/books?title=" + searchTerm)
      .then((res) => {
        setBooksData(res.data);
      })
      .catch((reason) => {
        alert("Error fetching books: " + reason.response.data.toString());
      });
  };

  return (
    <div className="booklist-container">
      <h1>Books</h1>
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/user-orders")}
      >
        My Orders
      </button>

      <input
        type="text"
        placeholder="Search by book title..."
        value={searchTerm}
        onInput={(e) => {
          setSearchTerm(e.target.value);
        }}
        className="search-input"
      />
      <button onClick={handleSearch} className="d-inline w-25 mx-3">Search</button>

      <div className="books-grid">
        {booksData.map((book, index) => (
          <Book key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
