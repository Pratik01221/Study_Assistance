// ============================================================
// components/chat/ChatMessage.js — Individual Chat Message Component
// ============================================================
// Renders a single message in the chat interface.
// Handles both user and AI messages with appropriate styling.
// ============================================================

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Helper function to format timestamp
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Main ChatMessage component
function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`message-wrapper ${isUser ? 'user' : 'assistant'}`}>
      {/* Avatar */}
      <div className={`avatar ${isUser ? 'user-avatar' : 'ai-avatar'}`}>
        {isUser ? '👤' : '🤖'}
      </div>

      {/* Message Bubble */}
      <div className={`message-bubble ${isUser ? 'user-bubble' : 'ai-bubble'}`}>
        {/* Sender Label and Time */}
        <div className="message-meta">
          <span className="sender-name">
            {isUser ? 'You' : 'StudyMind AI'}
          </span>
          <span className="message-time">{formatTime(message.timestamp)}</span>
        </div>

        {/* Message Content */}
        <div className="message-content">
          {isUser ? (
            // User messages: plain text with line breaks
            <p style={{ whiteSpace: 'pre-wrap' }}>{message.content}</p>
          ) : (
            // AI messages: rendered as Markdown
            <div className="markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;