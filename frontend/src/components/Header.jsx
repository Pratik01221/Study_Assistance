// ============================================================
// components/Header.jsx — Top bar for chat window
// ============================================================

import React from 'react';
import { FaBars } from 'react-icons/fa';

export default function Header({ onMenuClick }) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <button
        type="button"
        onClick={onMenuClick}
        className="md:hidden rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        aria-label="Open sidebar"
      >
        <FaBars className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow">
          <span className="text-base font-semibold">S</span>
        </div>
        <div>
          <h1 className="text-sm font-semibold text-slate-900 dark:text-slate-100">StudyMind</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">AI Study Assistant</p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
        <span>Tip: Shift+Enter for new line</span>
      </div>
    </header>
  );
}
