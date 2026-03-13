// ============================================================
// api.js — API Service Layer
// ============================================================
// This file handles ALL communication with our backend server.
// Keeping API calls in a separate file is a best practice —
// it makes code cleaner and easier to maintain.
//
// Think of this as the "messenger" between frontend and backend.
// ============================================================

// Base URL for our backend
// In development: React's proxy (set in package.json) forwards
// requests to http://localhost:5000 automatically
const API_BASE_URL = "http://localhost:5000";

// ============================================================
// sendMessage — Sends a question to the AI and returns response
// ============================================================
// Parameters:
//   message  (string)  — The user's question
//   history  (array)   — Previous conversation messages
//
// Returns:
//   { response: "AI's answer..." }  on success
//   Throws an error on failure
// ============================================================

export async function sendMessage(message, history = []) {
  try {
    // fetch() is a built-in browser function to make HTTP requests
    const response = await fetch(`${API_BASE_URL}/ask`, {
      method: "POST", // We're SENDING data, so we use POST
      headers: {
        "Content-Type": "application/json", // Tell server we're sending JSON
      },
      // Convert our JavaScript object to a JSON string
      body: JSON.stringify({
        message: message,
        history: history,
      }),
    });

    // Parse the JSON response from the server
    const data = await response.json();

    // If the HTTP status isn't 2xx (success), throw an error
    if (!response.ok) {
      throw new Error(data.error || "Something went wrong. Please try again.");
    }

    return data;
  } catch (error) {
    // Re-throw the error so the component can handle it
    // (e.g., show an error message to the user)
    throw error;
  }
}
