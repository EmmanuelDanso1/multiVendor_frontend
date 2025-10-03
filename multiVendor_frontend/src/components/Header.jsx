import { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchProducts } from "../api/products"; //  API for product search
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faShippingFast,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faSearch,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";

function Header() {
  //  Auth state from global context
  const { user, logout } = useContext(AuthContext);

  //  Search state
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);

  //  For debounce + aborting requests
  const debounceRef = useRef(null);
  const controllerRef = useRef(null);

  const navigate = useNavigate();

  // Handle input change with debounce
  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (!val || val.length < 2) {
      setSuggestions([]);
      setOpen(false);
      if (controllerRef.current) controllerRef.current.abort();
      if (debounceRef.current) clearTimeout(debounceRef.current);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      if (controllerRef.current) controllerRef.current.abort();
      controllerRef.current = new AbortController();

      try {
        const results = await searchProducts(val, controllerRef.current.signal);
        setSuggestions(results);
        setOpen(true);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Search error:", err);
          setSuggestions([]);
          setOpen(true);
        }
      }
    }, 300);
  };

  // Handle selecting a suggestion
  const handleSelect = (id) => {
    setQuery("");
    setSuggestions([]);
    setOpen(false);
    navigate(`/product/${id}`);
  };

  // Handle search submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  //  Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-warning py-2">
      <div className="container-fluid">
        {/* Brand */}
        <Link
          className="navbar-brand fw-bold text-secondary me-4"
          to={
            user
              ? user.role === "vendor"
                ? "/vendor/dashboard"
                : "/customer/dashboard"
              : "/"
          }
          onClick={(e) => {
            if (!user) return; // let it go to "/"
            if (!user.role) {
              e.preventDefault();
            }
          }}
        >
          MultiVendor
        </Link>


        {/* 🔎 Search Bar -> only show if NOT logged in */}
        {!user && (
          <div className="position-relative flex-grow-1 me-4" style={{ maxWidth: "400px" }}>
            <form className="d-flex" onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={query}
                onChange={handleChange}
                onFocus={() => query.length >= 2 && setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 150)}
                autoComplete="off"
              />
              <button className="btn btn-secondary" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>

            {/* Suggestions */}
            {open && suggestions.length > 0 && (
              <ul
                className="list-group position-absolute w-100 mt-1 shadow"
                style={{ zIndex: 1050 }}
              >
                {suggestions.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item list-group-item-action"
                    onMouseDown={() => handleSelect(item.id)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}

            {/* No results */}
            {open && suggestions.length === 0 && (
              <div
                className="position-absolute w-100 mt-1 bg-white border p-2 shadow"
                style={{ zIndex: 1050 }}
              >
                <small className="text-muted">No products found</small>
              </div>
            )}
          </div>
        )}

        {/* Mobile toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        {/* Right side */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex ms-auto align-items-center">
            {/* --- Vendor Header --- */}
            {user?.role === "vendor" && (
              <>
                <span className="me-3">Welcome, enjoy your product sales!</span>
                <button className="btn btn-outline-dark btn-sm" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-1" /> Logout
                </button>
              </>
            )}

            {/* --- Customer Header --- */}
            {user?.role === "customer" && (
              <>
                <span className="me-3">Welcome, {user.email}</span>
                <Link className="btn btn-outline-dark btn-sm me-2" to="/track-order">
                  <FontAwesomeIcon icon={faShippingFast} className="me-1" /> Track Order
                </Link>
                <Link className="btn btn-outline-dark btn-sm me-2" to="/cart">
                  <FontAwesomeIcon icon={faShoppingCart} className="me-1" /> Cart
                </Link>
                <button className="btn btn-outline-dark btn-sm" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-1" /> Logout
                </button>
              </>
            )}

            {/* --- Public Visitors --- */}
            {!user && (
              <>
                <Link className="btn btn-outline-dark btn-sm me-2" to="/login">
                  <FontAwesomeIcon icon={faSignInAlt} className="me-1" /> Login
                </Link>
                <Link className="btn btn-dark btn-sm" to="/register">
                  <FontAwesomeIcon icon={faUserPlus} className="me-1" /> Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
