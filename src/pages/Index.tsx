import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import TrustBadge from "@/components/TrustBadge";
import { products, categories } from "@/data/products";

const Index = () => {
  const featured = products.slice(0, 4);
  const trending = products.slice(4, 8);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-gradient text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_70%)]" />
        <div className="container mx-auto px-4 py-20 sm:py-28 relative z-10">
          <div className="max-w-2xl space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm"
            >
              <ShieldCheck className="h-4 w-4 text-accent" />
              100% Authenticity Guaranteed
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            >
              What You See
              <br />
              Is What You <span className="text-accent">Get</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary-foreground/80 text-lg max-w-md"
            >
              Premium, verified products delivered exactly as shown. No surprises, just quality.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-3"
            >
              <Link to="/products">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-body">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/products?category=watches">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-body">
                  Explore Collections
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <TrustBadge />

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/products?category=${cat.id}`}
                  className="block bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all text-center group"
                >
                  <span className="text-3xl block mb-3">{cat.icon}</span>
                  <span className="font-body font-medium text-sm text-foreground group-hover:text-accent transition-colors">{cat.name}</span>
                  <span className="block text-xs text-muted-foreground mt-1">{cat.count} Products</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              <Sparkles className="inline h-6 w-6 text-gold mr-2" />
              Featured Products
            </h2>
            <Link to="/products" className="text-accent text-sm font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Authenticity banner */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="trust-gradient rounded-2xl p-8 sm:p-12 text-accent-foreground text-center">
            <ShieldCheck className="h-12 w-12 mx-auto mb-4" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">Our Authenticity Promise</h2>
            <p className="max-w-lg mx-auto text-accent-foreground/80 mb-6">
              Every product is photographed from multiple angles, quality-checked, and shipped with an authenticity seal.
              If it doesn't match, return it — no questions asked.
            </p>
            <Link to="/products">
              <Button size="lg" className="bg-card text-foreground hover:bg-card/90 font-body">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-8">Trending Now</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {trending.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
