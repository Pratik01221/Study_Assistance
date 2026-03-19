// ============================================================
// routes/chats.js — Chat persistence and retrieval routes
// ============================================================

const express = require('express');
const chatController = require('../controllers/chatController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// GET /api/chats/:userId - get all chats for user
router.get('/chats/:userId', authenticate, chatController.getChatsByUser);

// DELETE /api/chats/:userId - delete all chats for user
router.delete('/chats/:userId', authenticate, chatController.deleteChatsByUser);

// DELETE /api/chat/:chatId - delete a specific chat
router.delete('/chat/:chatId', authenticate, chatController.deleteChat);

// POST /api/chat - save a message for specific chat
router.post('/chat', authenticate, chatController.saveChatMessage);

module.exports = router;
