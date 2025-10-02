// src/dashboards/vendor/Settings.jsx
import React, { useState } from "react";
import { Form, Card, Button, Modal } from "react-bootstrap";

function Settings() {
  // ===============================
  // Notification Preferences State
  // ===============================
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    orderUpdates: true,
    promotions: false,
  });

  // ===============================
  // Store Settings State
  // ===============================
  const [store, setStore] = useState({
    isOpen: true,
    currency: "GHS",
  });

  // ===============================
  // Payment Info State
  // ===============================
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [paystackEmail, setPaystackEmail] = useState("");

  // ===============================
  // Password Change State
  // ===============================
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ===============================
  // Danger Zone Modal State
  // ===============================
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // -------------------------------
  // Handlers for Notifications
  // -------------------------------
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({ ...notifications, [name]: checked });
  };

  // -------------------------------
  // Handlers for Store Settings
  // -------------------------------
  const handleStoreChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStore({ ...store, [name]: type === "checkbox" ? checked : value });
  };

  const handleSaveStore = (e) => {
    e.preventDefault();
    alert("Store settings saved! (Later hook to API)");
  };

  // -------------------------------
  // Handlers for Payment Info
  // -------------------------------
  const handleSavePaymentInfo = (e) => {
    e.preventDefault();

    const paymentData = {
      bankName,
      accountNumber,
      paystackEmail,
    };

    console.log("Saving Payment Info:", paymentData);
    alert("Payment info saved (simulation). Connect to backend later!");
  };

  // -------------------------------
  // Handlers for Password Change
  // -------------------------------
  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    const passwordData = {
      currentPassword,
      newPassword,
    };

    console.log("Password change request:", passwordData);
    alert("Password updated successfully! (simulation)");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // -------------------------------
  // Handlers for Danger Zone
  // -------------------------------
  const handleDeactivate = () => {
    alert("Your account has been deactivated (simulate API call).");
  };

  const handleDelete = () => {
    setShowDeleteModal(false);
    alert("Your account has been permanently deleted! (simulate API call).");
  };

  return (
    <div>
      <h2 className="mb-4">Settings</h2>

      {/* ===============================
          Notification Preferences
      =============================== */}
      <Card className="p-4 shadow-sm mb-4">
        <h5 className="mb-3">Notification Preferences</h5>
        <Form>
          <Form.Check
            type="switch"
            id="emailAlerts"
            label="Email Alerts"
            name="emailAlerts"
            checked={notifications.emailAlerts}
            onChange={handleNotificationChange}
          />
          <Form.Check
            type="switch"
            id="orderUpdates"
            label="Order Updates"
            name="orderUpdates"
            checked={notifications.orderUpdates}
            onChange={handleNotificationChange}
          />
          <Form.Check
            type="switch"
            id="promotions"
            label="Promotions"
            name="promotions"
            checked={notifications.promotions}
            onChange={handleNotificationChange}
          />
        </Form>
      </Card>

      {/* ===============================
          Store Settings
      =============================== */}
      <Card className="p-4 shadow-sm mb-4">
        <h5 className="mb-3">Store Settings</h5>
        <Form onSubmit={handleSaveStore}>
          <Form.Check
            type="switch"
            id="isOpen"
            label={store.isOpen ? "Store Open" : "Store Closed"}
            name="isOpen"
            checked={store.isOpen}
            onChange={handleStoreChange}
          />

          <Form.Group className="mt-3">
            <Form.Label>Default Currency</Form.Label>
            <Form.Select
              name="currency"
              value={store.currency}
              onChange={handleStoreChange}
            >
              <option value="GHS">GHS (Ghana Cedi)</option>
              <option value="USD">USD (US Dollar)</option>
              <option value="NGN">NGN (Naira)</option>
            </Form.Select>
          </Form.Group>

          <Button className="mt-3" type="submit" variant="primary">
            Save Store Settings
          </Button>
        </Form>
      </Card>

      {/* ===============================
          Payment Info
      =============================== */}
      <Card className="p-4 shadow-sm mb-4">
        <h5 className="mb-3">Payment Info</h5>
        <Form onSubmit={handleSavePaymentInfo}>
          {/* Bank Name */}
          <Form.Group className="mb-3">
            <Form.Label>Bank Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your bank name"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            />
          </Form.Group>

          {/* Account Number */}
          <Form.Group className="mb-3">
            <Form.Label>Account Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </Form.Group>

          {/* Paystack Email */}
          <Form.Group className="mb-3">
            <Form.Label>Paystack Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your Paystack email"
              value={paystackEmail}
              onChange={(e) => setPaystackEmail(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="success">
            Save Payment Info
          </Button>
        </Form>
      </Card>

      {/* ===============================
          Change Password
      =============================== */}
      <Card className="p-4 shadow-sm mb-4">
        <h5 className="mb-3">Change Password</h5>
        <Form onSubmit={handlePasswordChange}>
          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="info">
            Update Password
          </Button>
        </Form>
      </Card>

      {/* ===============================
          Danger Zone
      =============================== */}
      <Card className="p-4 shadow-sm border-danger">
        <h5 className="mb-3 text-danger">Danger Zone</h5>
        <p className="text-muted">
          Be careful with these actions. They cannot be undone.
        </p>
        <div className="d-flex gap-3">
          <Button variant="warning" onClick={handleDeactivate}>
            Deactivate Account
          </Button>
          <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
            Delete Account
          </Button>
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to permanently delete your account? <br />
            <strong>This action cannot be undone.</strong>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete My Account
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Settings;
