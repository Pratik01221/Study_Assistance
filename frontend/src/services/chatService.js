// ============================================================
// services/chatService.js — Chat API Service
// ============================================================
// Handles all API communication with the backend.
// Provides a clean interface for chat operations.
// ============================================================

// Base URL for our backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Sends a message to the AI and returns the response
 * @param {string} message - The user's message
 * @param {Array} history - Previous conversation history
 * @returns {Promise<Object>} Response containing the AI's answer
 */
export async function sendMessage(message, history = []) {
  try {
    const response = await fetch(`${API_BASE_URL}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        history: history,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong. Please try again.');
    }

    return data;
  } catch (error) {
    throw error;
  }
}