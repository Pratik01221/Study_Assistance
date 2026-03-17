// ============================================================
// services/authService.js — Authentication API service
// ============================================================

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const STORAGE_TOKEN_KEY = 'ai-study-assistant-token';
const STORAGE_USER_KEY = 'ai-study-assistant-user';

export function getToken() {
  return localStorage.getItem(STORAGE_TOKEN_KEY);
}

export function setToken(token) {
  if (token) {
    localStorage.setItem(STORAGE_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
  }
}

export function getUser() {
  const raw = localStorage.getItem(STORAGE_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setUser(user) {
  if (user) {
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_USER_KEY);
  }
}

export async function signup({ name, email, password }) {
  const resp = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(data.error || 'Signup failed');
  }
  return data;
}

export async function login({ email, password }) {
  const resp = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(data.error || 'Login failed');
  }
  return data;
}
