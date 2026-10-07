import React, { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("moneymate_user")) || null;
    } catch {
      return null;
    }
  });

  const login = (data) => {
    if (data?.token) localStorage.setItem("moneymate_token", data.token);
    if (data?.user) {
      localStorage.setItem("moneymate_user", JSON.stringify(data.user));
      setUser(data.user);
    }
  };

  const logout = () => {
    localStorage.removeItem("moneymate_token");
    localStorage.removeItem("moneymate_user");
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(localStorage.getItem("moneymate_token")),
    login,
    logout
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}