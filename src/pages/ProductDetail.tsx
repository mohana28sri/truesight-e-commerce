import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ShieldCheck, Star, Heart, ShoppingCart, Minus, Plus, ZoomIn, ChevronLeft, RotateCcw, Truck, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product, Review } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { fetchApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [productReviews, setProductReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [zoomed, setZoomed] = useState(false);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchApi(`/products/${id}`)
        .then(data => {
          if (data && data.product) {
            setProduct(data.product);
            setProductReviews(data.reviews || []);
            setRelated(data.related || []);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmittingReview(true);
    try {
      const data = await fetchApi(`/reviews/${id}`, {
        method: "POST",
        body: JSON.stringify({ rating, comment })
      });
      if (data && data.reviews) {
        setProductReviews(data.reviews);
        setComment("");
        // Reload product to get updated avg rating
        fetchApi(`/products/${id}`).then(d => d && setProduct(d.product));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">Product not found</p>
          <Link to="/products"><Button className="mt-4">Back to Shop</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Link to="/products" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6 text-sm">
          <ChevronLeft className="h-4 w-4" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div
              className="relative aspect-square rounded-xl overflow-hidden bg-secondary cursor-zoom-in"
              onClick={() => setZoomed(!zoomed)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-300 ${zoomed ? "scale-150" : ""}`}
                />
              </AnimatePresence>
              <div className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm p-2 rounded-full">
                <ZoomIn className="h-4 w-4 text-muted-foreground" />
              </div>
              {product.authenticity && (
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs font-medium">
                  <ShieldCheck className="h-3.5 w-3.5" /> Authenticity Verified
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedImage(i); setZoomed(false); }}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${i === selectedImage ? "border-accent" : "border-transparent"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">{product.name}</h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-gold text-gold" : "text-muted"}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-body text-3xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <Badge className="bg-destructive text-destructive-foreground border-0">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                </>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            <Separator />

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">Quantity:</span>
                <div className="flex items-center gap-2 border rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-secondary transition-colors">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-secondary transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => { for (let i = 0; i < quantity; i++) addToCart(product); }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-destructive text-destructive" : ""}`} />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Stock + Delivery */}
            <div className="space-y-2 text-sm">
              <p className="text-destructive font-medium flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 bg-destructive rounded-full animate-pulse" />
                Only {((product.id.charCodeAt(0) % 5) + 2)} left in stock — order soon!
              </p>
              <p className="text-muted-foreground flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-accent" />
                Estimated delivery: <strong className="text-foreground ml-1">3–5 business days</strong>
              </p>
            </div>

            <Separator />

            {/* Trust features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Truck, label: "Free Shipping", sub: "On orders above ₹999" },
                { icon: RotateCcw, label: "Easy Returns", sub: "7-day return policy" },
                { icon: Award, label: "Quality Assured", sub: "Authenticity certified" },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                  <f.icon className="h-5 w-5 text-accent shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-foreground">{f.label}</p>
                    <p className="text-[10px] text-muted-foreground">{f.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Customer Reviews</h2>
            {productReviews.length > 0 ? (
              <div className="space-y-4">
                {productReviews.map((r) => (
                  <div key={r.id} className="bg-card p-6 rounded-xl shadow-card">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-foreground">{(r as any).user_name || r.userName}</span>
                        {r.verified ? (
                          <Badge variant="secondary" className="text-[10px]">
                            <ShieldCheck className="h-3 w-3 mr-1" /> Verified Purchase
                          </Badge>
                        ) : null}
                      </div>
                      <span className="text-xs text-muted-foreground">{r.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-gold text-gold" : "text-muted"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{r.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No reviews yet for this product.</p>
            )}
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Write a Review</h2>
            {user ? (
              <form onSubmit={submitReview} className="space-y-4 bg-card p-6 rounded-xl shadow-card">
                <div>
                  <label className="text-sm font-medium mb-1 block">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button type="button" key={star} onClick={() => setRating(star)}>
                        <Star className={`h-6 w-6 ${star <= rating ? "fill-gold text-gold" : "text-muted"}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Review</label>
                  <Textarea
                    placeholder="What did you like or dislike?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={submittingReview}>
                  {submittingReview ? "Submitting..." : "Submit Review"}
                </Button>
              </form>
            ) : (
              <div className="bg-card p-6 rounded-xl shadow-card text-center">
                <p className="text-muted-foreground mb-4">Please log in to write a review.</p>
                <Link to="/login"><Button variant="outline">Log in</Button></Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
