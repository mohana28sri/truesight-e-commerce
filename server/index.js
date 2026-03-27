const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
// 1. Ensure the app uses process.env.PORT instead of a hardcoded port with fallback to 3000
const PORT = process.env.PORT || 3000;

// Middleware
// 4. Enable CORS properly for frontend communication
app.use(cors({ origin: '*' }));
app.use(express.json());

// 5. Add a test route (used /api since / is reserved for the Vite frontend)
app.get('/api', (req, res) => {
  res.json({ message: 'Backend is running' });
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/reviews', require('./routes/reviews'));

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// 2 & 9. Add proper global error handling and prevent crashes
app.use((err, req, res, next) => {
  console.error("🔥 Global Error Handler caught an exception:", err);
  
  res.status(500).json({ 
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

// 7. Ensure app listens on 0.0.0.0 for Render
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
