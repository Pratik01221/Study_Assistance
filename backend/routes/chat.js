// ============================================================
// routes/chat.js — Chat Routes
// ============================================================
// Defines all routes related to chat functionality.
// Routes map HTTP endpoints to controller functions.
// ============================================================

const express = require('express');
const chatController = require('../controllers/chatController');

const router = express.Router();

// POST /ask - Main chat endpoint
router.post('/ask', chatController.askQuestion);

// GET / - Health check
router.get('/', chatController.healthCheck);

module.exports = router;