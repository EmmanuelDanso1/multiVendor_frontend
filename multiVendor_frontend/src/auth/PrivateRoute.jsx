import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("access");
  const role = localStorage.getItem("role");

  if (!token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    //  Wrong role trying to access a protected page
    if (role === "vendor") {
      return <Navigate to="/vendor/dashboard" replace />;
    }
    if (role === "customer") {
      return <Navigate to="/customer/dashboard" replace />;
    }
    // fallback
    return <Navigate to="/" replace />;
  }

  //  Authorized
  return children;
};

export default PrivateRoute;
