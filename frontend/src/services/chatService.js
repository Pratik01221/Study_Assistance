// ============================================================
// services/chatService.js — Chat API Service
// ============================================================
// Handles all API communication with the backend.
// Provides a clean interface for chat operations.
// ============================================================

// Base URL for our backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Token helper
const getToken = () => localStorage.getItem('ai-study-assistant-token');

/**
 * Sends a message to the AI and returns the response
 * @param {string} message - The user's message
 * @param {Array} history - Previous conversation history
 * @param {string} chatId - Optional chat id
 * @returns {Promise<Object>} Response containing the AI's answer
 */
export async function sendMessage(message, history = [], chatId = null) {
  try {
    const token = getToken();
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/api/ai/ask`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        message,
        history,
        chatId,
      }),
    });

    const data = await response.json();

    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem('ai-study-assistant-token');
      localStorage.removeItem('ai-study-assistant-user');
      throw new Error('Unauthorized. Please log in again.');
    }

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong. Please try again.');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchChats(userId) {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/api/chats/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Could not fetch chat history.');
  }

  return data.chats;
}

export async function saveChatMessage(chatId, role, content) {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ chatId, role, content }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Could not save chat message.');
  }

  return data.chat;
}

export async function deleteChat(chatId) {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/api/chat/${chatId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Could not delete chat.');
  }

  return data;
}

export async function deleteAllChats(userId) {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/api/chats/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Could not delete chat history.');
  }

  return data;
}
