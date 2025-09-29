import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
// import ProductDetail from "../pages/ProductDetail";
// import Cart from "../pages/Cart";
// import Checkout from "../pages/Checkout";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import VendorStore from "../pages/VendorStore";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vendor/:id" element={<VendorStore />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
