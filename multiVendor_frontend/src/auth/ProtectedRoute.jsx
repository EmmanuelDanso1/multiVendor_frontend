import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("access");
  const role = localStorage.getItem("role");

  // Not logged in → go to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role → redirect them back to their dashboard
  if (allowedRole && role !== allowedRole) {
    if (role === "vendor") {
      return <Navigate to="/vendor/dashboard" replace />;
    }
    if (role === "customer") {
      return <Navigate to="/customer/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // Allowed
  return children;
};

export default ProtectedRoute;
