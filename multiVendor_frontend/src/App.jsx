import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AlertProvider } from "./context/AlertContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Register from "./auth/Register";
import Login from "./auth/Login";
import VendorDashboard from "./dashboards/VendorDashboard";
import CustomerDashboard from "./dashboards/CustomerDashboard";
import MyProducts from "./dashboards/vendor/MyProducts";
import Orders from "./dashboards/vendor/Orders";
import Profile from "./dashboards/vendor/Profile";
import Settings from "./dashboards/vendor/Settings";
import ProtectedRoute from "./auth/ProtectedRoute";
import DashboardHome from "./dashboards/vendor/DashboardHome";
import AddProduct from "./dashboards/vendor/AddProduct";
import EditProduct from "./dashboards/vendor/EditProduct";


function App() {
  return (
    <AlertProvider>
      <Router>
        <Header />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Vendor protected routes */}
          <Route
            path="/vendor/dashboard"
            element={
              <ProtectedRoute allowedRole="vendor">
                <VendorDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={< DashboardHome />} />
            <Route path="products" element={<MyProducts />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/:id/edit" element={<EditProduct />} /> 
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Customer protected routes */}
          <Route
            path="/customer/dashboard"
            element={
              <ProtectedRoute allowedRole="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AlertProvider>
  );
}

export default App;
