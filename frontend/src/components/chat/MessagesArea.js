// ============================================================
// components/chat/MessagesArea.js — Messages Display Area
// ============================================================
// Renders the chat messages list or welcome screen.
// Handles scrolling and error display.
// ============================================================

import React from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import WelcomeScreen from './WelcomeScreen';

function MessagesArea({
  messages,
  isLoading,
  error,
  setError,
  onQuickPrompt,
  messagesEndRef
}) {
  return (
    <div className="messages-area">
      {messages.length === 0 ? (
        // Show welcome screen when no messages
        <WelcomeScreen onQuickPrompt={onQuickPrompt} />
      ) : (
        // Show messages
        <div className="messages-list">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && <TypingIndicator />}
          {/* Error message */}
          {error && (
            <div className="error-banner">
              <span>⚠️</span>
              <span>{error}</span>
              <button onClick={() => setError(null)}>✕</button>
            </div>
          )}
          {/* Invisible div at the bottom for scrolling */}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}

export default MessagesArea;