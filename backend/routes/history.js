// ============================================================
// routes/history.js — History routes
// ============================================================

const express = require('express');
const { authenticate } = require('../middleware/auth');
const historyController = require('../controllers/historyController');

const router = express.Router();

// GET /api/history
router.get('/', authenticate, historyController.getHistory);

module.exports = router;
