// ============================================================
// components/chat/WelcomeScreen.js — Welcome Screen Component
// ============================================================
// Shows the initial welcome screen with quick prompt suggestions.
// Displayed when there are no messages in the chat yet.
// ============================================================

import React from 'react';

function WelcomeScreen() {
  return (
    <div className="welcome-screen">
      <div className="welcome-hero">
        <div className="hero-icon">🎓</div>
        <h1 className="hero-title">
          Welcome to <span className="gradient-text">StudyMind AI</span>
        </h1>
        <p className="hero-subtitle">
          Your personal AI tutor — ask anything, anytime. Get instant
          explanations, summaries, and more.
        </p>
      </div>
    </div>
  );
}

export default WelcomeScreen;