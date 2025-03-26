import React, { useState } from "react";

const SellerOrders = () => {
  const ordersData = [
    {
      id: 1,
      bookTitle: "React Mastery",
      buyer: "John Doe",
      quantity: 2,
      total: 1000,
      status: "Pending",
    },
    {
      id: 2,
      bookTitle: "Node.js Guide",
      buyer: "Jane Smith",
      quantity: 1,
      total: 450,
      status: "Shipped",
    },
    {
      id: 3,
      bookTitle: "MongoDB Basics",
      buyer: "Alex Johnson",
      quantity: 3,
      total: 1200,
      status: "Delivered",
    },
  ];

  const [orders, setOrders] = useState(ordersData);
  const [statusValues, setStatusValues] = useState(
    orders.reduce((acc, order) => {
      acc[order._id] = order.status;
      return acc;
    }, {})
  );

  const handleStatusChange = (orderId, newStatus) => {
    setStatusValues({ ...statusValues, [orderId]: newStatus });
  };

  const handleSave = (orderId) => {
    console.log("Saved status:", statusValues[orderId]);
  };

  const containerStyle = {
    padding: "20px",
    maxWidth: "1000px",
    margin: "auto",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    textAlign: "left",
  };

  const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #ccc",
    color: "#333",
  };

  const selectStyle = {
    padding: "5px",
    borderRadius: "5px",
  };

  const buttonStyle = {
    padding: "6px 12px",
    borderRadius: "5px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Orders Received
      </h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Order ID</th>
            <th style={thStyle}>Book Title</th>
            {/*<th style={thStyle}>Buyer</th>*/}
            <th style={thStyle}>Quantity</th>
            <th style={thStyle}>Total (₹)</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td style={tdStyle}>{order._id}</td>
              <td style={tdStyle}>{order.title}</td>
              {/*<td style={tdStyle}>{order.buyer}</td>*/}
              <td style={tdStyle}>{order.total / order.books[0].price}</td>
              <td style={tdStyle}>{order.total}</td>
              <td style={tdStyle}>
                <select
                  value={statusValues[order.statusDescription]}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  style={selectStyle}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
              <td style={tdStyle}>
                <button
                  style={buttonStyle}
                  onClick={() => handleSave(order._id)}
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerOrders;
