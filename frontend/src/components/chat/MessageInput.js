// ============================================================
// components/chat/MessageInput.js — Message Input Component
// ============================================================
// Handles user input for sending messages.
// Includes quick prompt chips and send button.
// ============================================================

import React from 'react';

function MessageInput({
  inputValue,
  setInputValue,
  onSend,
  onKeyDown,
  isLoading,
  inputRef,
  error,
  showErrorAbove
}) {
  return (
    <div className="input-area">
      {/* Error message above input when requested */}
      {error && showErrorAbove && (
        <div className="error-banner">
          <span>⚠️</span>
          <span>{error}</span>
          <button onClick={() => {}}>✕</button>
        </div>
      )}

      <div className="input-container">
        {/* Text input row */}
        <div className="input-row">
          <textarea
            ref={inputRef}
            className="message-input"
            placeholder="Ask anything — study questions, code explanations, summaries..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            disabled={isLoading}
          />
          <button
            className={`send-btn ${isLoading ? 'loading' : ''}`}
            onClick={() => onSend()}
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send message"
          >
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              <span>↑</span>
            )}
          </button>
        </div>

        
      </div>
    </div>
  );
}

export default MessageInput;