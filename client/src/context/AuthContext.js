import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setIsLoggedIn(true);
        setUser(decodedUser.user);
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const loginUser = (userToken) => {
    try {
      const decodedUser = jwtDecode(userToken);
      setIsLoggedIn(true);
      setUser(decodedUser.user);
      localStorage.setItem('token', userToken);
    } catch (error) {
      console.error("Invalid token during login:", error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;  // Default export
export const useAuth = () => useContext(AuthContext);