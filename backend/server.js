// ============================================================
// server.js — Main Application Entry Point
// ============================================================
// Sets up and starts the Express server with all middleware and routes.
// This is the central file that brings everything together.
// ============================================================

const express = require('express');
const config = require('./config');
const corsMiddleware = require('./middleware/cors');
const chatRoutes = require('./routes/chat');

const app = express();

// ============================================================
// MIDDLEWARE SETUP
// ============================================================

// CORS configuration
app.use(corsMiddleware);

// Parse JSON request bodies
app.use(express.json());

// ============================================================
// ROUTES SETUP
// ============================================================

// Chat routes
app.use('/', chatRoutes);

// ============================================================
// ERROR HANDLING MIDDLEWARE
// ============================================================

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// ============================================================
// SERVER STARTUP
// ============================================================

app.listen(config.PORT, () => {
  console.log(`🚀 AI Study Assistant Backend running on http://localhost:${config.PORT}`);
  console.log(`📚 Groq API Key loaded: ${!!config.GROQ_API_KEY}`);
  console.log(`🤖 AI Model: ${config.AI_MODEL}`);
});