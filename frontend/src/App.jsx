import "./App.css";
import BookList from "./Components/BooksList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/login";
import UserSignup from "./Components/Usersignup";
import booksData from "./assets/Utility";
import SellerLogin from "./pages/seller/SellerLogin";
import SellerDashboard from "./pages/seller/SellerDashboard";
import AddBook from "./pages/seller/AddBook";
import SellerBooks from "./pages/seller/SellerBooks";
import SellerOrders from "./pages/seller/SellerOrders";
// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSellers from "./pages/admin/AdminSellers";
import AdminOrders from "./pages/admin/AdminOrders";
// import AdminSettings from "./pages/admin/AdminSettings";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import SellerSignup from "./pages/seller/SellerSignup";
// import Home from "./Components/Home";

import EditBook from "./pages/seller/EditBook"; // Adjust the path based on your folder structure
import NavigationBar from "./Components/Navbar";
import UserOrders from "./Components/UserOrders";
// import BookDetail from "./Components/BookDetail";
import BookDetails from "./Components/BookDetails";

// Inside <Routes>

function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        {/* <img
          src="https://th.bing.com/th/id/OIP.WQ1Ph3qH25VgTpAOKuUsLAHaEK?rs=1&pid=ImgDetMain"
          alt="Books Banner"
          className="img-fluid rounded shadow"
          style={{
            width: "100%",
            maxHeight: "450px",
            objectFit: "cover",
            borderRadius: "15px",
          }}
        /> */}

        {/* <div
          style={{
            backgroundImage:
              "url('https://th.bing.com/th/id/OIP.WQ1Ph3qH25VgTpAOKuUsLAHaEK?rs=1&pid=ImgDetMain')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh", // Full screen height
            padding: "20px",
          }}
        ></div> */}
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route
            path="/book-details/:bookID"
            element={<BookDetails />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/seller/login" element={<SellerLogin />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/add-book" element={<AddBook />} />
          <Route path="/seller/books" element={<SellerBooks />} />
          <Route path="/seller/orders" element={<SellerOrders />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/sellers" element={<AdminSellers />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          {/* <Route path="/admin/settings" element={<AdminSettings />} /> */}
          <Route path="/admin/login" element={<AdminLogin />} />
          {/*<Route path="/admin/register" element={<AdminRegister />} />*/}
          <Route path="/seller/register" element={<SellerSignup />} />
          <Route path="/user-orders" element={<UserOrders />} />
          <Route path="/seller/edit-book/:bookID" element={<EditBook />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
