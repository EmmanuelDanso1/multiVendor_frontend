// src/dashboards/vendor/MyProducts.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

function MyProducts() {
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Example products (later replace with API data)
  const products = [
    { id: 1, name: "Blue Sneakers", price: 49.99, stock: 23, status: "Active" },
    { id: 2, name: "Red Hoodie", price: 29.99, stock: 10, status: "Low Stock" },
    { id: 3, name: "Black Cap", price: 15.0, stock: 0, status: "Out of Stock" },
  ];

  const handleDeleteClick = (id) => {
    setProductToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    console.log(`Deleting product with ID: ${productToDelete}`);
    // TODO: Call API to delete product here
    setShowModal(false);
    setProductToDelete(null);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Products</h2>
        <Link to="add" className="btn btn-success">
          + Add Product
        </Link>
      </div>

      {/* Products Table */}
      <div className="card shadow p-3">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={product.id}>
                <th scope="row">{idx + 1}</th>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <span
                    className={`badge ${
                      product.status === "Active"
                        ? "bg-success"
                        : product.status === "Low Stock"
                        ? "bg-warning"
                        : "bg-danger"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td>
                  <Link
                    to={`${product.id}/edit`}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteClick(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete this product? This action
                  cannot be undone.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal backdrop */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default MyProducts;
