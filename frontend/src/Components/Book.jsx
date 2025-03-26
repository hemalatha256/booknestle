import React from "react";
import "./Book.css";
import { useNavigate } from "react-router-dom";

import { BACKEND_URL } from "../assets/constants";

const Book = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate with book.id (make sure book.id exists)
    console.log(book._id);
    navigate(`/book-details/${book._id}`);
  };

  return (
    <div
      className="book-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <img
        src={
          BACKEND_URL + "/bookImage?bookID=" + book._id
        }
        alt={book.title + " Image"}
      />
      <h2>{book.title}</h2>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Genre:</strong> {book.genre}
      </p>
      <p>{book.description}</p>
      {/*<p>
        <strong>Pages:</strong> {book.pages}
      </p>*/}
      <p className="price">Price: ₹{book.price}</p>
      {/*<p className="rating">⭐ {book.rating}</p>*/}
    </div>
  );
};

export default Book;
