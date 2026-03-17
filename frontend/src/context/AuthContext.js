// ============================================================
// context/AuthContext.js — Authentication context provider
// ============================================================

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getUser());
  const [token, setToken] = useState(() => authService.getToken());

  useEffect(() => {
    if (token) {
      authService.setToken(token);
    } else {
      authService.setToken(null);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      authService.setUser(user);
    } else {
      authService.setUser(null);
    }
  }, [user]);

  const login = async ({ email, password }) => {
    const data = await authService.login({ email, password });
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const signup = async ({ name, email, password }) => {
    const data = await authService.signup({ name, email, password });
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      signup,
      logout,
      isAuthenticated: Boolean(user && token),
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
