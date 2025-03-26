import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../assets/constants";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    axios
      .get(BACKEND_URL + "/admin/getStatistics")
      .then((res) => {
        setStatistics(res.data);
      })
      .catch((reason) => {
        alert("Error fetching books data: " + reason.response.data.toString());
      });
  }, []);


  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 text-primary">Admin Dashboard</h2>

      <div className="row g-10 row justify-content-center g-4">
        <div className="col-md-3">
          <div
            className="card shadow-sm border-0 bg-light text-dark"
            onClick={() => navigate("/admin/users")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body text-center">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text fs-4 fw-bold text-primary">{statistics.totalUsersCount}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card shadow-sm border-0 bg-warning text-dark"
            onClick={() => navigate("/admin/sellers")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body text-center">
              <h5 className="card-title">Total Sellers</h5>
              <p className="card-text fs-4 fw-bold">{statistics.totalSellersCount}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card shadow-sm border-0 bg-info text-dark"
            onClick={() => navigate("/admin/orders")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body text-center">
              <h5 className="card-title">Total Orders</h5>
              <p className="card-text fs-4 fw-bold">{statistics.totalOrdersCount}</p>
            </div>
          </div>
        </div>

        {/* <div className="col-md-3">
          <div
            className="card shadow-sm border-0 bg-success text-white"
            onClick={() => navigate("/admin/settings")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body text-center">
              <h5 className="card-title">Settings</h5>
              <p className="card-text fs-4 fw-bold">⚙️</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
