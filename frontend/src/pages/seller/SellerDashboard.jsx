import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../assets/constants";

const SellerDashboard = () => {
  const dashboardStyle = {
    padding: "20px",
    backgroundColor: "#f9f9f9",
  };

  const headingStyle = {
    marginBottom: "20px",
    color: "#333",
  };

  const statsStyle = {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    flex: 1,
    textAlign: "center",
  };

  const actionLinkStyle = {
    display: "inline-block",
    marginRight: "15px",
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
  };

  const actionLinkHover = {
    backgroundColor: "#0056b3",
  };

  const [statistics, setStatistics] = useState({ booksCount: 0, ordersCount: 0 });

  useEffect(() => {
    axios
      .get(BACKEND_URL + "/seller/getStatistics")
      .then((res) => {
        setStatistics(res.data);
      })
      .catch((reason) => {
        alert(reason.response.data.toString());
        // navigate("/books");
      });
  }, []);


  return (
    <div style={dashboardStyle}>
      <h1 style={headingStyle}>Welcome, Seller!</h1>

      <div style={statsStyle}>
        <div style={cardStyle}>
          <h3>Total Books Listed</h3>
          <p>{statistics.sellerBooksCount}</p>
        </div>
        <div style={cardStyle}>
          <h3>Total Orders</h3>
          <p>{statistics.sellerOrdersCount}</p>
        </div>
        <div style={cardStyle}>
          <h3>Total Revenue</h3>
          <p>${statistics.sellerOrdersSum}</p>
        </div>
      </div>

      <div>
        <Link to="/seller/add-book" style={actionLinkStyle}>
          Add New Book
        </Link>
        <Link to="/seller/books" style={actionLinkStyle}>
          View My Books
        </Link>
        <Link to="/seller/orders" style={actionLinkStyle}>
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default SellerDashboard;
