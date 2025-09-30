import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check localStorage on page load
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      setUser({ token }); // You can expand this later (e.g. fetch user profile)
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("access", token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("access");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
