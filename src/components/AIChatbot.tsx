import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products, allSubcategories } from "@/data/products";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const quickQueries = [
  "Show me kurtis under ₹1000",
  "Best rated watches",
  "Men's shirts on sale",
  "Recommend accessories for gifting",
];

function processQuery(query: string): string {
  const q = query.toLowerCase();

  // Price-based queries
  const priceMatch = q.match(/under\s*₹?\s*(\d+)/);
  if (priceMatch) {
    const maxPrice = parseInt(priceMatch[1]);
    const keyword = q.replace(/under\s*₹?\s*\d+/, "").trim();
    let filtered = products.filter((p) => p.price <= maxPrice);
    if (keyword) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(keyword) ||
          p.subcategory.includes(keyword) ||
          p.tags.some((t) => t.toLowerCase().includes(keyword))
      );
    }
    if (filtered.length === 0) return `Sorry, I couldn't find products under ₹${maxPrice.toLocaleString()} matching your search. Try a higher budget or different category!`;
    const top = filtered.slice(0, 5);
    return `Here are ${filtered.length} products under ₹${maxPrice.toLocaleString()}:\n\n${top.map((p) => `• **${p.name}** — ₹${p.price.toLocaleString()} ⭐${p.rating} (${p.reviewCount} reviews)`).join("\n")}\n\n${filtered.length > 5 ? `...and ${filtered.length - 5} more! Check the Products page for all.` : ""}`;
  }

  // Category-based
  const subcat = allSubcategories.find(
    (s) => q.includes(s.name.toLowerCase()) || q.includes(s.id)
  );
  if (subcat) {
    const catProducts = products.filter((p) => p.subcategory === subcat.id);
    if (catProducts.length === 0) return `We don't have ${subcat.name} products right now, but stay tuned!`;
    const top = catProducts.sort((a, b) => b.rating - a.rating).slice(0, 5);
    return `Here are our top **${subcat.name}** products:\n\n${top.map((p) => `• **${p.name}** — ₹${p.price.toLocaleString()} ⭐${p.rating}${p.originalPrice ? ` (${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% OFF)` : ""}`).join("\n")}\n\nBrowse all in the ${subcat.name} category!`;
  }

  // Best rated / top rated
  if (q.includes("best") || q.includes("top rated") || q.includes("highest rated")) {
    const keyword = q.replace(/(best|top rated|highest rated|rated|show me|find)/g, "").trim();
    let filtered = [...products];
    if (keyword) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(keyword) ||
          p.subcategory.includes(keyword) ||
          p.category.includes(keyword) ||
          p.tags.some((t) => t.toLowerCase().includes(keyword))
      );
    }
    const top = filtered.sort((a, b) => b.rating - a.rating).slice(0, 5);
    return `Our highest-rated products:\n\n${top.map((p) => `• **${p.name}** — ₹${p.price.toLocaleString()} ⭐${p.rating} (${p.reviewCount} reviews)`).join("\n")}`;
  }

  // Sale / discount
  if (q.includes("sale") || q.includes("discount") || q.includes("offer")) {
    const onSale = products.filter((p) => p.originalPrice).sort((a, b) => {
      const discA = ((a.originalPrice! - a.price) / a.originalPrice!) * 100;
      const discB = ((b.originalPrice! - b.price) / b.originalPrice!) * 100;
      return discB - discA;
    });
    const top = onSale.slice(0, 5);
    return `🔥 Best deals right now:\n\n${top.map((p) => `• **${p.name}** — ₹${p.price.toLocaleString()} ~~₹${p.originalPrice!.toLocaleString()}~~ (${Math.round(((p.originalPrice! - p.price) / p.originalPrice!) * 100)}% OFF)`).join("\n")}\n\nAll products come with our authenticity guarantee!`;
  }

  // Gift recommendation
  if (q.includes("gift") || q.includes("recommend") || q.includes("suggest")) {
    const gifts = products.filter((p) => p.tags.some((t) => ["Gift", "Premium", "Luxury", "Elegant"].includes(t))).slice(0, 5);
    if (gifts.length > 0) {
      return `🎁 Great gift ideas:\n\n${gifts.map((p) => `• **${p.name}** — ₹${p.price.toLocaleString()} ⭐${p.rating}`).join("\n")}\n\nAll items ship with premium packaging!`;
    }
    const topRated = products.sort((a, b) => b.rating - a.rating).slice(0, 5);
    return `🎁 Here are our top-rated picks for gifting:\n\n${topRated.map((p) => `• **${p.name}** — ₹${p.price.toLocaleString()} ⭐${p.rating}`).join("\n")}`;
  }

  // Price query
  if (q.includes("price") || q.includes("cost") || q.includes("how much")) {
    const found = products.find((p) => q.includes(p.name.toLowerCase().split(" ")[0]));
    if (found) return `**${found.name}** is priced at ₹${found.price.toLocaleString()}${found.originalPrice ? ` (discounted from ₹${found.originalPrice.toLocaleString()})` : ""}. ⭐${found.rating} with ${found.reviewCount} reviews.`;
  }

  // Availability
  if (q.includes("available") || q.includes("stock") || q.includes("availability")) {
    return "All products listed on TrustCart are currently in stock! We update availability in real-time. Every item is authenticity-verified before shipping. 🛡️";
  }

  // Return / refund
  if (q.includes("return") || q.includes("refund") || q.includes("exchange")) {
    return "📦 Our return policy:\n\n• **7-day easy returns** — no questions asked\n• **Free pickup** from your address\n• **Full refund** if the product doesn't match the listing\n• Our \"What You See Is What You Get\" guarantee ensures product authenticity\n\nWe've got you covered!";
  }

  // Shipping
  if (q.includes("shipping") || q.includes("delivery") || q.includes("deliver")) {
    return "🚚 Shipping details:\n\n• **Free shipping** on orders above ₹999\n• **3-5 business days** delivery across India\n• Real-time order tracking\n• Every package is sealed with authenticity verification";
  }

  // Generic search
  const words = q.split(/\s+/).filter((w) => w.length > 2);
  const matched = products.filter((p) =>
    words.some(
      (w) =>
        p.name.toLowerCase().includes(w) ||
        p.description.toLowerCase().includes(w) ||
        p.subcategory.includes(w) ||
        p.tags.some((t) => t.toLowerCase().includes(w))
    )
  );
  if (matched.length > 0) {
    const top = matched.slice(0, 5);
    return `I found ${matched.length} matching products:\n\n${top.map((p) => `• **${p.name}** — ₹${p.price.toLocaleString()} ⭐${p.rating}`).join("\n")}\n\n${matched.length > 5 ? "Browse the Products page for more!" : ""}`;
  }

  return "I'm your TrustCart shopping assistant! 🛍️ I can help you:\n\n• Find products by category or price (e.g., \"kurtis under ₹1000\")\n• Show top-rated items\n• Check deals and discounts\n• Answer questions about shipping, returns, and more\n\nWhat are you looking for today?";
}

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! 👋 I'm your TrustCart shopping assistant. Ask me anything — find products, check prices, or get recommendations!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleSend = (text?: string) => {
    const query = text || input.trim();
    if (!query) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = processQuery(query);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: response },
      ]);
      setIsTyping(false);
    }, 600 + Math.random() * 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-accent text-accent-foreground rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-card rounded-2xl shadow-2xl border overflow-hidden flex flex-col"
            style={{ height: "500px" }}
          >
            {/* Header */}
            <div className="hero-gradient text-primary-foreground px-4 py-3 flex items-center gap-3">
              <div className="bg-primary-foreground/20 p-2 rounded-full">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-sm">TrustCart AI Assistant</h3>
                <p className="text-[10px] text-primary-foreground/70">Ask me anything about our products</p>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea ref={scrollRef} className="flex-1 p-4">
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <div className="bg-accent/10 p-1.5 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="h-3.5 w-3.5 text-accent" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                        msg.role === "user"
                          ? "bg-accent text-accent-foreground rounded-br-md"
                          : "bg-secondary text-foreground rounded-bl-md"
                      }`}
                    >
                      {msg.content.split(/(\*\*.*?\*\*|~~.*?~~)/).map((part, i) => {
                        if (part.startsWith("**") && part.endsWith("**"))
                          return <strong key={i}>{part.slice(2, -2)}</strong>;
                        if (part.startsWith("~~") && part.endsWith("~~"))
                          return <s key={i} className="text-muted-foreground">{part.slice(2, -2)}</s>;
                        return <span key={i}>{part}</span>;
                      })}
                    </div>
                    {msg.role === "user" && (
                      <div className="bg-muted p-1.5 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-2 items-center">
                    <div className="bg-accent/10 p-1.5 rounded-full h-7 w-7 flex items-center justify-center shrink-0">
                      <Bot className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <div className="bg-secondary px-4 py-2.5 rounded-2xl rounded-bl-md">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick queries */}
              {messages.length <= 1 && (
                <div className="mt-4 space-y-2">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Try asking</p>
                  {quickQueries.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="block w-full text-left text-xs bg-secondary/60 hover:bg-secondary px-3 py-2 rounded-lg text-foreground transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about products..."
                className="text-sm bg-secondary border-0"
                disabled={isTyping}
              />
              <Button type="submit" size="icon" className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0" disabled={isTyping || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
