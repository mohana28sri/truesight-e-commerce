import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, CreditCard } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      clearCart();
      toast({ title: "Order Placed! 🎉", description: "Your verified products are on the way." });
      navigate("/");
      setLoading(false);
    }, 1500);
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const shipping = totalPrice >= 999 ? 0 : 99;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">Checkout</h1>
        <form onSubmit={handleOrder} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h2 className="font-display font-semibold text-foreground mb-4">Shipping Details</h2>
              <div className="space-y-3">
                <div><Label>Full Name</Label><Input required defaultValue={user?.name} /></div>
                <div><Label>Email</Label><Input type="email" required defaultValue={user?.email} /></div>
                <div><Label>Phone</Label><Input type="tel" required placeholder="+91" /></div>
                <div><Label>Address</Label><Input required placeholder="Street address" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>City</Label><Input required /></div>
                  <div><Label>PIN Code</Label><Input required /></div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-display font-semibold text-foreground mb-4">Payment (Mock)</h2>
              <div className="bg-secondary p-4 rounded-lg space-y-3">
                <div><Label>Card Number</Label><Input placeholder="4242 4242 4242 4242" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Expiry</Label><Input placeholder="MM/YY" /></div>
                  <div><Label>CVV</Label><Input placeholder="123" /></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-card rounded-xl shadow-card p-6 sticky top-28 space-y-4">
              <h2 className="font-display font-semibold text-foreground">Order Summary</h2>
              <Separator />
              <div className="space-y-3 max-h-60 overflow-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <img src={item.product.images[0]} alt="" className="w-12 h-12 rounded-md object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-foreground">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>₹{totalPrice.toLocaleString()}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-foreground text-lg">
                <span>Total</span><span>₹{(totalPrice + shipping).toLocaleString()}</span>
              </div>
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg" disabled={loading}>
                {loading ? "Processing..." : <><CreditCard className="h-4 w-4 mr-2" /> Place Order</>}
              </Button>
              <p className="text-center text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Secure checkout • Authenticity guaranteed
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
