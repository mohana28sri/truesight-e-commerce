import express from 'express';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.use(requireAuth);

// POST /api/orders — create order
router.post('/', (req, res) => {
  try {
    const { shippingName, shippingEmail, shippingPhone, shippingAddress, shippingCity, shippingPincode } = req.body;

    if (!shippingName || !shippingEmail || !shippingPhone || !shippingAddress || !shippingCity || !shippingPincode) {
      return res.status(400).json({ error: 'All shipping fields are required' });
    }

    // Get cart items
    const cartItems = db.prepare(`
      SELECT ci.quantity, p.*
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
    `).all(req.user.id);

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 999 ? 0 : 99;
    const total = subtotal + shipping;
    const paymentId = 'PAY_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8).toUpperCase();

    const createOrder = db.transaction(() => {
      // Create order
      const orderResult = db.prepare(`
        INSERT INTO orders (user_id, total, shipping, status, shipping_name, shipping_email, shipping_phone, shipping_address, shipping_city, shipping_pincode, payment_id)
        VALUES (?, ?, ?, 'confirmed', ?, ?, ?, ?, ?, ?, ?)
      `).run(req.user.id, total, shipping, shippingName, shippingEmail, shippingPhone, shippingAddress, shippingCity, shippingPincode, paymentId);

      const orderId = orderResult.lastInsertRowid;

      // Create order items
      const insertItem = db.prepare(`
        INSERT INTO order_items (order_id, product_id, product_name, product_image, price, quantity)
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      for (const item of cartItems) {
        const images = JSON.parse(item.images || '[]');
        insertItem.run(orderId, item.id, item.name, images[0] || '', item.price, item.quantity);
      }

      // Clear cart
      db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(req.user.id);

      return orderId;
    });

    const orderId = createOrder();

    res.status(201).json({
      orderId,
      paymentId,
      total,
      shipping,
      status: 'confirmed',
      message: 'Order placed successfully!'
    });
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// GET /api/orders — list user's orders
router.get('/', (req, res) => {
  try {
    const orders = db.prepare(`
      SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC
    `).all(req.user.id);

    const ordersWithItems = orders.map(order => {
      const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);
      return {
        ...order,
        items
      };
    });

    res.json({ orders: ordersWithItems });
  } catch (err) {
    console.error('List orders error:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET /api/orders/:id — single order
router.get('/:id', (req, res) => {
  try {
    const order = db.prepare('SELECT * FROM orders WHERE id = ? AND user_id = ?')
      .get(req.params.id, req.user.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);

    res.json({
      ...order,
      items
    });
  } catch (err) {
    console.error('Get order error:', err);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

export default router;
