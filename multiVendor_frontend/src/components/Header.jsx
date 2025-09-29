// src/components/Header.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchProducts } from "../api/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faShippingFast,
  faUserPlus,
  faSignInAlt,
  faSearch,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef(null);
  const controllerRef = useRef(null);
  const navigate = useNavigate();

  // Clear controllers on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    // close suggestions if empty
    if (!val || val.length < 2) {
      setSuggestions([]);
      setOpen(false);
      if (controllerRef.current) controllerRef.current.abort();
      if (debounceRef.current) clearTimeout(debounceRef.current);
      return;
    }

    // debounce requests
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      // cancel previous request
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
          setOpen(false);
        }
      }
    }, 300); // 300ms debounce
  };

  const handleSuggestionClick = (item) => {
    // expecting item has id field; adjust if your API returns different key
    setQuery(item.name ?? item.title ?? item.label ?? "");
    setSuggestions([]);
    setOpen(false);

    if (item.id) {
      navigate(`/product/${item.id}`);
    } else {
      // fallback: go to generic search results page
      navigate(`/search?query=${encodeURIComponent(item.name ?? query)}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    // go to a search results page (implement /search route to show many results)
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-warning py-2">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand fw-bold text-secondary me-4" to="/">
          MultiVendor
        </Link>

        {/* Search */}
        <div className="position-relative flex-grow-1 me-4">
          <form className="d-flex" onSubmit={handleSubmit} role="search" aria-label="Site search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={handleChange}
              aria-label="Search products"
              autoComplete="off"
            />
            <button className="btn btn-secondary" type="submit" aria-label="Search">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>

          {/* Suggestions dropdown */}
          {open && suggestions && suggestions.length > 0 && (
            <ul className="list-group position-absolute w-100 mt-1 shadow" style={{ zIndex: 1050 }}>
              {suggestions.map((item, i) => (
                <li
                  key={item.id ?? `${item.name ?? item}-${i}`}
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  role="button"
                  onClick={() => handleSuggestionClick(item)}
                >
                  <div>
                    <div className="fw-semibold">{item.name ?? item.title ?? item}</div>
                    {item.vendor_name && <small className="text-muted">{item.vendor_name}</small>}
                  </div>
                  {item.price && <div className="text-muted">${item.price}</div>}
                </li>
              ))}
            </ul>
          )}

          {/* No results hint */}
          {open && suggestions && suggestions.length === 0 && (
            <div className="position-absolute w-100 mt-1 bg-white border p-2 shadow" style={{ zIndex: 1050 }}>
              <small className="text-muted">No products found</small>
            </div>
          )}
        </div>

        {/* Right links */}
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

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex ms-auto">
            <Link className="nav-link text-secondary fw-semibold me-3" to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} className="me-1" /> Cart
            </Link>
            <Link className="nav-link text-secondary fw-semibold me-3" to="/track_order">
              <FontAwesomeIcon icon={faShippingFast} className="me-1" /> Track Order
            </Link>
            <Link className="nav-link text-secondary fw-semibold me-3" to="/register">
              <FontAwesomeIcon icon={faUserPlus} className="me-1" /> Sign Up
            </Link>
            <Link className="nav-link text-secondary fw-semibold" to="/login">
              <FontAwesomeIcon icon={faSignInAlt} className="me-1" /> Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
