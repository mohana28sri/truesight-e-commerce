import db from './db.js';
import { products, reviews } from '../src/data/products.ts';

console.log('Starting seed process...');

const insertProduct = db.prepare(`
  INSERT OR IGNORE INTO products 
  (id, name, price, original_price, description, category, subcategory, images, rating, review_count, in_stock, authenticity, tags)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const insertReview = db.prepare(`
  INSERT OR IGNORE INTO reviews
  (id, product_id, user_id, user_name, rating, comment, date, verified)
  VALUES (?, ?, NULL, ?, ?, ?, ?, ?)
`);

db.transaction(() => {
  // Seed products
  let productsCount = 0;
  for (const product of products) {
    insertProduct.run(
      product.id,
      product.name,
      product.price,
      product.originalPrice || null,
      product.description,
      product.category,
      product.subcategory,
      JSON.stringify(product.images),
      product.rating,
      product.reviewCount,
      product.inStock ? 1 : 0,
      product.authenticity ? 1 : 0,
      JSON.stringify(product.tags)
    );
    productsCount++;
  }
  console.log(`Seeded ${productsCount} products.`);

  // Seed reviews
  let reviewsCount = 0;
  for (const review of reviews) {
    // Note: We use the existing review ID slightly modified for integer primary key if it's "r1"
    const parsedId = parseInt(review.id.replace('r', ''));
    
    insertReview.run(
      parsedId,
      review.productId,
      review.userName,
      review.rating,
      review.comment,
      review.date,
      review.verified ? 1 : 0
    );
    reviewsCount++;
  }
  console.log(`Seeded ${reviewsCount} reviews.`);
})();

console.log('Seed process completed successfully.');
process.exit(0);
