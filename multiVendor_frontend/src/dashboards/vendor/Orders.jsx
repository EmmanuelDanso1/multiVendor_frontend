// src/dashboards/vendor/VendorOrders.jsx
import React, { useState } from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";

function VendorOrders() {
  // Orders state (replace with API later)
  const [orders, setOrders] = useState([
    {
      id: "ORD-1001",
      customer: "John Doe",
      products: "Blue Sneakers, Black Cap",
      total: 64.99,
      status: "Pending",
      address: "123 Main St, Accra",
      date: "2025-09-29",
      items: [
        { name: "Blue Sneakers", qty: 1, price: 49.99 },
        { name: "Black Cap", qty: 1, price: 15.0 },
      ],
    },
    {
      id: "ORD-1002",
      customer: "Jane Smith",
      products: "Red Hoodie",
      total: 29.99,
      status: "Shipped",
      address: "456 Market Rd, Kumasi",
      date: "2025-09-20",
      items: [{ name: "Red Hoodie", qty: 1, price: 29.99 }],
    },
    {
      id: "ORD-1003",
      customer: "Alex Johnson",
      products: "Blue Sneakers",
      total: 49.99,
      status: "Delivered",
      address: "789 Circle Ave, Takoradi",
      date: "2025-09-18",
      items: [{ name: "Blue Sneakers", qty: 1, price: 49.99 }],
    },
  ]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // Update status inline
  const updateStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // Date filter helper
  const applyDateFilter = (orders) => {
    const today = new Date();
    return orders.filter((order) => {
      const orderDate = new Date(order.date);

      if (dateFilter === "Today") {
        return orderDate.toDateString() === today.toDateString();
      }

      if (dateFilter === "This Week") {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return orderDate >= weekStart && orderDate <= weekEnd;
      }

      if (dateFilter === "This Month") {
        return (
          orderDate.getMonth() === today.getMonth() &&
          orderDate.getFullYear() === today.getFullYear()
        );
      }

      return true; // "All"
    });
  };

  // Combined filtering (search + status + date)
  const filteredOrders = applyDateFilter(orders).filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div>
      <h2 className="mb-4">Orders</h2>

      {/* Search, Status Filter, Date Filter */}
      <div className="d-flex justify-content-between mb-3 gap-2">
        {/* Search bar */}
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by Customer or Order ID..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        {/* Status dropdown */}
        <select
          className="form-select w-25"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>

        {/* Date filter dropdown */}
        <Dropdown>
          <Dropdown.Toggle variant="secondary">
            Filter By Date
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setDateFilter("All")}>
              All
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setDateFilter("Today")}>
              Today
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setDateFilter("This Week")}>
              This Week
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setDateFilter("This Month")}>
              This Month
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      </div>

      {/* Orders Table */}
      <div className="card shadow p-3">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Products</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.products}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.status === "Pending"
                          ? "bg-warning"
                          : order.status === "Shipped"
                          ? "bg-info"
                          : order.status === "Delivered"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>{order.date}</td>
                  <td className="d-flex gap-2">
                    {/* Inline status update */}
                    <select
                      className="form-select form-select-sm"
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                    >
                      <option>Pending</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>

                    {/* View modal button */}
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowModal(true);
                      }}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            ◀ Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next ▶
          </button>
        </div>
      </div>

      {/* Order Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Order {selectedOrder?.id} - {selectedOrder?.customer}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>
              <p>
                <strong>Date:</strong> {selectedOrder.date}
              </p>
              <p>
                <strong>Shipping Address:</strong> {selectedOrder.address}
              </p>

              <h6>Items:</h6>
              <ul className="list-group">
                {selectedOrder.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="list-group-item d-flex justify-content-between"
                  >
                    {item.name} (x{item.qty})
                    <span>${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3">
                <strong>Total:</strong> ${selectedOrder.total.toFixed(2)}
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="success">Mark as Shipped</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VendorOrders;
