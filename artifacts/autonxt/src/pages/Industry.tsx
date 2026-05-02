import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowRight, Zap, BatteryCharging, Activity,
  Factory, Building2, Hammer, Shield, PlaneTakeoff, Leaf,
  CheckCircle2, Clock, ChevronRight,
} from "lucide-react";
import tractor1 from "@assets/1_1777731255751.png";
import tractor2 from "@assets/2_1777731255751.png";

const industries = [
  {
    icon: Leaf,
    title: "Biomass",
    short: "BIO",
    desc: "Revolutionise biomass collection, processing, and transportation with zero emissions and low operating costs for a greener future.",
    detail: "AutoNxt Electric Tractors redefine efficiency in biomass operations. Designed for biomass collection, processing, and transportation, our tractors deliver reliability and sustainability in every cycle.",
    bg: "bg-lime-700",
    img: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=700&h=380&fit=crop&q=80&auto=format",
  },
  {
    icon: Building2,
    title: "Cement Manufacturing",
    short: "CEMENT",
    desc: "Optimise material handling, transportation, and site maintenance in cement plants — reducing downtime and enhancing productivity.",
    detail: "Experience the power of AutoNxt Electric Tractors in cement manufacturing. Our tractors optimise material handling, transportation, and site maintenance with zero emissions and advanced features.",
    bg: "bg-orange-700",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&h=380&fit=crop&q=80&auto=format",
  },
  {
    icon: Hammer,
    title: "Construction Industry",
    short: "CONST.",
    desc: "Unmatched versatility and power for site preparation, material handling, and equipment transportation — greener construction ahead.",
    detail: "AutoNxt Electric Tractors are the future of construction. With unmatched versatility and power, they excel in site preparation, material handling, and equipment transportation.",
    bg: "bg-yellow-700",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=700&h=380&fit=crop&q=80&auto=format",
  },
  {
    icon: Shield,
    title: "Defence",
    short: "DEF.",
    desc: "Superior performance and rugged durability for military logistics, base maintenance, and all-terrain operations with remote operation options.",
    detail: "AutoNxt Electric Tractors offer superior performance and rugged durability for defence applications. From logistics support to base maintenance, they excel in the most demanding military environments.",
    bg: "bg-slate-700",
    img: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=700&h=380&fit=crop&q=80&auto=format",
  },
  {
    icon: PlaneTakeoff,
    title: "Airport",
    short: "AIRPORT",
    desc: "From baggage handling to runway maintenance — zero-emission, autonomous-ready tractors for smoother, greener airport operations.",
    detail: "AutoNxt Electric Tractors redefine airport operations. From baggage handling to runway maintenance, our tractors offer zero emissions and advanced autonomous navigation features.",
    bg: "bg-sky-700",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&h=380&fit=crop&q=80&auto=format",
  },
  {
    icon: Factory,
    title: "Metal Manufacturing",
    short: "METAL",
    desc: "From material handling to logistics, our tractors streamline metal manufacturing operations while minimising environmental impact.",
    detail: "AutoNxt Electric Tractors redefine efficiency in metal manufacturing. From material handling to logistics, our tractors streamline operations while minimising environmental impact.",
    bg: "bg-slate-600",
    img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=700&h=380&fit=crop&q=80&auto=format",
  },
];

const tractors = [
  {
    img: tractor1,
    name: "AutoNxt X45H2",
    hp: "45HP",
    status: "available",
    statusLabel: "Available Now",
    desc: "A powerful 45HP tractor suitable for farming and construction. Perfect for a wide range of farming and haulage activities, matching the performance of traditional 35–55 HP diesel tractors.",
    specs: [
      { icon: Zap, label: "Motor", value: "32 kW" },
      { icon: BatteryCharging, label: "Battery", value: "38.4 kWh" },
      { icon: Activity, label: "Runtime", value: "8 hrs" },
    ],
    accentBg: "bg-primary/5",
    accentBorder: "border-primary/20",
    tagColor: "bg-emerald-500",
  },
  {
    img: tractor2,
    name: "AutoNxt X25H2",
    hp: "25HP",
    status: "upcoming",
    statusLabel: "Coming Soon",
    desc: "Compact 25HP tractor, ideal for small-scale agriculture and precision farming. Efficient, low-cost, and perfect for small and medium farms.",
    specs: [
      { icon: Zap, label: "Motor", value: "18 kW" },
      { icon: BatteryCharging, label: "Battery", value: "24 kWh" },
      { icon: Activity, label: "Runtime", value: "8 hrs" },
    ],
    accentBg: "bg-accent/5",
    accentBorder: "border-accent/20",
    tagColor: "bg-accent",
  },
  {
    img: tractor1,
    name: "AutoNxt X60H2",
    hp: "60HP",
    status: "upcoming",
    statusLabel: "Coming Soon",
    desc: "Heavy-duty 60HP tractor with advanced features for large-scale operations. A perfect balance of maximum power and zero-emission sustainability.",
    specs: [
      { icon: Zap, label: "Motor", value: "45 kW" },
      { icon: BatteryCharging, label: "Battery", value: "52 kWh" },
      { icon: Activity, label: "Runtime", value: "10 hrs" },
    ],
    accentBg: "bg-primary/5",
    accentBorder: "border-primary/20",
    tagColor: "bg-amber-500",
  },
];

