// ============================================================
// controllers/chatController.js — Chat Controller
// ============================================================
// Handles HTTP requests related to chat functionality.
// Controllers are responsible for processing requests and responses.
// ============================================================

const aiService = require('../services/aiService');
const { isNotEmpty, sanitizeMessage, isValidHistory } = require('../utils/validation');

/**
 * Handles the /ask endpoint for AI chat
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function askQuestion(req, res) {
  try {
    const { message, history = [] } = req.body;

    // Validate input
    if (!isNotEmpty(message)) {
      return res.status(400).json({
        error: 'Message cannot be empty!'
      });
    }

    // Validate history format if provided
    if (history.length > 0 && !isValidHistory(history)) {
      return res.status(400).json({
        error: 'Invalid history format!'
      });
    }

    // Sanitize message
    const sanitizedMessage = sanitizeMessage(message);

    // Generate AI response
    const aiResponse = await aiService.generateResponse(sanitizedMessage, history);

    // Send successful response
    res.json({
      success: true,
      response: aiResponse
    });

  } catch (error) {
    console.error('Chat Controller Error:', error.message);

    // Send error response
    res.status(500).json({
      error: 'Server error: ' + error.message
    });
  }
}

/**
 * Health check endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function healthCheck(req, res) {
  res.json({
    status: 'AI Study Assistant Backend is running!',
    timestamp: new Date().toISOString()
  });
}

module.exports = {
  askQuestion,
  healthCheck,
};