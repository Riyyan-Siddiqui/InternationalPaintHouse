import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsLogin(true);
      setIsAdmin(userData.isAdmin || false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    setIsLogin(false);
    setIsAdmin(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, isAdmin, setIsAdmin, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

