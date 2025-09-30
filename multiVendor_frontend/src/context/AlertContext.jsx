// global alert system will keep your app clean and consistent. 
// Instead of repeating alert code in every page (Login, Register, Logout),
// we’ll create a context provider that manages alerts and displays them at the top of the app.

import { createContext, useState, useContext } from "react";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });

    // Auto-clear after 3s
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {/* Render global alert */}
      {alert && (
        <div
          className={`alert alert-${alert.type} text-center mb-0`}
          role="alert"
        >
          {alert.message}
        </div>
      )}
      {children}
    </AlertContext.Provider>
  );
};
