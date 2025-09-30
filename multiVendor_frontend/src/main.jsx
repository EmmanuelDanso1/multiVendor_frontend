// React imports
import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Global styles
import "./index.css";

// Bootstrap and FontAwesome (CSS + JS)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

// App + Auth Context
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";

// Mount the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Provide authentication state globally */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
