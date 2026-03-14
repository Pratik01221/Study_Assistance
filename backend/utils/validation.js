// ============================================================
// utils/validation.js — Validation Utilities
// ============================================================
// Helper functions for input validation and sanitization.
// Keeps validation logic separate and reusable.
// ============================================================

/**
 * Validates if a string is not empty after trimming
 * @param {string} str - String to validate
 * @returns {boolean} True if valid, false otherwise
 */
function isNotEmpty(str) {
  return str && typeof str === 'string' && str.trim().length > 0;
}

/**
 * Sanitizes a message by trimming whitespace
 * @param {string} message - Message to sanitize
 * @returns {string} Sanitized message
 */
function sanitizeMessage(message) {
  return message.trim();
}

/**
 * Validates chat history format
 * @param {Array} history - Chat history array
 * @returns {boolean} True if valid format
 */
function isValidHistory(history) {
  if (!Array.isArray(history)) return false;

  return history.every(msg =>
    msg &&
    typeof msg === 'object' &&
    typeof msg.role === 'string' &&
    typeof msg.content === 'string' &&
    (msg.role === 'user' || msg.role === 'assistant')
  );
}

module.exports = {
  isNotEmpty,
  sanitizeMessage,
  isValidHistory,
};