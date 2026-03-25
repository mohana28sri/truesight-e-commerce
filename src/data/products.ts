export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  subcategory: string;
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

export interface CategoryGroup {
  label: string;
  subcategories: { id: string; name: string; icon: string }[];
}

export const categoryGroups: CategoryGroup[] = [
  {
    label: "Women",
    subcategories: [
      { id: "kurti", name: "Kurti", icon: "👗" },
      { id: "jeans-women", name: "Jeans", icon: "👖" },
      { id: "western-wear", name: "Western Wear", icon: "💃" },
    ],
  },
  {
    label: "Men",
    subcategories: [
      { id: "shirts", name: "Shirts", icon: "👔" },
      { id: "pants", name: "Pants", icon: "👖" },
    ],
  },
  {
    label: "Common",
    subcategories: [
      { id: "watches", name: "Watches", icon: "⌚" },
      { id: "accessories", name: "Accessories", icon: "👜" },
    ],
  },
];

export const allSubcategories = categoryGroups.flatMap((g) => g.subcategories);

export const products: Product[] = [
  // ===== KURTI (Women) =====
  { id: "k1", name: "Embroidered Anarkali Kurti", price: 1299, originalPrice: 1999, description: "Beautiful Anarkali kurti with intricate thread embroidery. Soft cotton fabric, perfect for festive and casual wear. Verified product — what you see is what you get.", category: "women", subcategory: "kurti", images: ["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800", "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800"], rating: 4.6, reviewCount: 142, inStock: true, authenticity: true, tags: ["Bestseller", "Festive"] },
  { id: "k2", name: "Straight Fit Cotton Kurti", price: 799, originalPrice: 1199, description: "Comfortable straight-fit kurti in breathable cotton. Great for office and daily wear.", category: "women", subcategory: "kurti", images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800"], rating: 4.4, reviewCount: 98, inStock: true, authenticity: true, tags: ["Office Wear"] },
  { id: "k3", name: "Floral Print A-Line Kurti", price: 899, description: "Vibrant floral A-line kurti with mandarin collar. Lightweight rayon fabric.", category: "women", subcategory: "kurti", images: ["https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800"], rating: 4.3, reviewCount: 76, inStock: true, authenticity: true, tags: ["Summer"] },
  { id: "k4", name: "Block Print Palazzo Kurti Set", price: 1599, originalPrice: 2499, description: "Hand block-printed kurti with matching palazzo pants. Traditional Rajasthani craftsmanship.", category: "women", subcategory: "kurti", images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800"], rating: 4.8, reviewCount: 210, inStock: true, authenticity: true, tags: ["Premium", "Handcrafted"] },
  { id: "k5", name: "Mirror Work Silk Kurti", price: 1899, originalPrice: 2799, description: "Gorgeous silk kurti with mirror work detailing. Perfect for weddings and celebrations.", category: "women", subcategory: "kurti", images: ["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800"], rating: 4.7, reviewCount: 165, inStock: true, authenticity: true, tags: ["Wedding", "Luxury"] },
  { id: "k6", name: "Chikankari White Kurti", price: 999, description: "Elegant Lucknowi Chikankari work on white cotton. Timeless ethnic piece.", category: "women", subcategory: "kurti", images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800"], rating: 4.5, reviewCount: 124, inStock: true, authenticity: true, tags: ["Classic"] },
  { id: "k7", name: "Bandhani Print Kurti", price: 749, description: "Traditional Bandhani tie-dye kurti in vibrant colors. Lightweight and breezy.", category: "women", subcategory: "kurti", images: ["https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800"], rating: 4.2, reviewCount: 67, inStock: true, authenticity: true, tags: ["Traditional"] },
  { id: "k8", name: "Kalamkari Hand-Painted Kurti", price: 1399, originalPrice: 1999, description: "Authentic Kalamkari hand-painted design. Each piece is unique and artisan-crafted.", category: "women", subcategory: "kurti", images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800"], rating: 4.9, reviewCount: 89, inStock: true, authenticity: true, tags: ["Artisan", "Top Rated"] },

  // ===== JEANS (Women) =====
  { id: "jw1", name: "High-Rise Skinny Jeans", price: 1499, originalPrice: 2299, description: "Classic high-rise skinny jeans with stretch denim. Flattering fit for all body types.", category: "women", subcategory: "jeans-women", images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800", "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=800"], rating: 4.5, reviewCount: 189, inStock: true, authenticity: true, tags: ["Trending"] },
  { id: "jw2", name: "Wide Leg Palazzo Jeans", price: 1299, description: "Trendy wide-leg palazzo style jeans. Comfortable and stylish.", category: "women", subcategory: "jeans-women", images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800"], rating: 4.3, reviewCount: 112, inStock: true, authenticity: true, tags: ["Comfort"] },
  { id: "jw3", name: "Distressed Boyfriend Jeans", price: 1699, originalPrice: 2499, description: "Relaxed fit boyfriend jeans with authentic distressing. Premium denim.", category: "women", subcategory: "jeans-women", images: ["https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=800"], rating: 4.6, reviewCount: 145, inStock: true, authenticity: true, tags: ["Casual", "Premium"] },
  { id: "jw4", name: "Bootcut Dark Wash Jeans", price: 1599, description: "Classic bootcut silhouette in dark indigo wash.", category: "women", subcategory: "jeans-women", images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800"], rating: 4.4, reviewCount: 78, inStock: true, authenticity: true, tags: ["Classic"] },
  { id: "jw5", name: "Mom Fit Vintage Jeans", price: 1399, originalPrice: 1999, description: "90s-inspired mom fit jeans in vintage light wash.", category: "women", subcategory: "jeans-women", images: ["https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=800"], rating: 4.5, reviewCount: 134, inStock: true, authenticity: true, tags: ["Retro"] },
  { id: "jw6", name: "Cropped Flare Jeans", price: 1199, description: "Chic cropped flare jeans perfect for summer styling.", category: "women", subcategory: "jeans-women", images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800"], rating: 4.2, reviewCount: 56, inStock: true, authenticity: true, tags: ["Summer"] },
  { id: "jw7", name: "Ripped Ankle Jeans", price: 1099, description: "Stylish ripped ankle-length jeans with raw hem finish.", category: "women", subcategory: "jeans-women", images: ["https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=800"], rating: 4.3, reviewCount: 91, inStock: true, authenticity: true, tags: ["Street Style"] },
  { id: "jw8", name: "Embroidered Slim Jeans", price: 1799, originalPrice: 2599, description: "Slim fit jeans with beautiful floral embroidery on pockets.", category: "women", subcategory: "jeans-women", images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800"], rating: 4.7, reviewCount: 167, inStock: true, authenticity: true, tags: ["Designer"] },

  // ===== WESTERN WEAR (Women) =====
  { id: "ww1", name: "Floral Wrap Dress", price: 1999, originalPrice: 2999, description: "Elegant floral wrap dress with flutter sleeves. Perfect for brunch and outings.", category: "women", subcategory: "western-wear", images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800", "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800"], rating: 4.7, reviewCount: 198, inStock: true, authenticity: true, tags: ["Trending", "Date Night"] },
  { id: "ww2", name: "Crop Top & Skirt Set", price: 1499, description: "Matching crop top and flared skirt co-ord set. Fun and flirty.", category: "women", subcategory: "western-wear", images: ["https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800"], rating: 4.4, reviewCount: 87, inStock: true, authenticity: true, tags: ["Party"] },
  { id: "ww3", name: "Bodycon Ribbed Dress", price: 1299, originalPrice: 1799, description: "Flattering bodycon dress in ribbed knit fabric.", category: "women", subcategory: "western-wear", images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800"], rating: 4.5, reviewCount: 134, inStock: true, authenticity: true, tags: ["Chic"] },
  { id: "ww4", name: "Denim Jacket", price: 2199, originalPrice: 3299, description: "Classic denim jacket with button closure. Timeless wardrobe staple.", category: "women", subcategory: "western-wear", images: ["https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800"], rating: 4.8, reviewCount: 245, inStock: true, authenticity: true, tags: ["Bestseller", "Classic"] },
  { id: "ww5", name: "Pleated Maxi Skirt", price: 1399, description: "Flowing pleated maxi skirt in solid pastel shades.", category: "women", subcategory: "western-wear", images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800"], rating: 4.3, reviewCount: 72, inStock: true, authenticity: true, tags: ["Elegant"] },
  { id: "ww6", name: "Off-Shoulder Blouse", price: 899, description: "Romantic off-shoulder blouse with ruffled neckline.", category: "women", subcategory: "western-wear", images: ["https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800"], rating: 4.4, reviewCount: 109, inStock: true, authenticity: true, tags: ["Summer"] },
  { id: "ww7", name: "Blazer Dress", price: 2499, originalPrice: 3499, description: "Structured blazer dress with gold buttons. Power dressing at its finest.", category: "women", subcategory: "western-wear", images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800"], rating: 4.6, reviewCount: 156, inStock: true, authenticity: true, tags: ["Office", "Premium"] },
  { id: "ww8", name: "Boho Embroidered Top", price: 799, description: "Bohemian style embroidered top with tassels.", category: "women", subcategory: "western-wear", images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800"], rating: 4.2, reviewCount: 63, inStock: true, authenticity: true, tags: ["Boho"] },

  // ===== SHIRTS (Men) =====
  { id: "ms1", name: "Oxford Button-Down Shirt", price: 1499, originalPrice: 2199, description: "Classic Oxford button-down in premium cotton. Perfect for office and smart casual.", category: "men", subcategory: "shirts", images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800", "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800"], rating: 4.7, reviewCount: 234, inStock: true, authenticity: true, tags: ["Bestseller", "Office"] },
  { id: "ms2", name: "Linen Casual Shirt", price: 1299, description: "Breathable linen shirt perfect for Indian summers. Relaxed fit.", category: "men", subcategory: "shirts", images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800"], rating: 4.5, reviewCount: 167, inStock: true, authenticity: true, tags: ["Summer", "Comfort"] },
  { id: "ms3", name: "Printed Hawaiian Shirt", price: 999, description: "Bold tropical print shirt for vacations and weekends.", category: "men", subcategory: "shirts", images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800"], rating: 4.3, reviewCount: 89, inStock: true, authenticity: true, tags: ["Casual", "Fun"] },
  { id: "ms4", name: "Slim Fit Formal Shirt", price: 1799, originalPrice: 2599, description: "Wrinkle-free formal shirt with French cuffs. Premium cotton blend.", category: "men", subcategory: "shirts", images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800"], rating: 4.8, reviewCount: 198, inStock: true, authenticity: true, tags: ["Formal", "Premium"] },
  { id: "ms5", name: "Mandarin Collar Shirt", price: 1199, description: "Contemporary mandarin collar shirt. Indo-western fusion style.", category: "men", subcategory: "shirts", images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800"], rating: 4.4, reviewCount: 112, inStock: true, authenticity: true, tags: ["Fusion"] },
  { id: "ms6", name: "Flannel Check Shirt", price: 1099, originalPrice: 1599, description: "Warm flannel shirt in classic check pattern.", category: "men", subcategory: "shirts", images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800"], rating: 4.3, reviewCount: 78, inStock: true, authenticity: true, tags: ["Winter"] },
  { id: "ms7", name: "Denim Shirt", price: 1399, description: "Classic denim shirt with pearl snap buttons. Vintage inspired.", category: "men", subcategory: "shirts", images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800"], rating: 4.5, reviewCount: 145, inStock: true, authenticity: true, tags: ["Casual", "Classic"] },
  { id: "ms8", name: "Micro Print Shirt", price: 1099, description: "Subtle micro print shirt for smart casual occasions.", category: "men", subcategory: "shirts", images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800"], rating: 4.2, reviewCount: 56, inStock: true, authenticity: true, tags: ["Smart Casual"] },

  // ===== PANTS (Men) =====
  { id: "mp1", name: "Slim Fit Chinos", price: 1299, originalPrice: 1899, description: "Versatile slim fit chinos in soft cotton twill. Available in multiple colors.", category: "men", subcategory: "pants", images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800", "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800"], rating: 4.6, reviewCount: 256, inStock: true, authenticity: true, tags: ["Bestseller", "Versatile"] },
  { id: "mp2", name: "Formal Trouser", price: 1599, originalPrice: 2399, description: "Sharp crease formal trousers. Perfect drape and fit.", category: "men", subcategory: "pants", images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800"], rating: 4.7, reviewCount: 189, inStock: true, authenticity: true, tags: ["Formal", "Office"] },
  { id: "mp3", name: "Jogger Pants", price: 999, description: "Comfortable jogger pants with elastic cuffs. Athleisure style.", category: "men", subcategory: "pants", images: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800"], rating: 4.4, reviewCount: 134, inStock: true, authenticity: true, tags: ["Comfort", "Sporty"] },
  { id: "mp4", name: "Cargo Pants", price: 1499, description: "Utility cargo pants with multiple pockets. Durable cotton canvas.", category: "men", subcategory: "pants", images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800"], rating: 4.3, reviewCount: 98, inStock: true, authenticity: true, tags: ["Utility"] },
  { id: "mp5", name: "Linen Trousers", price: 1399, originalPrice: 1999, description: "Lightweight linen trousers for summer. Relaxed fit with drawstring waist.", category: "men", subcategory: "pants", images: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800"], rating: 4.5, reviewCount: 112, inStock: true, authenticity: true, tags: ["Summer"] },
  { id: "mp6", name: "Corduroy Pants", price: 1699, originalPrice: 2499, description: "Classic corduroy pants in rich autumn tones. Retro charm.", category: "men", subcategory: "pants", images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800"], rating: 4.4, reviewCount: 67, inStock: true, authenticity: true, tags: ["Winter", "Retro"] },
  { id: "mp7", name: "Tapered Fit Jeans", price: 1599, description: "Modern tapered fit jeans in medium wash denim.", category: "men", subcategory: "pants", images: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800"], rating: 4.6, reviewCount: 178, inStock: true, authenticity: true, tags: ["Trending"] },
  { id: "mp8", name: "Track Pants", price: 799, description: "Classic track pants with side stripes. Quick-dry fabric.", category: "men", subcategory: "pants", images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800"], rating: 4.1, reviewCount: 45, inStock: true, authenticity: true, tags: ["Sporty"] },

  // ===== WATCHES =====
  { id: "w1", name: "Classic Chronograph Watch", price: 12999, originalPrice: 18999, description: "Swiss-inspired chronograph with sapphire crystal glass and genuine leather strap. Authenticity certificate included.", category: "common", subcategory: "watches", images: ["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800", "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800"], rating: 4.9, reviewCount: 312, inStock: true, authenticity: true, tags: ["Luxury", "Certified"] },
  { id: "w2", name: "Minimalist Analog Watch", price: 3499, originalPrice: 4999, description: "Clean minimalist design with mesh steel band. Japanese movement.", category: "common", subcategory: "watches", images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800"], rating: 4.6, reviewCount: 189, inStock: true, authenticity: true, tags: ["Minimalist"] },
  { id: "w3", name: "Digital Sports Watch", price: 2999, description: "Multi-function digital watch with step counter and water resistance.", category: "common", subcategory: "watches", images: ["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800"], rating: 4.4, reviewCount: 156, inStock: true, authenticity: true, tags: ["Sports"] },
  { id: "w4", name: "Rose Gold Women's Watch", price: 4999, originalPrice: 6999, description: "Elegant rose gold watch with crystal-studded bezel.", category: "common", subcategory: "watches", images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800"], rating: 4.8, reviewCount: 234, inStock: true, authenticity: true, tags: ["Elegant", "Gift"] },
  { id: "w5", name: "Vintage Automatic Watch", price: 8999, originalPrice: 12999, description: "Self-winding automatic movement in vintage-style case. Exhibition case back.", category: "common", subcategory: "watches", images: ["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800"], rating: 4.7, reviewCount: 145, inStock: true, authenticity: true, tags: ["Vintage", "Premium"] },
  { id: "w6", name: "Smartwatch Pro", price: 5999, originalPrice: 7999, description: "Advanced smartwatch with health monitoring, GPS, and 5-day battery.", category: "common", subcategory: "watches", images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800"], rating: 4.5, reviewCount: 267, inStock: true, authenticity: true, tags: ["Tech", "Trending"] },
  { id: "w7", name: "Titanium Dive Watch", price: 15999, originalPrice: 21999, description: "Professional dive watch rated to 200m. Titanium case, unidirectional bezel.", category: "common", subcategory: "watches", images: ["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800"], rating: 4.9, reviewCount: 98, inStock: true, authenticity: true, tags: ["Professional", "Luxury"] },
  { id: "w8", name: "Leather Strap Dress Watch", price: 3999, description: "Sophisticated dress watch with genuine leather strap. Slim profile.", category: "common", subcategory: "watches", images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800"], rating: 4.5, reviewCount: 112, inStock: true, authenticity: true, tags: ["Dress", "Classic"] },

  // ===== ACCESSORIES =====
  { id: "a1", name: "Designer Leather Tote Bag", price: 3499, originalPrice: 4999, description: "Premium full-grain leather tote with suede interior. Spacious and elegant.", category: "common", subcategory: "accessories", images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800", "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800"], rating: 4.6, reviewCount: 178, inStock: true, authenticity: true, tags: ["Premium"] },
  { id: "a2", name: "Premium Aviator Sunglasses", price: 2499, originalPrice: 3999, description: "Polarized aviator sunglasses with titanium frame. UV400 protection.", category: "common", subcategory: "accessories", images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800"], rating: 4.7, reviewCount: 234, inStock: true, authenticity: true, tags: ["UV Protected"] },
  { id: "a3", name: "Genuine Leather Belt", price: 999, originalPrice: 1499, description: "Full-grain leather belt with brushed metal buckle. Durable and stylish.", category: "common", subcategory: "accessories", images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"], rating: 4.5, reviewCount: 156, inStock: true, authenticity: true, tags: ["Essential"] },
  { id: "a4", name: "Silk Printed Scarf", price: 1299, description: "Luxurious silk scarf with hand-printed design. Versatile accessory.", category: "common", subcategory: "accessories", images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800"], rating: 4.4, reviewCount: 89, inStock: true, authenticity: true, tags: ["Luxury"] },
  { id: "a5", name: "Canvas Backpack", price: 1799, originalPrice: 2499, description: "Durable canvas backpack with laptop compartment. Water-resistant coating.", category: "common", subcategory: "accessories", images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"], rating: 4.6, reviewCount: 198, inStock: true, authenticity: true, tags: ["Travel"] },
  { id: "a6", name: "Pearl Stud Earrings", price: 1499, originalPrice: 2199, description: "Freshwater pearl studs in sterling silver setting. Elegant and timeless.", category: "common", subcategory: "accessories", images: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800"], rating: 4.8, reviewCount: 145, inStock: true, authenticity: true, tags: ["Jewellery", "Gift"] },
  { id: "a7", name: "Leather Wallet", price: 899, originalPrice: 1299, description: "Slim bi-fold wallet in genuine leather. RFID blocking technology.", category: "common", subcategory: "accessories", images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"], rating: 4.4, reviewCount: 210, inStock: true, authenticity: true, tags: ["Essential", "RFID"] },
  { id: "a8", name: "Statement Necklace", price: 1999, description: "Bold statement necklace with geometric design. Gold-plated brass.", category: "common", subcategory: "accessories", images: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800"], rating: 4.3, reviewCount: 67, inStock: true, authenticity: true, tags: ["Statement", "Party"] },
  { id: "a9", name: "Bamboo Frame Sunglasses", price: 1199, description: "Eco-friendly sunglasses with bamboo temples. Polarized lenses.", category: "common", subcategory: "accessories", images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800"], rating: 4.5, reviewCount: 98, inStock: true, authenticity: true, tags: ["Eco", "Trending"] },
  { id: "a10", name: "Crossbody Sling Bag", price: 1599, originalPrice: 2299, description: "Compact crossbody bag in vegan leather. Perfect for daily essentials.", category: "common", subcategory: "accessories", images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800"], rating: 4.5, reviewCount: 134, inStock: true, authenticity: true, tags: ["Vegan", "Daily"] },
];

export const reviews: Review[] = [
  { id: "r1", productId: "k1", userName: "Priya M.", rating: 5, comment: "Exactly as shown in the pictures! The embroidery is stunning. Will buy again.", date: "2024-12-15", verified: true },
  { id: "r2", productId: "k4", userName: "Anita S.", rating: 5, comment: "Perfect fit and gorgeous block print. The authenticity badge gave me confidence.", date: "2024-12-10", verified: true },
  { id: "r3", productId: "ms1", userName: "Rahul K.", rating: 5, comment: "Best shirt I've owned. The cotton quality is exactly as described.", date: "2024-11-28", verified: true },
  { id: "r4", productId: "w1", userName: "Vikram J.", rating: 5, comment: "Came with authenticity certificate. Watch looks even better in person!", date: "2024-12-20", verified: true },
  { id: "r5", productId: "ww1", userName: "Sneha R.", rating: 5, comment: "The wrap dress fits perfectly. True to size and color!", date: "2024-12-18", verified: true },
  { id: "r6", productId: "a2", userName: "Arun P.", rating: 4, comment: "Great sunglasses, polarization works well. Slight scratch on delivery but replaced quickly.", date: "2024-12-05", verified: true },
  { id: "r7", productId: "mp1", userName: "Karthik S.", rating: 5, comment: "The chinos are super comfortable and the fit is perfect. Worth every rupee!", date: "2024-11-30", verified: true },
  { id: "r8", productId: "jw1", userName: "Meera L.", rating: 5, comment: "These jeans are amazing! The stretch denim is so comfortable.", date: "2024-12-12", verified: true },
];
