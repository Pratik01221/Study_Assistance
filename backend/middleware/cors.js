// ============================================================
// middleware/cors.js — CORS Middleware
// ============================================================
// Configures Cross-Origin Resource Sharing for the API.
// Allows the frontend to communicate with the backend.
// ============================================================

const cors = require('cors');
const config = require('../config');

const corsOptions = {
  origin: config.CORS_ORIGINS,
  methods: ['GET', 'POST'],
  credentials: true,
};

module.exports = cors(corsOptions);