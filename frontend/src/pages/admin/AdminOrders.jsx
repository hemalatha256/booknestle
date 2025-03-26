import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL } from "../../assets/constants";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState({});

  const handleStatusChange = async (orderID, newStatus) => {
    const order = orders.filter(order => order._id === orderID)[0];
    axios
      .post(BACKEND_URL + "/admin/modifyOrder", {...order, statusDescription: newStatus})
      .then((res) => {
        alert("Status changed successfully.");
        setStatusValues({ ...statusValues, [orderID]: newStatus });
      })
      .catch((reason) => {
        alert("Error changing order status: " + reason.response.data.toString());
      });
  };


  const tableStyle = { width: "100%", borderCollapse: "collapse" };
  const thStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    backgroundColor: "#3498db",
    color: "#fff",
  };
  const tdStyle = { padding: "10px", border: "1px solid #ddd" };
  const selectStyle = { padding: "5px", borderRadius: "5px" };
  // const buttonStyle = {
  //   padding: "6px 12px",
  //   borderRadius: "5px",
  //   backgroundColor: "#28a745",
  //   color: "#fff",
  //   border: "none",
  //   cursor: "pointer",
  // };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Order Management
      </h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Order ID</th>
            <th style={thStyle}>User</th>
            <th style={thStyle}>Book</th>
            <th style={thStyle}>Total Amount</th>
            <th style={thStyle}>Status</th>
            {/*<th style={thStyle}>Action</th>*/}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} style={{ backgroundColor: "#f9f9f9" }}>
              <td style={tdStyle}>{order._id}</td>
              <td style={tdStyle}>{order.user}</td>
              <td style={tdStyle}>{order.book}</td>
              <td style={tdStyle}>${order.amount}</td>
              <td style={tdStyle}>
                <select
                  value={statusValues[order.id]}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  style={selectStyle}
                >
                  <option value="Pending">Pending</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              {/*<td style={tdStyle}>
                <button
                  style={buttonStyle}
                  onClick={() => handleSave(order._id)}
                >
                  Save
                </button>
              </td>*/}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
