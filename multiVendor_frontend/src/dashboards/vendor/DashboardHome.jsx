// src/dashboards/vendor/DashboardHome.jsx
import React from "react";

function DashboardHome() {
  return (
    <div>
      <h2 className="mb-4">Vendor Dashboard</h2>
      <p>Welcome back! Here's an overview of your store activity.</p>

      {/* Dashboard Stats Cards */}
      <div className="row mt-4">
        <div className="col-md-3 mb-3">
          <div className="card shadow p-3 text-center">
            <h5>Total Products</h5>
            <p className="display-6 fw-bold">12</p>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow p-3 text-center">
            <h5>Orders Received</h5>
            <p className="display-6 fw-bold">34</p>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow p-3 text-center">
            <h5>Pending Shipments</h5>
            <p className="display-6 fw-bold">5</p>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow p-3 text-center">
            <h5>Total Revenue</h5>
            <p className="display-6 fw-bold">$4,560</p>
          </div>
        </div>
      </div>

      {/* Placeholder Recent Activity */}
      <div className="card shadow mt-4 p-3">
        <h5>Recent Activity</h5>
        <ul>
          <li>Order #1234 placed by John Doe</li>
          <li>Product "Blue Sneakers" updated</li>
          <li>Order #1231 shipped</li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardHome;
