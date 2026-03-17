// ============================================================
// components/ChatInterface.js — Main Chat Interface Component
// ============================================================

import React, { useState } from 'react';
import { useChat } from '../hooks/useChat';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import ChatWindow from './ChatWindow';

export default function ChatInterface() {
  const { user, logout } = useAuth();

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
    sendChatMessage,
    startNewChat,
    clearChatHistory,
    selectChat,
    handleKeyDown,
  } = useChat();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex h-screen">
        <Sidebar
          chats={chats}
          activeChatId={activeChatId}
          messageCount={messages.length}
          onNewChat={startNewChat}
          onClearChat={clearChatHistory}
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
              messageCount={messages.length}
              onNewChat={startNewChat}
              onClearChat={clearChatHistory}
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
