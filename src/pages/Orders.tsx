import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { fetchApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetchApi("/orders")
      .then((data) => {
        if (data && data.orders) {
          setOrders(data.orders);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Package className="h-16 w-16 mx-auto text-muted-foreground/30" />
          <h2 className="font-display text-2xl font-bold text-foreground">Sign in to view orders</h2>
          <Link to="/login"><Button>Log In</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-xl shadow-card border">
            <Package className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="font-display text-xl font-bold mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-6">Looks like you haven't placed an order yet.</p>
            <Link to="/products"><Button>Start Shopping</Button></Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-card rounded-xl shadow-card border overflow-hidden">
                <div className="bg-secondary/50 p-4 sm:p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-0.5">Order Placed</p>
                      <p className="font-medium text-foreground">{order.created_at}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-0.5">Total</p>
                      <p className="font-medium text-foreground">₹{order.total.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-0.5">Ship To</p>
                      <p className="font-medium text-foreground truncate max-w-[200px]" title={order.shipping_address}>
                        {order.shipping_address.split(',')[0]}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right flex-1 sm:flex-none">
                      <p className="text-muted-foreground mb-0.5 text-sm sm:hidden">Order #</p>
                      <p className="font-medium text-sm text-foreground"># {order.id}</p>
                    </div>
                    <Badge variant={order.status === 'Processing' ? 'secondary' : order.status === 'Shipped' ? 'default' : 'outline'}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  {order.items && order.items.map((item: any, i: number) => (
                    <div key={item.id} className={`flex items-center gap-4 py-4 ${i !== 0 ? 'border-t line-clamp-2' : ''}`}>
                      <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center shrink-0">
                        <Package className="h-6 w-6 text-muted-foreground/50" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <Link to={`/product/${item.product_id}`} className="font-medium text-foreground hover:text-accent transition-colors line-clamp-2 mb-1">
                            {item.product_name}
                          </Link>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <div className="font-medium text-foreground shrink-0 whitespace-nowrap">
                          ₹{item.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
