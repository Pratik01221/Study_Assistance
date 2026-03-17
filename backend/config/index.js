// ============================================================
// config/index.js — Configuration Management
// ============================================================
// Central place for all configuration constants and environment variables.
// This makes it easy to manage settings and ensures consistency.
// ============================================================

require('dotenv').config();

module.exports = {
  // Server configuration
  PORT: process.env.PORT || 5000,

  // CORS configuration
  CORS_ORIGINS: [
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ],

  // API Keys (loaded from environment)
  GROQ_API_KEY: process.env.GROQ_API_KEY,

  // MongoDB
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-study-assistant',

  // JWT configuration
  JWT_SECRET: process.env.JWT_SECRET || 'change-me-in-production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

  // AI Model configuration
  AI_MODEL: 'llama-3.3-70b-versatile',
  MAX_TOKENS: 2048,
  TEMPERATURE: 0.7,

  // System prompt for the AI assistant
  SYSTEM_PROMPT: `You are an expert AI Study Assistant. Help students with:
1. Study Questions — clear explanations
2. MCQ Generation — proper format with answers
3. Code Explanation — simple terms
4. Note Summarization — key points
Always be friendly, use emojis, format with markdown.`,
};