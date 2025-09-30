import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AlertProvider } from "./context/AlertContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Register from "./auth/Register";
import Login from "./auth/Login";
import VendorDashboard from "./dashboards/VendorDashboard";
import CustomerDashboard from "./dashboards/CustomerDashboard";
import ProtectedRoute from "./auth/ProtectedRoute";

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

          {/* Protected routes */}
          <Route
            path="/vendor/dashboard"
            element={
              <ProtectedRoute allowedRole="vendor">
                <VendorDashboard />
              </ProtectedRoute>
            }
          />
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
