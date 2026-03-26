const express = require('express');
const db = require('../db');
const { requireAuth, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/reviews/:productId
router.get('/:productId', (req, res) => {
  try {
    const reviews = db.prepare(
      'SELECT * FROM reviews WHERE product_id = ? ORDER BY date DESC'
    ).all(req.params.productId);

    res.json({ reviews });
  } catch (err) {
    console.error('Get reviews error:', err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST /api/reviews/:productId
router.post('/:productId', requireAuth, (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { productId } = req.params;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const product = db.prepare('SELECT id FROM products WHERE id = ?').get(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const date = new Date().toISOString().split('T')[0];

    db.prepare(`
      INSERT INTO reviews (product_id, user_id, user_name, rating, comment, date, verified)
      VALUES (?, ?, ?, ?, ?, ?, 1)
    `).run(productId, req.user.id, req.user.name, rating, comment || '', date);

    // Update product rating and review count
    const stats = db.prepare(
      'SELECT AVG(rating) as avgRating, COUNT(*) as count FROM reviews WHERE product_id = ?'
    ).get(productId);

    db.prepare('UPDATE products SET rating = ?, review_count = ? WHERE id = ?')
      .run(Math.round(stats.avgRating * 10) / 10, stats.count, productId);

    const reviews = db.prepare(
      'SELECT * FROM reviews WHERE product_id = ? ORDER BY date DESC'
    ).all(productId);

    res.status(201).json({ reviews });
  } catch (err) {
    console.error('Add review error:', err);
    res.status(500).json({ error: 'Failed to add review' });
  }
});

module.exports = router;
