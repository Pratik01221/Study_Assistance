// ============================================================
// components/ChatWindow.jsx — Main chat window with message list
// ============================================================

import React from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

export default function ChatWindow({
  messages,
  isLoading,
  error,
  onRetry,
  inputValue,
  setInputValue,
  onSend,
  onKeyDown,
  messagesEndRef,
}) {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-28">
        {messages.length === 0 ? (
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-white/60 p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Say hi to StudyMind AI
            </h2>
            <p className="max-w-md text-sm text-slate-600 dark:text-slate-300">
              Ask anything — explanations, summaries, quiz questions, or code help.
              Your AI tutor is ready.
            </p>
          </div>
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col gap-3">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="px-4">
                <div className="flex items-center gap-3 rounded-xl border border-dashed border-slate-200 bg-white/60 p-4 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-brand-500" />
                  StudyMind is thinking...
                </div>
              </div>
            )}
            {error && (
              <div className="px-4">
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">Something went wrong</p>
                      <p className="text-xs">{error}</p>
                    </div>
                    <button
                      type="button"
                      onClick={onRetry}
                      className="rounded-md bg-white px-3 py-2 text-xs font-semibold text-brand-600 shadow-sm transition hover:bg-brand-50 dark:bg-slate-900 dark:text-brand-300 dark:hover:bg-slate-800"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-2" />
          </div>
        )}
      </div>

      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSend={onSend}
        onKeyDown={onKeyDown}
        isLoading={isLoading}
      />
    </div>
  );
}
