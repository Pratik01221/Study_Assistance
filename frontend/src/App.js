// ============================================================
// App.js — Root Application Component
// ============================================================
// The root component that wraps the entire application.
// Provides theme context and renders the main chat interface.
// ============================================================

import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <ThemeProvider>
      <ChatInterface />
    </ThemeProvider>
  );
}

export default App;
