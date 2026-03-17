// ============================================================
// routes/chats.js — Chat persistence and retrieval routes
// ============================================================

const express = require('express');
const chatController = require('../controllers/chatController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// GET /api/chats/:userId - get all chats for user
router.get('/chats/:userId', authenticate, chatController.getChatsByUser);

// POST /api/chat - save a message for specific chat
router.post('/chat', authenticate, chatController.saveChatMessage);

module.exports = router;
