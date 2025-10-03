//  React imports
import { createContext, useState, useEffect } from "react";

//  Create Auth Context
export const AuthContext = createContext();

//  Provider component wraps your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  /**
   *  On app load, check localStorage for existing auth info.
   * This makes sure users stay logged in after refresh.
   */
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  /**
   *  Login: save user data to localStorage + state
   * userData can include:
   *  - token (JWT or session)
   *  - email
   *  - role ("vendor" or "customer")
   *  - any other profile info you return from backend
   */
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  /**
   *  Logout: clear storage + state
   */
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  /**
   *  Provide state + actions globally
   */
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
