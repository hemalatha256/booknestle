import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  // Cancel the order if status is pending
  // const handleCancel = (orderId) => {
  //   const updatedOrders = orders.map((order) =>
  //     order.id === orderId && order.status === "Pending"
  //       ? { ...order, status: "Cancelled" }
  //       : order
  //   );
  //   setOrders(updatedOrders);
  // };

  useEffect(() => {
    axios
      .get(BACKEND_URL + "/user/orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((reason) => {
        alert("Error fetching user's orders: " + reason.response.data.toString());
      });
  }, []);

  const handleCancel = async (orderID) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (confirmCancel) {
      axios
        .get(BACKEND_URL + "/user/orders")
        .then((res) => {
          toast.success(`✅ Cancelled.`);
        })
        .catch((reason) => {
          alert("Error cancelling user's order: " + reason.response.data.toString());
        });
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">My Orders</h2>

      <table className="table table-bordered shadow">
        <thead className="table-primary text-center">
          <tr>
            <th>Order ID</th>
            <th>Book</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.books[0].title}</td>
              <td>${order.totalAmount}</td>
              <td>
                <span
                  className={`badge ${
                    order.status === "Delivered"
                      ? "bg-success"
                      : order.status === "Pending"
                      ? "bg-warning text-dark"
                      : "bg-danger"
                  }`}
                >
                  {order.statusDescription}
                </span>
              </td>
              <td>
                {order.status === "Pending" ? (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleCancel(order._id)}
                  >
                    Cancel
                  </button>
                ) : (
                  <span className="text-muted">No Action</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UserOrders;
