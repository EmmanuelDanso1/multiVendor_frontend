// src/dashboards/vendor/AddProduct.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  // Local state for form fields
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  // Handle field changes
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submit (later connect to backend API)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product added:", form);

    // TODO: Send product to backend via API
    // For now, just go back to products list
    navigate("/vendor/products");
  };

  return (
    <div className="card shadow p-4">
      <h3 className="mb-4">Add New Product</h3>

      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter product name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label">Price ($)</label>
          <input
            type="number"
            name="price"
            className="form-control"
            placeholder="Enter price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Stock */}
        <div className="mb-3">
          <label className="form-label">Stock Quantity</label>
          <input
            type="number"
            name="stock"
            className="form-control"
            placeholder="Enter stock quantity"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            placeholder="Enter product description"
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Action buttons */}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            Save Product
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/vendor/products")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
