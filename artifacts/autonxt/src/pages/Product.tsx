import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Battery, Gauge, Zap } from "lucide-react";
import { Link } from "wouter";

import tractor1 from "@assets/1_1777731255751.png";
import tractor2 from "@assets/2_1777731255751.png";
import batteryImg from "@assets/battery_1777731255752.png";
import motorImg from "@assets/motor_1777731255752.png";
import fieldImg from "@assets/8.RightSideGateWall_1777731255752.jpg";

const products = [
  {
    name: "Autonxt X45H2",
    type: "45HP Electric Tractor",
    badge: "Flagship",
    badgeColor: "bg-primary",
    image: tractor1,
    description:
      "Our premium 45HP electric tractor built for heavy-duty agricultural work. Designed for large farms and commercial operations — zero diesel, maximum output.",
    specs: [
      { label: "Motor Power", value: "45 HP" },
      { label: "Range / Charge", value: "10+ hrs" },
      { label: "Charge Time", value: "4 hrs" },
      { label: "Max Torque", value: "280 Nm" },
      { label: "Implement Rating", value: "3-Point", },
      { label: "Warranty", value: "5 Years" },
    ],
    features: ["AI-assisted load management", "Remote fleet tracking", "Solar charging compatible", "OTA software updates"],
  },
  {
    name: "Autonxt X25H4",
    type: "25HP Electric Tractor",
    badge: "Best Value",
    badgeColor: "bg-accent",
    image: tractor2,
    description:
      "The ideal entry-level electric tractor for small and medium farms. Compact, lightweight, and incredibly efficient — proven across India's diverse agricultural terrain.",
    specs: [
      { label: "Motor Power", value: "25 HP" },
      { label: "Range / Charge", value: "8+ hrs" },
      { label: "Charge Time", value: "3 hrs" },
      { label: "Max Torque", value: "160 Nm" },
      { label: "Weight", value: "1,400 kg" },
      { label: "Warranty", value: "5 Years" },
    ],
    features: ["Lightweight chassis", "Precision agriculture ready", "Solar charging compatible", "Easy-service design"],
  },
];

export default function Product() {
  return (
    <div className="w-full min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="bg-surface-dark relative overflow-hidden pt-28 pb-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,hsl(0,72%,40%,0.12),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,hsl(214,65%,32%,0.09),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(hsl(0,0%,100%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,0%,100%) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div className="pb-16">
              <motion.div
                className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-4 py-1.5 mb-6"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-xs font-bold uppercase tracking-widest">Electric Lineup</span>
              </motion.div>
              <motion.h1
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.06]"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              >
                The <span className="text-primary">Lineup.</span>
              </motion.h1>
              <motion.p
                className="text-white/55 text-lg max-w-lg leading-relaxed mb-10"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
              >
                India's most advanced electric tractors — engineered for every farm size, every terrain, every season.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}
              >
                {[
                  { icon: Zap, label: "HP Range", value: "25–60 HP" },
                  { icon: Battery, label: "Charge Time", value: "3–4 hrs" },
                  { icon: Gauge, label: "Variants", value: "3 Models" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center">
                      <f.icon className="w-4 h-4 text-white/60" />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest font-medium">{f.label}</p>
                      <p className="text-white font-bold text-sm">{f.value}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div
              className="relative pb-0 hidden lg:block"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            >
              <div className="grid grid-cols-3 gap-2 h-[420px]">
                <div className="col-span-2 row-span-2 rounded-tl-2xl overflow-hidden bg-white/[0.04] flex items-center justify-center">
                  <img src={tractor1} alt="AutoNxt X45H2" className="w-full h-full object-contain p-8" />
                </div>
                <div className="rounded-tr-2xl overflow-hidden">
                  <img src={fieldImg} alt="AutoNxt in the field" className="w-full h-full object-cover" />
                </div>
                <div className="overflow-hidden bg-white/[0.04] flex items-center justify-center">
                  <img src={tractor2} alt="AutoNxt X25H4" className="w-full h-full object-contain p-3" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface-dark to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="py-20">
        <div className="container mx-auto px-4 md:px-8">

        {/* Product List */}
        <div className="space-y-24 mb-24">
          {products.map((product, index) => (
            <motion.div
              key={index}
              className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              data-testid={`product-card-${index}`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative bg-muted/30 rounded-2xl border border-border p-10 flex items-center justify-center group hover:border-primary/40 transition-colors">
                  <span className={`absolute top-5 left-5 text-xs font-bold text-white px-3 py-1.5 rounded-full ${product.badgeColor}`}>{product.badge}</span>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full max-w-sm object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-7">
                <div>
                  <span className="text-primary font-semibold tracking-widest uppercase text-xs block mb-2">{product.type}</span>
                  <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">{product.name}</h2>
                  <p className="text-muted-foreground text-lg">{product.description}</p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-3 text-center hover:border-primary/30 transition-colors">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{spec.label}</p>
                      <p className="text-base font-bold text-foreground">{spec.value}</p>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <ul className="space-y-2.5">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-3 pt-2">
                  <Link href="/book">
                    <Button className="bg-primary text-white hover:bg-primary/90 font-semibold" data-testid={`btn-reserve-${index}`}>
                      Reserve Now
                    </Button>
                  </Link>
                  <Link href="/book">
                    <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white font-semibold">
                      Book Test Drive
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {[
            { img: batteryImg, title: "LFP Battery Pack", desc: "High-density Lithium Iron Phosphate cells. 2,000+ charge cycles. IP67 waterproofed. Designed for decade-long farm life.", icon: Battery },
            { img: motorImg, title: "NXT-Drive Motor", desc: "Axial flux permanent magnet motor. 96% peak efficiency. Instant torque delivery. India-manufactured with local service network.", icon: Zap },
          ].map((tech, i) => (
            <motion.div
              key={i}
              className="bg-card border border-border rounded-2xl p-8 flex gap-6 items-start hover:border-primary/30 hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="shrink-0 w-24 h-24 rounded-xl bg-muted/40 flex items-center justify-center border border-border p-3">
                <img src={tech.img} alt={tech.title} className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <tech.icon className="w-4 h-4 text-primary" />
                  <h3 className="font-display text-lg font-bold text-foreground">{tech.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{tech.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Field CTA */}
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <img src={fieldImg} alt="Autonxt in the Field" className="w-full h-72 object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          <div className="absolute inset-0 flex items-center px-10 md:px-16">
            <div className="max-w-lg">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Ready to experience it?</h2>
              <Link href="/book">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold">
                  Schedule a Test Drive <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        </div>
      </div>
    </div>
  );
}
