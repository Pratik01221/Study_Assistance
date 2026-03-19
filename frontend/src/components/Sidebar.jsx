// ============================================================
// components/Sidebar.jsx — Sidebar Navigation (ChatGPT style)
// ============================================================

import React from 'react';
import { FaPlus, FaMoon, FaSun, FaRobot, FaHistory, FaTrash } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

export default function Sidebar({
  chats,
  activeChatId,
  messageCount = 0,
  onNewChat,
  onClearChat,
  onSelectChat,
  onDeleteChat,
}) {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <aside className="hidden md:flex md:w-60 flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow">
            <FaRobot className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">StudyMind</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">AI Study Assistant</p>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
        </button>
      </div>

      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={onNewChat}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <FaPlus className="h-4 w-4" />
          New chat
        </button>

        <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Messages: {messageCount}</span>
          {onClearChat && (
            <button
              type="button"
              onClick={onClearChat}
              className="px-2 py-1 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <h2 className="px-4 pt-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Chat history
        </h2>
        <div className="mt-2 space-y-1 px-2 pb-4">
          {chats.length === 0 ? (
            <div className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              No chats yet — start one by clicking “New chat”.
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                className={`relative flex w-full items-center rounded-xl px-1 py-1 transition ${
                  chat.id === activeChatId
                    ? 'bg-brand-500/15 text-brand-600 dark:bg-brand-500/20 dark:text-brand-200'
                    : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelectChat(chat.id)}
                  className="flex w-full items-start gap-3 rounded-xl px-3 py-2 text-left text-sm"
                >
                  <span className="mt-1 text-slate-400 dark:text-slate-500">
                    <FaHistory className="h-4 w-4" />
                  </span>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate font-medium">
                      {chat.title || 'New chat'}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {chat.lastMessage || 'Start the conversation...'}
                    </p>
                  </div>
                  {onDeleteChat && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const confirmDelete = window.confirm('Delete this chat?');
                      if (confirmDelete) onDeleteChat(chat.id);
                    }}
                    className="ml-2 rounded p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                    aria-label="Delete chat"
                  >
                    <FaTrash className="h-4 w-4" />
                  </button>
                )}
                </button>

                {/* {onDeleteChat && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const confirmDelete = window.confirm('Delete this chat?');
                      if (confirmDelete) onDeleteChat(chat.id);
                    }}
                    className="ml-2 rounded p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                    aria-label="Delete chat"
                  >
                    <FaTrash className="h-4 w-4" />
                  </button>
                )} */}
              </div>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}
