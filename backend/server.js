// ============================================================
// server.js — Main Application Entry Point
// ============================================================
// Sets up and starts the Express server with all middleware and routes.
// This is the central file that brings everything together.
// ============================================================

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const corsMiddleware = require('./middleware/cors');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const chatsRoutes = require('./routes/chats');
const historyRoutes = require('./routes/history');

const app = express();

// ============================================================
// DATABASE SETUP
// ============================================================

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

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

// Auth routes
app.use('/api/auth', authRoutes);

// Chat / AI routes (protected)
app.use('/api/ai', chatRoutes);

// Chat persistence routes (protected)
app.use('/api', chatsRoutes);

// History routes (protected)
app.use('/api/history', historyRoutes);

// Legacy chat route for backwards compatibility
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