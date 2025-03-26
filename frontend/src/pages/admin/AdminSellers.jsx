import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../assets/constants";

const AdminSellers = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    axios
      .get(BACKEND_URL + "/admin/sellers")
      .then((res) => {
        setSellers(res.data);
      })
      .catch((reason) => {
        alert("Error fetching sellers data: " + reason.response.data.toString());
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Seller Management
      </h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#2ecc71", color: "#fff" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Email</th>
            {/*<th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Total Books
            </th>*/}
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller) => (
            <tr key={seller._id} style={{ backgroundColor: "#f9f9f9" }}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {seller._id}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {seller.name}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {seller.email}
              </td>
              {/*<td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {seller.totalBooks}
              </td>*/}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSellers;
