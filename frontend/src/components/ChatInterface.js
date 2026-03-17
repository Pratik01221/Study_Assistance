// ============================================================
// components/ChatInterface.js — Main Chat Interface Component
// ============================================================
// The main chat component that orchestrates all chat functionality.
// Uses the custom hook for state management and renders all sub-components.
// ============================================================

import React, { useState, useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import ChatWindow from './ChatWindow';

function ChatInterface() {
  // Chat state and actions from custom hook
  const {
    chats,
    activeChatId,
    messages,
    inputValue,
    setInputValue,
    isLoading,
    error,
    setError,
    messagesEndRef,
    inputRef,
    sendChatMessage,
    startNewChat,
    selectChat,
    handleKeyDown,
  } = useChat();

  const { user, logout } = useAuth();

  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex h-screen">
        <Sidebar
          chats={chats}
          activeChatId={activeChatId}
          onNewChat={startNewChat}
          onSelectChat={(chatId) => {
            selectChat(chatId);
            setSidebarOpen(false);
          }}
        />

        <div className="flex flex-1 flex-col">
          <Header onMenuClick={() => setSidebarOpen(true)} user={user} onLogout={logout} />
          <ChatWindow
            messages={messages}
            isLoading={isLoading}
            error={error}
            onRetry={() => sendChatMessage()}
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSend={sendChatMessage}
            onKeyDown={handleKeyDown}
            messagesEndRef={messagesEndRef}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {sidebarOpen && (
          <div className="fixed inset-y-0 left-0 z-50 w-80 md:hidden">
            <Sidebar
              chats={chats}
              activeChatId={activeChatId}
              onNewChat={startNewChat}
              onSelectChat={(chatId) => {
                selectChat(chatId);
                setSidebarOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatInterface;
