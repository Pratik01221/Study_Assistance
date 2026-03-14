// ============================================================
// components/MessageBubble.jsx — Single chat message bubble (ChatGPT style)
// ============================================================

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} px-4`}
    >
      <div
        className={`max-w-[80%] space-y-2 rounded-xl border px-4 py-3 shadow-sm transition ${
          isUser
            ? 'bg-brand-600 text-white border-brand-600'
            : 'bg-slate-100 text-slate-900 border-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          {!isUser && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-slate-300 text-slate-700 dark:bg-slate-700 dark:text-slate-200 flex items-center justify-center">
                🤖
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                StudyMind AI
              </span>
            </div>
          )}
          <span className="text-xs text-slate-400">{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        <div className="prose prose-sm max-w-none text-slate-900 dark:text-slate-100">
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}
