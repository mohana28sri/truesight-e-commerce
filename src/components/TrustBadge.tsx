import { ShieldCheck, RotateCcw, Eye, Award } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: ShieldCheck, title: "Authenticity Verified", desc: "Every product is verified before shipping" },
  { icon: Eye, title: "What You See Is What You Get", desc: "High-res images of the exact product" },
  { icon: RotateCcw, title: "Easy Returns", desc: "Return if product doesn't match listing" },
  { icon: Award, title: "Premium Quality", desc: "Only curated, top-quality products" },
];

const TrustBadge = () => (
  <section className="py-16 bg-secondary">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-4 p-6 bg-card rounded-xl shadow-card"
          >
            <div className="bg-accent/10 p-3 rounded-lg shrink-0">
              <f.icon className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground text-sm">{f.title}</h3>
              <p className="text-muted-foreground text-xs mt-1">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBadge;
