// ============================================================
// StudyAssistant.js — Main Chat Interface Component
// ============================================================
// This is the biggest component. It manages:
//  - Chat message history (state)
//  - Sending messages to the API
//  - Rendering the sidebar, messages, and input
//
// KEY REACT CONCEPTS USED HERE:
//  - useState: Store data that changes over time
//  - useEffect: Run code when something changes
//  - useRef: Get a direct reference to a DOM element
//  - Event handlers: Functions triggered by user actions
// ============================================================

import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { sendMessage } from "../api";
import "./StudyAssistant.css";

// ============================================================
// QUICK PROMPT BUTTONS — Starter prompts for students
// ============================================================
const QUICK_PROMPTS = [
  {
    icon: "❓",
    label: "Study Question",
    text: "Explain the difference between RAM and ROM in simple terms",
    color: "blue",
  },
  {
    icon: "📝",
    label: "Generate MCQs",
    text: "Generate 5 MCQs about the water cycle for a class 8 student",
    color: "purple",
  },
  {
    icon: "💻",
    label: "Explain Code",
    text: 'Explain this Python code:\n\ndef factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)',
    color: "green",
  },
  {
    icon: "📄",
    label: "Summarize Notes",
    text: "Summarize the following notes about photosynthesis: Photosynthesis is the process by which green plants use sunlight, water, and carbon dioxide to produce food (glucose) and oxygen. It occurs in chloroplasts which contain chlorophyll. The light-dependent reactions happen in the thylakoids, and the light-independent reactions (Calvin cycle) happen in the stroma.",
    color: "orange",
  },
];

