import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { fetchApi } from "@/lib/api";

const Wishlist = () => {
  const { wishlist } = useCart();
  const { user } = useAuth();
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (wishlist.length === 0) {
      setWishlistProducts([]);
      setLoading(false);
      return;
    }

    // Best approach: fetch products matching wishlist IDs
    // Assuming backend /api/products can take ?search= or we fetch all and filter
    const params = new URLSearchParams();
    params.append("limit", "100");
    
    setLoading(true);
    fetchApi(`/products?${params.toString()}`)
      .then(data => {
        if (data && data.products) {
          setWishlistProducts(data.products.filter((p: Product) => wishlist.includes(p.id)));
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [wishlist]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground/30" />
          <h2 className="font-display text-2xl font-bold text-foreground">Your wishlist is empty</h2>
          <p className="text-muted-foreground">{!user ? "Login to save items across devices." : "Save items you love for later!"}</p>
          <Link to="/products"><Button>Browse Products</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">My Wishlist</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
