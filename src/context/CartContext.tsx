import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, CartItem } from "@/data/products";
import { fetchApi } from "@/lib/api";
import { useAuth } from "./AuthContext";

interface CartContextType {
  items: CartItem[];
  wishlist: string[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("zenvique-cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem("zenvique-wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Sync with backend when user logs in
  useEffect(() => {
    if (user) {
      if (items.length > 0) {
        // Sync local items to backend
        fetchApi("/cart/sync", {
          method: "POST",
          body: JSON.stringify({ items: items.map(i => ({ productId: i.product.id, quantity: i.quantity })) })
        }).then(data => data && setItems(data.items)).catch(console.error);
      } else {
        fetchApi("/cart").then(data => data && setItems(data.items)).catch(console.error);
      }
      
      fetchApi("/wishlist").then(data => {
        if (data && data.items) {
          setWishlist(data.items.map((i: Product) => i.id));
        }
      }).catch(console.error);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("zenvique-cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("zenvique-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product) => {
    if (user) {
      fetchApi("/cart", {
        method: "POST",
        body: JSON.stringify({ productId: product.id, quantity: 1 })
      }).then(data => data && setItems(data.items)).catch(console.error);
    } else {
      setItems((prev) => {
        const existing = prev.find((i) => i.product.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [...prev, { product, quantity: 1 }];
      });
    }
  };

  const removeFromCart = (productId: string) => {
    if (user) {
      fetchApi(`/cart/${productId}`, { method: "DELETE" })
        .then(data => data && setItems(data.items)).catch(console.error);
    } else {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (user) {
      fetchApi(`/cart/${productId}`, {
        method: "PUT",
        body: JSON.stringify({ quantity })
      }).then(data => data && setItems(data.items)).catch(console.error);
    } else {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      setItems((prev) =>
        prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
      );
    }
  };

  const clearCart = () => {
    if (user) {
      // Backend automatically clears cart when order is placed
      // But we clear state immediately
      setItems([]);
    } else {
      setItems([]);
    }
  };

  const toggleWishlist = (productId: string) => {
    if (user) {
      fetchApi(`/wishlist/${productId}`, { method: "POST" })
        .then(data => {
          if (data) {
            setWishlist((prev) =>
              data.added ? [...prev, productId] : prev.filter((id) => id !== productId)
            );
          }
        }).catch(console.error);
    } else {
      setWishlist((prev) =>
        prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
      );
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, wishlist, addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist, isInWishlist, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
