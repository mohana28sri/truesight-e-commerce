import { Link } from "react-router-dom";
import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import { categoryGroups } from "@/data/products";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground mt-20">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-accent" />
            <span className="font-display text-xl font-bold">Zenvique</span>
          </div>
          <p className="text-sm text-primary-foreground/70">What You See Is What You Get. 100% authentic products delivered to your doorstep.</p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Shop</h4>
          <div className="space-y-2 text-sm text-primary-foreground/70">
            {categoryGroups.flatMap((g) => g.subcategories).slice(0, 6).map((sub) => (
              <Link key={sub.id} to={`/products?subcategory=${sub.id}`} className="block hover:text-primary-foreground transition-colors">
                {sub.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Support</h4>
          <div className="space-y-2 text-sm text-primary-foreground/70">
            <p className="hover:text-primary-foreground cursor-pointer transition-colors">Returns & Exchanges</p>
            <p className="hover:text-primary-foreground cursor-pointer transition-colors">Shipping Info</p>
            <p className="hover:text-primary-foreground cursor-pointer transition-colors">FAQ</p>
            <p className="hover:text-primary-foreground cursor-pointer transition-colors">Authenticity Guarantee</p>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Contact</h4>
          <div className="space-y-2 text-sm text-primary-foreground/70">
            <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@zenvique.com</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 98765 43210</p>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Mumbai, India</p>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/50">
        © 2024 Zenvique. All rights reserved. Every product is authenticity verified.
      </div>
    </div>
  </footer>
);

export default Footer;
