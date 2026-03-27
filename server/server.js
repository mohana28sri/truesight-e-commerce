import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'node:url';
import cors from 'cors';

// Import routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import wishlistRoutes from './routes/wishlist.js';
import orderRoutes from './routes/orders.js';
import reviewRoutes from './routes/reviews.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Serve static files from root 'dist' folder
const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));

// Debug check for Render logs
console.log("Dist Path:", distPath);
console.log("Index exists:", fs.existsSync(path.join(distPath, "index.html")));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);

// Example API route
app.get("/api/test", (req, res) => {
  res.json({ message: "API working" });
});

// SPA fallback (Express 5 correct syntax)
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Global Error Handler:", err);
  res.status(500).json({ 
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
