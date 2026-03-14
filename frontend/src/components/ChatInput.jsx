// ============================================================
// components/ChatInput.jsx — Chat input area fixed at bottom
// ============================================================

import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

export default function ChatInput({
  inputValue,
  setInputValue,
  onSend,
  onKeyDown,
  isLoading,
}) {
  return (
    <div className="sticky bottom-0 z-20 border-t border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask anything..."
          className="h-12 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-brand-400 dark:focus:ring-brand-500/30"
        />
        <button
          type="button"
          onClick={() => onSend()}
          disabled={!inputValue.trim() || isLoading}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Send message"
        >
          {isLoading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <FaPaperPlane className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
