import React, { createContext, useContext, useState } from "react";

// Create a context for managing authentication data
const AuthContext = createContext();

// Create a provider component to manage user authentication
export function AuthProvider({ children }) {
  // Initialize the user data state, initially set to null
  const [userData, setUserData] = useState(null);

  // Function to set user data upon successful login
  const login = (data) => {
    setUserData(data);
  };

  // Function to clear user data upon logout
  const logout = () => {
    setUserData(null);
  };

  // Function to store the Reset OTP request data
  const resetOTPRequest = (data) => {
    setUserData(data);
  };

  // Provide the authentication context to child components
  return (
    <AuthContext.Provider value={{ userData, login, logout, resetOTPRequest }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to easily access the authentication context
export function useAuth() {
  return useContext(AuthContext);
}
