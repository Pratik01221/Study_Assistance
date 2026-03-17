// ============================================================
// App.js — Root Application Component
// ============================================================
// The root component that wraps the entire application.
// Provides theme context and renders the main chat interface.
// ============================================================

import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import AuthGate from './components/AuthGate';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthGate>
          <ChatInterface />
        </AuthGate>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
