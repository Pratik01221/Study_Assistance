// ============================================================
// context/ThemeContext.js — Theme Context Provider
// ============================================================
// Manages the application's theme state (dark/light mode).
// Provides theme switching functionality to all components.
// ============================================================

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the theme context
const ThemeContext = createContext();

// Theme provider component
export function ThemeProvider({ children }) {
  // Get initial theme from localStorage or default to light
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  // Toggle between dark and light mode
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Apply theme to document and save to localStorage
  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', theme);
  }, [isDarkMode]);

  // Context value
  const value = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}