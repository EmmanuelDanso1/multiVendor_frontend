import { useState } from "react";
import { Link, Outlet } from "react-router-dom"; // Added Outlet for nested routes
import { FaBox, FaShoppingCart, FaUser, FaCog, FaBars } from "react-icons/fa";

function VendorDashboard() {
  // State to control sidebar open/collapsed
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar Section */}
      <div
        className={`bg-dark text-white p-3 ${isOpen ? "sidebar-open" : "sidebar-collapsed"}`}
        style={{
          width: isOpen ? "220px" : "70px", // Adjust width when sidebar collapses
          transition: "width 0.3s", // Smooth animation
        }}
      >
        {/* Sidebar Header with toggle button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          {isOpen && (
            <h4>
              <Link to="/vendor/dashboard" className="text-white text-decoration-none">
                Vendor
              </Link>
            </h4>
          )} {/* Clickable Vendor title */}
          
          <button
            className="btn btn-sm btn-outline-light"
            onClick={() => setIsOpen(!isOpen)} // Toggle sidebar open/close
          >
            <FaBars /> {/* Hamburger menu icon */}
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="products" className="nav-link text-white">
              <FaBox /> {isOpen && "My Products"}
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="orders" className="nav-link text-white">
              <FaShoppingCart /> {isOpen && "Orders"}
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="profile" className="nav-link text-white">
              <FaUser /> {isOpen && "Profile"}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="settings" className="nav-link text-white">
              <FaCog /> {isOpen && "Settings"}
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content Section */}
      <div className="flex-grow-1 p-4">
        {/* Outlet will render sub-pages like Products, Orders, Profile, etc. */}
        <Outlet />
      </div>
    </div>
  );
}

export default VendorDashboard;
