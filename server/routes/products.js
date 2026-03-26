const express = require('express');
const db = require('../db');

const router = express.Router();

// Helper to parse JSON fields from DB
function parseProduct(row) {
  return {
    ...row,
    images: JSON.parse(row.images || '[]'),
    tags: JSON.parse(row.tags || '[]'),
    originalPrice: row.original_price,
    reviewCount: row.review_count,
    inStock: Boolean(row.in_stock),
    authenticity: Boolean(row.authenticity),
  };
}

// GET /api/products
router.get('/', (req, res) => {
  try {
    const { search, category, subcategory, sort, page = 1, limit = 50, tag } = req.query;
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    if (subcategory) {
      query += ' AND subcategory = ?';
      params.push(subcategory);
    }

    if (tag) {
      query += ' AND tags LIKE ?';
      params.push(`%"${tag}"%`);
    }

    // Sorting
    switch (sort) {
      case 'price_asc':
        query += ' ORDER BY price ASC';
        break;
      case 'price_desc':
        query += ' ORDER BY price DESC';
        break;
      case 'rating':
        query += ' ORDER BY rating DESC';
        break;
      case 'newest':
        query += ' ORDER BY rowid DESC';
        break;
      default:
        query += ' ORDER BY review_count DESC';
    }

    // Get total count before pagination
    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as total');
    const { total } = db.prepare(countQuery).get(...params);

    // Pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    const products = db.prepare(query).all(...params).map(parseProduct);

    res.json({
      products,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (err) {
    console.error('Products list error:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/featured
router.get('/featured', (req, res) => {
  try {
    const trending = db.prepare(
      "SELECT * FROM products WHERE tags LIKE '%\"Trending\"%' OR tags LIKE '%\"Bestseller\"%' ORDER BY review_count DESC LIMIT 8"
    ).all().map(parseProduct);

    const topRated = db.prepare(
      'SELECT * FROM products ORDER BY rating DESC LIMIT 8'
    ).all().map(parseProduct);

    const newArrivals = db.prepare(
      'SELECT * FROM products ORDER BY rowid DESC LIMIT 8'
    ).all().map(parseProduct);

    res.json({ trending, topRated, newArrivals });
  } catch (err) {
    console.error('Featured products error:', err);
    res.status(500).json({ error: 'Failed to fetch featured products' });
  }
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  try {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const reviews = db.prepare(
      'SELECT * FROM reviews WHERE product_id = ? ORDER BY date DESC'
    ).all(req.params.id);

    // Get related products (same subcategory, exclude self)
    const related = db.prepare(
      'SELECT * FROM products WHERE subcategory = ? AND id != ? LIMIT 4'
    ).all(product.subcategory, product.id).map(parseProduct);

    res.json({
      product: parseProduct(product),
      reviews,
      related
    });
  } catch (err) {
    console.error('Product detail error:', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

module.exports = router;
