const express = require('express');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth);

function parseProduct(row) {
  return {
    id: row.id,
    name: row.name,
    price: row.price,
    originalPrice: row.original_price,
    description: row.description,
    category: row.category,
    subcategory: row.subcategory,
    images: JSON.parse(row.images || '[]'),
    rating: row.rating,
    reviewCount: row.review_count,
    inStock: Boolean(row.in_stock),
    authenticity: Boolean(row.authenticity),
    tags: JSON.parse(row.tags || '[]'),
  };
}

// GET /api/wishlist
router.get('/', (req, res) => {
  try {
    const items = db.prepare(`
      SELECT p.* FROM wishlist w
      JOIN products p ON w.product_id = p.id
      WHERE w.user_id = ?
    `).all(req.user.id).map(parseProduct);

    res.json({ items });
  } catch (err) {
    console.error('Get wishlist error:', err);
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
});

// POST /api/wishlist/:productId — toggle
router.post('/:productId', (req, res) => {
  try {
    const { productId } = req.params;

    const existing = db.prepare(
      'SELECT id FROM wishlist WHERE user_id = ? AND product_id = ?'
    ).get(req.user.id, productId);

    if (existing) {
      db.prepare('DELETE FROM wishlist WHERE id = ?').run(existing.id);
      res.json({ added: false, productId });
    } else {
      db.prepare('INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)')
        .run(req.user.id, productId);
      res.json({ added: true, productId });
    }
  } catch (err) {
    console.error('Toggle wishlist error:', err);
    res.status(500).json({ error: 'Failed to toggle wishlist' });
  }
});

// GET /api/wishlist/ids — just product IDs for quick check
router.get('/ids', (req, res) => {
  try {
    const ids = db.prepare('SELECT product_id FROM wishlist WHERE user_id = ?')
      .all(req.user.id)
      .map(row => row.product_id);
    res.json({ ids });
  } catch (err) {
    console.error('Get wishlist ids error:', err);
    res.status(500).json({ error: 'Failed to fetch wishlist ids' });
  }
});

module.exports = router;
