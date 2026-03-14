// ============================================================
// components/ui/ThemeToggle.js — Theme Toggle Button
// ============================================================
// Allows users to switch between light and dark themes.
// Uses the theme context to manage state.
// ============================================================

import React from 'react';
import { useTheme } from '../../context/ThemeContext';

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeToggle;