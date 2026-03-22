// ============================================================
// services/aiService.js — AI Service Layer
// ============================================================
// Handles all AI-related operations including API calls to Groq.
// This service abstracts the AI logic from controllers.
// ============================================================

const config = require('../config');

/**
 * Generates AI response using Groq API
 * @param {string} message - User's message
 * @param {Array} history - Previous conversation history
 * @returns {Promise<string>} AI response
 */
async function generateResponse(message, history = []) {
  try {
    // Build messages array for the API
    const messages = [
      { role: 'system', content: config.SYSTEM_PROMPT },
      ...history.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content,
      })),
      { role: 'user', content: message.trim() },
    ];

    // Make API call to Groq
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: config.AI_MODEL,
        messages: messages,
        max_tokens: config.MAX_TOKENS,
        temperature: config.TEMPERATURE,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Groq API Error:', data);
      throw new Error(data.error?.message || 'Groq API error');
    }

    const aiResponse = data.choices[0].message.content;
    // console.log(`AI Response generated (${aiResponse.length} chars)`);

    return aiResponse;
  } catch (error) {
    console.error('AI Service Error:', error.message);
    throw error;
  }
}

module.exports = {
  generateResponse,
};