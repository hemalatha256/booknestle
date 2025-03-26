import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Input,
} from "reactstrap";
import { BACKEND_URL } from "../assets/constants";

const BookDetails = () => {
  const { bookID } = useParams();
  const [quantity, setQuantity] = useState(1);

  const [bookData, setBookData] = useState({});

  useEffect(() => {
    axios
      .get(BACKEND_URL + "/books?bookID=" + bookID)
      .then((res) => {
        setBookData(res.data[0]);
      })
      .catch((reason) => {
        alert("Error fetching books: " + reason.response.data.toString());
      });
  }, []);

  if (!bookID) {
    return <h2 className="text-center my-5">Book Not Found</h2>;
  }

  const handlePlaceOrder = () => {
    console.log(`Order being placed for ${quantity} copies of "${bookData.title}"`);

    axios
      .post(BACKEND_URL + "/user/placeOrder", {
        bookID: bookID,
        flatNo,
        street,
        city,
        state,
        country,
        pincode,
        quantity
      })
      .then((res) => {
        setBooksData(res.data);
      })
      .catch((reason) => {
        alert("Error fetching books: " + reason.response.data.toString());
      });

    toast.success(`✅ Order placed successfully for ${quantity} copies!`);
  };

  return (
    <Container className="my-5">
      {(bookID && Object.keys(bookData).length > 0) &&
      <><Row className="shadow p-4 rounded">
        <Col
          md="4"
          className="d-flex justify-content-center align-items-center"
        >
          <img
            src={BACKEND_URL + "/bookImage?bookID=" + bookData._id}
            alt={bookData.title}
            className="img-fluid rounded"
            style={{ maxHeight: "400px" }}
          />
        </Col>

        <Col md="8">
          <Card className="border-0">
            <CardBody>
              <CardTitle tag="h2" className="mb-3">
                {bookData.title}
              </CardTitle>
              <CardText>
                <strong>Author:</strong> {bookData.author}
              </CardText>
              <CardText>
                <strong>Genre:</strong> {bookData.genre}
              </CardText>
              {/*<CardText>
                <strong>Pages:</strong> {bookData.pages}
              </CardText>*/}
              <CardText>
                <strong>Description:</strong> {bookData.description}
              </CardText>
              {/*<CardText>
                <strong>Rating:</strong> ⭐ {bookData.rating}
              </CardText>*/}
              <CardText>
                <strong>Price:</strong> ₹{bookData.price}
              </CardText>

              <div className="mt-4">
                <label>
                  <strong>Number of Copies:</strong>
                </label>
                <div className="mt-2 w-100 d-flex align-items-center flex-column">
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    max="20"
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-25 mb-3"
                  />
                </div>
                <Button color="primary" onClick={handlePlaceOrder}>
                  Place Order
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {bookData.moreDescription && <Row className="mt-5">
              <Col>
                <h4>About the Book</h4>
                <p className="text-muted" style={{ lineHeight: "1.8" }}>
                  {bookData.moreDescription ||
                    bookData.description}
                </p>
              </Col>
            </Row>}
      <ToastContainer position="top-right" autoClose={3000} /></>}
    </Container>
  );
};

export default BookDetails;
