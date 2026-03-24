export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  authenticity: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export const categories = [
  { id: "womens-wear", name: "Women's Wear", icon: "👗", count: 45 },
  { id: "mens-wear", name: "Men's Wear", icon: "👔", count: 38 },
  { id: "shoes", name: "Shoes", icon: "👟", count: 52 },
  { id: "slippers", name: "Slippers", icon: "🩴", count: 20 },
  { id: "watches", name: "Watches", icon: "⌚", count: 30 },
  { id: "accessories", name: "Accessories", icon: "👜", count: 65 },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Silk Blend Evening Dress",
    price: 4999,
    originalPrice: 7999,
    description: "Luxurious silk blend evening dress with elegant draping. Perfect for special occasions. Every stitch verified for quality assurance.",
    category: "womens-wear",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
    ],
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    authenticity: true,
    tags: ["Premium", "Trending"],
  },
  {
    id: "2",
    name: "Tailored Slim Fit Blazer",
    price: 5499,
    originalPrice: 8999,
    description: "Premium tailored slim fit blazer crafted from Italian wool blend. Precision-cut for the modern gentleman.",
    category: "mens-wear",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800",
    ],
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    authenticity: true,
    tags: ["Bestseller"],
  },
  {
    id: "3",
    name: "Handcrafted Leather Sneakers",
    price: 3999,
    originalPrice: 5999,
    description: "Premium handcrafted leather sneakers with cushioned sole. Each pair individually inspected for quality.",
    category: "shoes",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800",
    ],
    rating: 4.9,
    reviewCount: 203,
    inStock: true,
    authenticity: true,
    tags: ["Top Rated"],
  },
  {
    id: "4",
    name: "Comfort Plus Home Slippers",
    price: 999,
    originalPrice: 1499,
    description: "Ultra-soft memory foam slippers with anti-slip sole. Designed for maximum home comfort.",
    category: "slippers",
    images: [
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800",
    ],
    rating: 4.5,
    reviewCount: 67,
    inStock: true,
    authenticity: true,
    tags: ["Comfort"],
  },
  {
    id: "5",
    name: "Classic Chronograph Watch",
    price: 12999,
    originalPrice: 18999,
    description: "Swiss-inspired chronograph with sapphire crystal glass and genuine leather strap. Comes with authenticity certificate.",
    category: "watches",
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800",
    ],
    rating: 4.9,
    reviewCount: 156,
    inStock: true,
    authenticity: true,
    tags: ["Luxury", "Certified"],
  },
  {
    id: "6",
    name: "Designer Leather Tote Bag",
    price: 3499,
    originalPrice: 4999,
    description: "Premium full-grain leather tote with suede interior. Spacious yet elegant design for daily use.",
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
    ],
    rating: 4.6,
    reviewCount: 92,
    inStock: true,
    authenticity: true,
    tags: ["New Arrival"],
  },
  {
    id: "7",
    name: "Floral Print Maxi Dress",
    price: 2999,
    description: "Beautiful floral print maxi dress in breathable cotton. Perfect for summer outings.",
    category: "womens-wear",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
    ],
    rating: 4.4,
    reviewCount: 58,
    inStock: true,
    authenticity: true,
    tags: ["Summer"],
  },
  {
    id: "8",
    name: "Premium Aviator Sunglasses",
    price: 2499,
    originalPrice: 3999,
    description: "Polarized aviator sunglasses with titanium frame. UV400 protection certified.",
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800",
    ],
    rating: 4.7,
    reviewCount: 134,
    inStock: true,
    authenticity: true,
    tags: ["UV Protected"],
  },
];

export const reviews: Review[] = [
  { id: "r1", productId: "1", userName: "Priya M.", rating: 5, comment: "Exactly as shown in the pictures! The quality is outstanding. Will buy again.", date: "2024-12-15", verified: true },
  { id: "r2", productId: "1", userName: "Anita S.", rating: 5, comment: "Perfect fit and gorgeous color. The authenticity badge gave me confidence.", date: "2024-12-10", verified: true },
  { id: "r3", productId: "3", userName: "Rahul K.", rating: 5, comment: "Best sneakers I've owned. The leather quality is exactly as described.", date: "2024-11-28", verified: true },
  { id: "r4", productId: "5", userName: "Vikram J.", rating: 5, comment: "Came with authenticity certificate. Watch looks even better in person!", date: "2024-12-20", verified: true },
];
