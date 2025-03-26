import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../assets/constants";
import { Button } from "react-bootstrap";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(BACKEND_URL + "/admin/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((reason) => {
        alert("Error fetching users data: " + reason.response.data.toString());
      });
  }, []);

  async function handleDelete(userID) {
    await axios
      .post(BACKEND_URL + "/admin/deleteUser")
      .then((res) => {
        alert("User deleted successfully.")
        window.location.reload();
      })
      .catch((reason) => {
        alert("Error fetching users data: " + reason.response.data.toString());
      });
  }

  return (
    <div
      className="container py-5"
      // style={{
      //   backgroundImage:
      //     "url(https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1350&q=80)",
      //   backgroundSize: "cover",
      //   minHeight: "100vh",
      // }}
    >
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-center text-primary mb-4">All Users</h2>

        <table className="table table-bordered table-striped">
          <thead className="table-primary">
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {/*<td>{user.role}</td>*/}
                <td><Button onClick={() => handleDelete(user._id)}>Delete</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
