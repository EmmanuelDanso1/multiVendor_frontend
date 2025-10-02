// src/dashboards/vendor/Profile.jsx
import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

function Profile() {
  const [profile, setProfile] = useState({
    name: "Vendor One",
    email: "vendor@example.com",
    phone: "+233 55 123 4567",
    businessName: "Vendor Shop",
    description: "We sell quality fashion items.",
    logo: null,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, logo: URL.createObjectURL(file) });
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated! (Later hook to API)");
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    alert("Password updated! (Later hook to API)");
  };

  return (
    <div>
      <h2 className="mb-4">My Profile</h2>

      {/* Profile Info */}
      <Card className="p-4 shadow-sm mb-4">
        <Form onSubmit={handleProfileSubmit}>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={profile.email}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Business Name</Form.Label>
                <Form.Control
                  type="text"
                  name="businessName"
                  value={profile.businessName}
                  onChange={handleProfileChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Business Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={profile.description}
                  onChange={handleProfileChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Col>

            <Col md={4} className="text-center">
              <div className="mb-3">
                {profile.logo ? (
                  <img
                    src={profile.logo}
                    alt="Business Logo"
                    className="img-thumbnail rounded-circle"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="bg-light d-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: "150px", height: "150px" }}
                  >
                    No Logo
                  </div>
                )}
              </div>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Logo</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleLogoUpload} />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* Change Password */}
      <Card className="p-4 shadow-sm mb-4">
        <h5 className="mb-3">Change Password</h5>
        <Form onSubmit={handlePasswordSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              required
            />
          </Form.Group>

          <Button variant="danger" type="submit">
            Update Password
          </Button>
        </Form>
      </Card>

      {/* Public Preview */}
      <Card className="p-4 shadow-sm bg-light">
        <h5 className="mb-3">Profile Preview (What customers see)</h5>
        <div className="d-flex align-items-center gap-3">
          <div>
            {profile.logo ? (
              <img
                src={profile.logo}
                alt="Business Logo"
                className="rounded-circle"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            ) : (
              <div
                className="bg-secondary text-white d-flex align-items-center justify-content-center rounded-circle"
                style={{ width: "100px", height: "100px" }}
              >
                Logo
              </div>
            )}
          </div>
          <div>
            <h4>{profile.businessName}</h4>
            <p className="mb-1">{profile.description}</p>
            <p className="mb-1">
              <strong>Contact:</strong> {profile.phone}
            </p>
            <p className="mb-0">
              <strong>Email:</strong> {profile.email}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Profile;
