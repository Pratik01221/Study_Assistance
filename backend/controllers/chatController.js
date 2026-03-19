// ============================================================
// controllers/chatController.js — Chat Controller
// ============================================================
// Handles HTTP requests related to chat functionality.
// Controllers are responsible for processing requests and responses.
// ============================================================

const mongoose = require('mongoose');
const aiService = require('../services/aiService');
const Chat = require('../models/Chat');
const { isNotEmpty, sanitizeMessage, isValidHistory } = require('../utils/validation');

async function askQuestion(req, res) {
  try {
    const user = req.user;
    if (!user || !user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { message, history = [], chatId } = req.body;

    if (!isNotEmpty(message)) {
      return res.status(400).json({ error: 'Message cannot be empty!' });
    }

    if (history.length > 0 && !isValidHistory(history)) {
      return res.status(400).json({ error: 'Invalid history format!' });
    }

    const sanitizedMessage = sanitizeMessage(message);
    const aiResponse = await aiService.generateResponse(sanitizedMessage, history);

    // Persist the conversation in Chat collection
    let chat = null;
    if (chatId && mongoose.Types.ObjectId.isValid(chatId)) {
      chat = await Chat.findOne({ _id: chatId, userId: user.id });
    }

    if (!chat) {
      chat = await Chat.create({
        userId: user.id,
        title: sanitizedMessage.slice(0, 80) || 'New chat',
        messages: [],
      });
    }

    chat.messages.push({ role: 'user', content: sanitizedMessage, timestamp: new Date() });
    chat.messages.push({ role: 'assistant', content: aiResponse, timestamp: new Date() });
    chat.title = chat.title === 'New chat' ? (sanitizedMessage.slice(0, 80) || 'New chat') : chat.title;
    await chat.save();

    res.json({ success: true, response: aiResponse, chatId: chat._id });
  } catch (error) {
    console.error('Chat Controller Error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
}

async function getChatsByUser(req, res) {
  try {
    const { userId } = req.params;
    const user = req.user;

    if (!user || !user.id || user.id !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 }).lean();

    res.json({ success: true, chats });
  } catch (error) {
    console.error('Get Chats Error:', error);
    res.status(500).json({ error: 'Server error while fetching chats.' });
  }
}

async function saveChatMessage(req, res) {
  try {
    const user = req.user;
    if (!user || !user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { chatId, role, content } = req.body;
    if (!chatId || !role || !content) {
      return res.status(400).json({ error: 'chatId, role, and content are required.' });
    }

    const chat = await Chat.findOne({ _id: chatId, userId: user.id });
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found.' });
    }

    chat.messages.push({ role, content, timestamp: new Date() });
    await chat.save();

    res.json({ success: true, chat });
  } catch (error) {
    console.error('Save Chat Error:', error);
    res.status(500).json({ error: 'Server error while saving chat message.' });
  }
}

async function deleteChat(req, res) {
  try {
    const user = req.user;
    const { chatId } = req.params;

    if (!user || !user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!chatId || !mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({ error: 'Invalid chat ID.' });
    }

    const deleted = await Chat.findOneAndDelete({ _id: chatId, userId: user.id });

    if (!deleted) {
      return res.status(404).json({ error: 'Chat not found.' });
    }

    res.json({ success: true, chatId });
  } catch (error) {
    console.error('Delete Chat Error:', error);
    res.status(500).json({ error: 'Server error while deleting chat.' });
  }
}

async function deleteChatsByUser(req, res) {
  try {
    const user = req.user;
    const { userId } = req.params;

    if (!user || !user.id || user.id !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await Chat.deleteMany({ userId: user.id });

    res.json({ success: true });
  } catch (error) {
    console.error('Delete Chats By User Error:', error);
    res.status(500).json({ error: 'Server error while deleting chats.' });
  }
}

function healthCheck(req, res) {
  res.json({ status: 'AI Study Assistant Backend is running!', timestamp: new Date().toISOString() });
}

module.exports = {
  askQuestion,
  getChatsByUser,
  saveChatMessage,
  deleteChat,
  deleteChatsByUser,
  healthCheck,
};