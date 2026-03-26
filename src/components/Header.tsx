import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, User, Search, ShieldCheck, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSidebar } from "@/components/ui/sidebar";

const Header = () => {
  const { totalItems, wishlist } = useCart();
  const { user, logout } = useAuth();
  const { toggleSidebar } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b">
      {/* Top bar */}
      <div className="hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 py-1.5 flex items-center justify-center gap-2 text-xs sm:text-sm">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span className="font-medium">What You See Is What You Get — 100% Authenticity Guaranteed</span>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Hamburger + Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hover:bg-secondary">
              <Menu className="h-5 w-5" />
            </Button>
            <Link to="/" className="flex items-center gap-2">
              <ShieldCheck className="h-7 w-7 text-accent" />
              <span className="font-display text-xl sm:text-2xl font-bold text-foreground">Zenvique</span>
            </Link>
          </div>

          {/* Search - desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-0"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link to="/wishlist" className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-accent text-accent-foreground border-0">
                  {wishlist.length}
                </Badge>
              )}
            </Link>
            <Link to="/cart" className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-accent text-accent-foreground border-0">
                  {totalItems}
                </Badge>
              )}
            </Link>
            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/account" className="p-2 hover:bg-secondary rounded-lg transition-colors">
                  <User className="h-5 w-5" />
                </Link>
                <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground">
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="md:hidden mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 bg-secondary border-0" />
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
