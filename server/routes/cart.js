import express from 'express';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// All cart routes require authentication
router.use(requireAuth);

// Helper to get cart with product details
function getCartForUser(userId) {
  const items = db.prepare(`
    SELECT ci.quantity, p.*
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = ?
  `).all(userId);

  return items.map(item => ({
    quantity: item.quantity,
    product: {
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.original_price,
      description: item.description,
      category: item.category,
      subcategory: item.subcategory,
      images: JSON.parse(item.images || '[]'),
      rating: item.rating,
      reviewCount: item.review_count,
      inStock: Boolean(item.in_stock),
      authenticity: Boolean(item.authenticity),
      tags: JSON.parse(item.tags || '[]'),
    }
  }));
}

// GET /api/cart
router.get('/', (req, res) => {
  try {
    const items = getCartForUser(req.user.id);
    res.json({ items });
  } catch (err) {
    console.error('Get cart error:', err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// POST /api/cart
router.post('/', (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) {
      return res.status(400).json({ error: 'productId is required' });
    }

    const product = db.prepare('SELECT id FROM products WHERE id = ?').get(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Upsert: add or increment quantity
    const existing = db.prepare(
      'SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?'
    ).get(req.user.id, productId);

    if (existing) {
      db.prepare('UPDATE cart_items SET quantity = quantity + ? WHERE id = ?')
        .run(quantity, existing.id);
    } else {
      db.prepare('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)')
        .run(req.user.id, productId, quantity);
    }

    const items = getCartForUser(req.user.id);
    res.json({ items });
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// PUT /api/cart/:productId
router.get('/:productId', (req, res) => {
  try {
    const { quantity } = req.body;
    if (quantity == null || quantity < 0) {
      return res.status(400).json({ error: 'Valid quantity is required' });
    }

    if (quantity === 0) {
      db.prepare('DELETE FROM cart_items WHERE user_id = ? AND product_id = ?')
        .run(req.user.id, req.params.productId);
    } else {
      db.prepare('UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?')
        .run(quantity, req.user.id, req.params.productId);
    }

    const items = getCartForUser(req.user.id);
    res.json({ items });
  } catch (err) {
    console.error('Update cart error:', err);
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

// DELETE /api/cart/:productId
router.delete('/:productId', (req, res) => {
  try {
    db.prepare('DELETE FROM cart_items WHERE user_id = ? AND product_id = ?')
      .run(req.user.id, req.params.productId);
    const items = getCartForUser(req.user.id);
    res.json({ items });
  } catch (err) {
    console.error('Remove from cart error:', err);
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
});

// POST /api/cart/sync — merge guest cart on login
router.post('/sync', (req, res) => {
  try {
    const { items } = req.body; // Array of { productId, quantity }
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'items array is required' });
    }

    const upsert = db.prepare(`
      INSERT INTO cart_items (user_id, product_id, quantity)
      VALUES (?, ?, ?)
      ON CONFLICT(user_id, product_id) DO UPDATE SET
        quantity = MAX(cart_items.quantity, excluded.quantity)
    `);

    const syncMany = db.transaction((items) => {
      for (const item of items) {
        if (item.productId && item.quantity > 0) {
          upsert.run(req.user.id, item.productId, item.quantity);
        }
      }
    });

    syncMany(items);
    const cartItems = getCartForUser(req.user.id);
    res.json({ items: cartItems });
  } catch (err) {
    console.error('Sync cart error:', err);
    res.status(500).json({ error: 'Failed to sync cart' });
  }
});

export default router;