// ============================================================
// HELPER: Format timestamp
// ============================================================
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ============================================================
// COMPONENT: Single Chat Message
// ============================================================
function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`message-wrapper ${isUser ? "user" : "assistant"}`}>
      {/* Avatar */}
      <div className={`avatar ${isUser ? "user-avatar" : "ai-avatar"}`}>
        {isUser ? "👤" : "🤖"}
      </div>

      {/* Message Bubble */}
      <div className={`message-bubble ${isUser ? "user-bubble" : "ai-bubble"}`}>
        {/* Sender Label */}
        <div className="message-meta">
          <span className="sender-name">{isUser ? "You" : "StudyMind AI"}</span>
          <span className="message-time">{formatTime(message.timestamp)}</span>
        </div>

        {/* Message Content */}
        <div className="message-content">
          {isUser ? (
            // User messages: render as plain text (preserving line breaks)
            <p style={{ whiteSpace: "pre-wrap" }}>{message.content}</p>
          ) : (
            // AI messages: render as Markdown (bold, lists, code blocks, etc.)
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

// ============================================================
// COMPONENT: Typing Indicator (shown while AI is thinking)
// ============================================================
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

// ============================================================
// COMPONENT: Empty State (shown when no messages yet)
// ============================================================
function WelcomeScreen({ onQuickPrompt }) {
  return (
    <div className="welcome-screen">
      <div className="welcome-hero">
        <div className="hero-icon">🎓</div>
        <h1 className="hero-title">
          Welcome to <span className="gradient-text">StudyMind AI</span>
        </h1>
        <p className="hero-subtitle">
          Your personal AI tutor — ask anything, anytime. Get instant
          explanations, MCQs, code walkthroughs, and summaries.
        </p>
      </div>

      <div className="quick-prompts-grid">
        <p className="prompts-label">✨ Try these to get started:</p>
        <div className="prompts-container">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt.label}
              className={`quick-prompt-card color-${prompt.color}`}
              onClick={() => onQuickPrompt(prompt.text)}
            >
              <span className="prompt-icon">{prompt.icon}</span>
              <span className="prompt-label">{prompt.label}</span>
              <span className="prompt-preview">{prompt.text.substring(0, 50)}...</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT: StudyAssistant
// ============================================================
function StudyAssistant() {
  // --- STATE ---
  // useState returns [currentValue, functionToUpdateIt]
  // React re-renders the UI whenever state changes

  // Array of all chat messages
  const [messages, setMessages] = useState([]);

  // The text currently typed in the input box
  const [inputValue, setInputValue] = useState("");

  // Whether we're waiting for the AI to respond
  const [isLoading, setIsLoading] = useState(false);

  // Error message to show (if any)
  const [error, setError] = useState(null);

  // Whether to show the sidebar on mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // --- REFS ---
  // useRef gives us direct access to DOM elements without re-rendering
  const messagesEndRef = useRef(null); // Bottom of messages list
  const inputRef = useRef(null); // The textarea

  // --- EFFECTS ---
  // useEffect runs code AFTER the component renders
  // This one scrolls to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus the input on first load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // ============================================================
  // HANDLER: Send a message
  // ============================================================
  const handleSend = async (textOverride = null) => {
    const text = (textOverride || inputValue).trim();
    if (!text || isLoading) return;

    // Clear input and error
    setInputValue("");
    setError(null);

    // Add user's message to the chat
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Show loading state
    setIsLoading(true);

    try {
      // Build history in the format our API expects
      // We send existing messages so AI remembers context
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Call our backend API
      const data = await sendMessage(text, history);

      // Add AI response to chat
      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      // Always runs — hide loading indicator
      setIsLoading(false);
      // Re-focus the input so user can type next question
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  // ============================================================
  // HANDLER: Keyboard shortcuts in textarea
  // ============================================================
  const handleKeyDown = (e) => {
    // Press Enter to send (Shift+Enter for new line)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Don't add a newline
      handleSend();
    }
  };

  // ============================================================
  // HANDLER: Clear conversation
  // ============================================================
  const handleClear = () => {
    setMessages([]);
    setError(null);
    inputRef.current?.focus();
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="app-container">

      {/* ===== SIDEBAR ===== */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🧠</span>
            <span className="logo-text">StudyMind</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <p className="nav-section-label">Features</p>
          {[
            { icon: "💬", label: "Chat Tutor" },
            { icon: "📝", label: "MCQ Generator" },
            { icon: "💻", label: "Code Explainer" },
            { icon: "📄", label: "Note Summarizer" },
          ].map((item) => (
            <button key={item.label} className="nav-item active">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="stats-card">
            <p className="stats-label">Session Messages</p>
            <p className="stats-value">{messages.length}</p>
          </div>
          <button className="clear-btn" onClick={handleClear}>
            🗑️ Clear Chat
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ===== MAIN CONTENT ===== */}
      <main className="main-content">

        {/* Top Bar */}
        <header className="topbar">
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <div className="topbar-title">
            <span className="gradient-text">StudyMind AI</span>
            <span className="topbar-subtitle">Your Personal Tutor</span>
          </div>
          <div className="topbar-status">
            <span className="status-dot"></span>
            <span>Online</span>
          </div>
        </header>

        {/* Messages Area */}
        <div className="messages-area">
          {messages.length === 0 ? (
            // Show welcome screen when no messages
            <WelcomeScreen onQuickPrompt={(text) => handleSend(text)} />
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
              {/* Invisible div at the bottom — we scroll to this */}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* ===== INPUT AREA ===== */}
        <div className="input-area">
          {/* Error shown above input when there are no messages */}
          {error && messages.length === 0 && (
            <div className="error-banner">
              <span>⚠️</span>
              <span>{error}</span>
              <button onClick={() => setError(null)}>✕</button>
            </div>
          )}

          <div className="input-container">
            {/* Quick action chips */}
            <div className="input-chips">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p.label}
                  className="chip"
                  onClick={() => handleSend(p.text)}
                  disabled={isLoading}
                >
                  {p.icon} {p.label}
                </button>
              ))}
            </div>

            {/* Text input row */}
            <div className="input-row">
              <textarea
                ref={inputRef}
                className="message-input"
                placeholder="Ask anything — study questions, MCQs, code explanations, note summaries..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={isLoading}
              />
              <button
                className={`send-btn ${isLoading ? "loading" : ""}`}
                onClick={() => handleSend()}
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

            <p className="input-hint">
              Press <kbd>Enter</kbd> to send · <kbd>Shift+Enter</kbd> for new line
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudyAssistant;