export default function Industry() {
  return (
    <div className="w-full min-h-screen">

      {/* ── HERO ── */}
      <section className="bg-surface-dark relative overflow-hidden pt-28 pb-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,hsl(0,72%,40%,0.12),transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,hsl(214,65%,32%,0.10),transparent_55%)] pointer-events-none" />
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
                <span className="text-primary text-xs font-bold uppercase tracking-widest">Industrial Solutions</span>
              </motion.div>
              <motion.h1
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.06]"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              >
                Powering India's Most <span className="text-primary">Demanding</span> Industries.
              </motion.h1>
              <motion.p
                className="text-white/55 text-lg max-w-lg leading-relaxed mb-10"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
              >
                Electric tractor solutions built rugged, built zero-emission, built for India's most demanding environments.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}
              >
                {[
                  { icon: Building2, label: "Industries", value: "6+" },
                  { icon: Factory, label: "Applications", value: "50+" },
                  { icon: Shield, label: "Certified", value: "iCAT" },
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
                <div className="col-span-2 row-span-2 rounded-tl-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=700&h=500&fit=crop&q=80&auto=format" alt="Biomass operations" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-tr-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop&q=80&auto=format" alt="Cement plant" className="w-full h-full object-cover" />
                </div>
                <div className="overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=250&fit=crop&q=80&auto=format" alt="Construction site" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface-dark to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── OUR SOLUTIONS ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <motion.div
                className="flex items-center gap-3 mb-3"
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              >
                <div className="h-px w-10 bg-primary rounded-full" />
                <p className="text-primary font-bold text-sm uppercase tracking-widest">Our Solutions</p>
              </motion.div>
              <motion.h2
                className="font-display text-3xl md:text-4xl font-bold text-foreground"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              >
                Six Industries. One EV Platform.
              </motion.h2>
            </div>
            <motion.p
              className="text-muted-foreground max-w-sm lg:text-right"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            >
              AutoNxt electric tractors are built for constant workload across India's most demanding environments.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
            {industries.map((ind, i) => (
              <motion.div
                key={i}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 36, rotateX: 12 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ rotateY: 5, rotateX: -4, scale: 1.03, y: -8, transition: { type: "spring", stiffness: 300, damping: 22 } }}
                style={{ transformPerspective: 900, transformStyle: "preserve-3d" }}
              >
                {/* Photo header */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={ind.img}
                    alt={ind.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Icon badge */}
                  <div className={`absolute bottom-3 left-3 w-9 h-9 rounded-xl ${ind.bg} flex items-center justify-center shadow-lg`}>
                    <ind.icon className="w-4.5 h-4.5 text-white w-[18px] h-[18px]" />
                  </div>
                  {/* Short label */}
                  <span className="absolute top-3 right-3 text-[9px] font-bold text-white/80 tracking-widest uppercase bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
                    {ind.short}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{ind.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{ind.detail}</p>
                  <div className="mt-5 pt-4 border-t border-border">
                    <Link href="/book">
                      <button className="inline-flex items-center text-sm font-semibold text-primary hover:gap-2 gap-1 transition-all">
                        Learn More <ChevronRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR TRACTORS ── */}
      <section className="py-24 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <motion.div
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-5"
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            >
              <span className="text-primary text-xs font-bold uppercase tracking-widest">Our Tractors</span>
            </motion.div>
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              The Right Tractor for Every Job.
            </motion.h2>
            <motion.p
              className="text-muted-foreground max-w-xl mx-auto"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            >
              Choose from our growing lineup of electric tractors — purpose-built for industrial and agricultural work.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
            {tractors.map((t, i) => (
              <motion.div
                key={i}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 40, rotateX: 14 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ rotateY: i === 1 ? 0 : i === 0 ? 5 : -5, rotateX: -3, scale: 1.02, y: -10, transition: { type: "spring", stiffness: 280, damping: 22 } }}
                style={{ transformPerspective: 1000, transformStyle: "preserve-3d" }}
              >
                {/* Image area */}
                <div className={`relative ${t.accentBg} border-b ${t.accentBorder} p-8 flex items-center justify-center h-52`}>
                  {/* Status badge */}
                  <div className={`absolute top-4 left-4 inline-flex items-center gap-1.5 ${t.tagColor} text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm`}>
                    {t.status === "available"
                      ? <CheckCircle2 className="w-3 h-3" />
                      : <Clock className="w-3 h-3" />
                    }
                    {t.statusLabel}
                  </div>
                  {/* HP badge */}
                  <div className="absolute top-4 right-4 bg-foreground text-background text-xs font-black px-2.5 py-1 rounded-lg">
                    {t.hp}
                  </div>
                  <img
                    src={t.img}
                    alt={t.name}
                    className="h-36 object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Electric Tractor · {t.hp}</p>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{t.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{t.desc}</p>

                  {/* Spec chips */}
                  <div className="flex flex-wrap gap-2 mb-5 mt-auto">
                    {t.specs.map((s, si) => (
                      <div key={si} className="inline-flex items-center gap-1.5 bg-muted rounded-lg px-3 py-1.5 border border-border">
                        <s.icon className="w-3 h-3 text-primary shrink-0" />
                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{s.label}</span>
                        <span className="text-[11px] font-bold text-foreground">{s.value}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/product">
                    <Button
                      size="sm"
                      className={`w-full transition-all ${t.status === "available" ? "bg-primary text-white hover:bg-primary/90" : "bg-background border border-border text-muted-foreground hover:border-primary hover:text-primary"}`}
                    >
                      {t.status === "available" ? <>View Details <ArrowRight className="ml-1.5 w-3.5 h-3.5" /></> : "Notify Me When Available"}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0,72%,40%,0.12),transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <motion.h2
            className="font-display text-3xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            Don't see your sector?
          </motion.h2>
          <motion.p
            className="text-white/55 text-lg max-w-xl mx-auto mb-10"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          >
            Our platform is infinitely adaptable. Talk to our solutions team to explore a custom industrial partnership.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.18 }}
          >
            <Link href="/book">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 h-14 px-10 text-base font-semibold shadow-lg">
                Talk to Us <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
