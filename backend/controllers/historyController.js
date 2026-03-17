// ============================================================
// controllers/historyController.js — User history endpoints
// ============================================================

const History = require('../models/History');

async function getHistory(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const history = await History.find({ userId }).sort({ createdAt: -1 }).lean();

    res.json({ success: true, history });
  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({ error: 'Server error while fetching history.' });
  }
}

module.exports = {
  getHistory,
};
