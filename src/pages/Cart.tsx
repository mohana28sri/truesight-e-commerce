import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/30" />
          <h2 className="font-display text-2xl font-bold text-foreground">Your cart is empty</h2>
          <p className="text-muted-foreground">Discover our verified products!</p>
          <Link to="/products"><Button>Start Shopping</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="bg-card rounded-xl shadow-card p-4 flex gap-4">
                <Link to={`/product/${item.product.id}`} className="shrink-0">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product.id}`}>
                    <h3 className="font-medium text-foreground truncate hover:text-accent transition-colors">{item.product.name}</h3>
                  </Link>
                  {item.product.authenticity && (
                    <div className="flex items-center gap-1 text-accent text-xs mt-1">
                      <ShieldCheck className="h-3 w-3" /> Verified
                    </div>
                  )}
                  <p className="font-semibold text-foreground mt-2">₹{item.product.price.toLocaleString()}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 border rounded-lg">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 hover:bg-secondary transition-colors">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 hover:bg-secondary transition-colors">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="text-destructive hover:text-destructive/80 p-2">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-xl shadow-card p-6 h-fit sticky top-28 space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground">Order Summary</h2>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-accent">{totalPrice >= 999 ? "Free" : "₹99"}</span>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-foreground">
              <span>Total</span>
              <span>₹{(totalPrice + (totalPrice >= 999 ? 0 : 99)).toLocaleString()}</span>
            </div>
            <Link to="/checkout">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
            <p className="text-center text-[10px] text-muted-foreground flex items-center justify-center gap-1">
              <ShieldCheck className="h-3 w-3" /> Secure checkout • Authenticity guaranteed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
