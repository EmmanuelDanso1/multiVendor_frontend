import { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchProducts } from "../api/products"; // 🔎 API for product search
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
  // ✅ Auth state from global context
  const { user, logout } = useContext(AuthContext);

  // ✅ Search state
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);

  // ✅ For debounce + aborting requests
  const debounceRef = useRef(null);
  const controllerRef = useRef(null);

  const navigate = useNavigate();

  // ✅ Handle input change with debounce
  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (!val || val.length < 2) {
      // reset state if input is too short
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
        setOpen(true); // ✅ show results or "no products found"
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Search error:", err);
          setSuggestions([]);
          setOpen(true); // ✅ still open to show "No products found"
        }
      }
    }, 300); // 300ms debounce
  };

  // ✅ Handle clicking a suggestion
  const handleSelect = (id) => {
    setQuery(""); // clear search bar
    setSuggestions([]);
    setOpen(false);
    navigate(`/product/${id}`);
  };

  // ✅ Handle submit (press Enter or search button)
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  // ✅ Handle logout with redirect to homepage
  const handleLogout = () => {
    logout(); // clear auth state + localStorage
    navigate("/"); // go to home
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-warning py-2">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand fw-bold text-secondary me-4" to="/">
          MultiVendor
        </Link>

        {/* 🔎 Search Bar (merged SearchBar here) */}
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

          {/* 🔎 Search suggestions dropdown */}
          {open && suggestions.length > 0 && (
            <ul className="list-group position-absolute w-100 mt-1 shadow" style={{ zIndex: 1050 }}>
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

          {/* 🔎 No results message */}
          {open && suggestions.length === 0 && (
            <div
              className="position-absolute w-100 mt-1 bg-white border p-2 shadow"
              style={{ zIndex: 1050 }}
            >
              <small className="text-muted">No products found</small>
            </div>
          )}
        </div>

        {/* Navbar toggler (mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        {/* Right side links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex ms-auto">
            {/* Cart & Track Order */}
            <Link className="nav-link text-secondary fw-semibold me-3" to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} className="me-1" /> Cart
            </Link>
            <Link className="nav-link text-secondary fw-semibold me-3" to="/track_order">
              <FontAwesomeIcon icon={faShippingFast} className="me-1" /> Track Order
            </Link>

            {/* Role-based dashboard links */}
            {user?.role === "vendor" && (
              <Link className="nav-link text-secondary fw-semibold me-3" to="/vendor/dashboard">
                Vendor Dashboard
              </Link>
            )}
            {user?.role === "customer" && (
              <Link className="nav-link text-secondary fw-semibold me-3" to="/customer/dashboard">
                Customer Dashboard
              </Link>
            )}

            {/* Auth links */}
            {!user ? (
              <>
                <Link className="nav-link text-secondary fw-semibold me-3" to="/register">
                  <FontAwesomeIcon icon={faUserPlus} className="me-1" /> Sign Up
                </Link>
                <Link className="nav-link text-secondary fw-semibold" to="/login">
                  <FontAwesomeIcon icon={faSignInAlt} className="me-1" /> Login
                </Link>
              </>
            ) : (
              <button className="nav-link text-secondary fw-semibold" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="me-1" /> Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
