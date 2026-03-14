// ============================================================
// components/ui/Sidebar.js — Sidebar Navigation Component
// ============================================================
// Contains navigation items and app information.
// Can be toggled on mobile devices.
// ============================================================

import React from 'react';
import { FaSearch, FaImage, FaAppStore, FaHeartbeat } from 'react-icons/fa';

function Sidebar({ isOpen, onClose, messageCount, onClearChat }) {
  return (
    <>
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🧠</span>
            <span className="logo-text">StudyMind</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <p className="nav-section-label">Menu</p>
          <button className="nav-item">
            <FaSearch />
            <span>Search Chats</span>
          </button>
          <button className="nav-item">
            <FaImage />
            <span>Images</span>
          </button>
          <button className="nav-item">
            <FaAppStore />
            <span>Apps</span>
          </button>
          <button className="nav-item">
            <FaHeartbeat />
            <span>Health</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="stats-card">
            <p className="stats-label">Session Messages</p>
            <p className="stats-value">{messageCount}</p>
          </div>
          <button className="clear-btn" onClick={onClearChat}>
            🗑️ Clear Chat
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}
    </>
  );
}

export default Sidebar;