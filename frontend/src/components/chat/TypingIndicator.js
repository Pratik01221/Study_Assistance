// ============================================================
// components/chat/TypingIndicator.js — Typing Animation Component
// ============================================================
// Shows a typing animation while the AI is generating a response.
// Provides visual feedback during loading states.
// ============================================================

import React from 'react';

function TypingIndicator() {
  return (
    <div className="message-wrapper assistant">
      <div className="avatar ai-avatar">🤖</div>
      <div className="message-bubble ai-bubble typing-bubble">
        <div className="message-meta">
          <span className="sender-name">StudyMind AI</span>
          <span className="message-time">thinking...</span>
        </div>
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;