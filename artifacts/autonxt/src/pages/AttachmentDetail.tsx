import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowRight, ArrowLeft, CheckCircle2, Settings, Wrench, Shield,
  Weight, Gauge, Package,
} from "lucide-react";
import fieldImg  from "@assets/8.RightSideGateWall_1777731255752.jpg";
import wallImg   from "@assets/7.LeftSideGateWall_1777731255752.jpg";
import garageImg from "@assets/3._Garage_Entry_–_After_Gate_1777731255751.jpg";
import ev1 from "@assets/IMG-20250630-WA0001_1777739120122.jpg";
import ev2 from "@assets/IMG-20250630-WA0003_1777739120122.jpg";

const ATTACHMENTS: Record<string, {
  name: string;
  type: string;
  badge: string;
  tagline: string;
  desc: string;
  image: string;
  heroImage: string;
  specs: { label: string; value: string; icon: React.ElementType }[];
  features: { icon: React.ElementType; title: string; desc: string }[];
  compatibility: string[];
  highlights: string[];
}> = {
  "graber-bucket": {
    name: "18 Ft Graber Bucket",
    type: "Heavy-Duty Implement",
    badge: "Heavy Duty",
    tagline: "Maximum Digging Power for Any Terrain",
    desc: "The AutoNxt 18 Ft Graber Bucket is engineered for heavy-duty excavation and material handling. Designed to attach seamlessly to all AutoNxt electric tractors via the standard 3-point hitch, it delivers precision digging with zero emissions powering the hydraulic system.",
    image: fieldImg,
    heroImage: fieldImg,
    specs: [
      { label: "Width",              value: "18 Feet (5.5m)",       icon: Gauge    },
      { label: "Capacity",           value: "0.8 m³",               icon: Package  },
      { label: "Material",           value: "Hardox 450 Steel",     icon: Shield   },
      { label: "Weight",             value: "480 kg",               icon: Weight   },
      { label: "Hitch Type",         value: "3-Point Cat II/III",   icon: Settings },
      { label: "Hydraulic",          value: "Standard Flow",        icon: Wrench   },
    ],
    features: [
      { icon: Shield,   title: "Hardox 450 Steel",        desc: "Wear-resistant steel construction rated for rocky and abrasive soils — outlasts standard mild-steel buckets by 4–5x in operational life." },
      { icon: Settings, title: "Universal 3-Point Hitch", desc: "Compatible with all AutoNxt electric tractors and most standard diesel tractors — Cat II and Cat III hitch compatible." },
      { icon: Wrench,   title: "Quick-Release Teeth",     desc: "Replaceable hardened teeth with pin-and-clip system — field-replaceable in under 10 minutes without specialist tools." },
      { icon: Gauge,    title: "Optimised Geometry",      desc: "Bucket profile designed for maximum fill factor and clean break-out force — reducing cycle time and operator fatigue." },
    ],
    compatibility: [
      "AutoNxt X45H2 — Full compatibility",
      "AutoNxt H55C2 — Full compatibility",
      "AutoNxt X25H2 — Compatible (standard soil)",
      "Most 3-Point Cat II/III diesel tractors",
    ],
    highlights: [
      "Hardox 450 construction — extreme wear resistance",
      "18 ft wide for maximum coverage per pass",
      "Standard 3-point hitch — fits all AutoNxt models",
      "Replaceable teeth — field-serviceable in minutes",
      "Zero-emission operation when paired with AutoNxt tractors",
      "Available now — ships from Thane, Maharashtra",
    ],
  },
  "catcher": {
    name: "18 Ft Catcher",
    type: "Precision Implement",
    badge: "Precision",
    tagline: "Efficient Collection for Every Crop",
    desc: "The AutoNxt 18 Ft Catcher is built for efficient material collection across a wide range of crops and applications. Featuring an advanced hydraulic-controlled gathering system, it pairs with any AutoNxt electric tractor to deliver clean, precise collection with zero diesel emissions.",
    image: wallImg,
    heroImage: wallImg,
    specs: [
      { label: "Working Width",  value: "18 Feet (5.5m)",       icon: Gauge    },
      { label: "Gathering Speed", value: "Up to 8 km/h",        icon: Settings },
      { label: "Material",       value: "High-Strength Steel",  icon: Shield   },
      { label: "Weight",         value: "390 kg",               icon: Weight   },
      { label: "Hitch Type",     value: "3-Point Cat I/II/III", icon: Settings },
      { label: "Hydraulic",      value: "Single/Double Acting", icon: Wrench   },
    ],
    features: [
      { icon: Gauge,    title: "Adjustable Gathering Height",  desc: "Hydraulic height control allows precise collection at any crop height — from ground-level root crops to standing grain." },
      { icon: Settings, title: "Wide 18 Ft Working Width",    desc: "Reduce passes per field with the widest catcher in AutoNxt's implement range — maximising efficiency on large plots." },
      { icon: Shield,   title: "All-Crop Compatibility",      desc: "Designed for wheat, paddy, sugarcane, fodder grass, and horticultural crops — one implement for your full crop rotation." },
      { icon: Wrench,   title: "Low-Maintenance Design",      desc: "Sealed bearings and galvanised tine assembly — designed for the Indian monsoon season with minimal annual upkeep." },
    ],
    compatibility: [
      "AutoNxt X45H2 — Full compatibility",
      "AutoNxt H55C2 — Full compatibility",
      "AutoNxt X25H2 — Full compatibility",
      "Standard 3-Point Cat I/II/III tractors",
    ],
    highlights: [
      "18 ft wide — minimum passes, maximum coverage",
      "Hydraulic height control — precise crop collection",
      "Sealed bearings — monsoon season ready",
      "Compatible with all three AutoNxt tractor models",
      "All-crop design — wheat, paddy, sugarcane, horticulture",
      "Available now",
    ],
  },
  "loader-bucket": {
    name: "18 Ft Loader Bucket",
    type: "Heavy-Duty Implement",
    badge: "Max Load",
    tagline: "Built for Maximum Loading Capacity",
    desc: "The AutoNxt 18 Ft Loader Bucket is engineered for maximum material loading efficiency. With a reinforced scoop profile and heavy-duty hitch system, it transforms any AutoNxt electric tractor into a powerful front-end loader for farm, construction, and logistics operations.",
    image: garageImg,
    heroImage: garageImg,
    specs: [
      { label: "Width",          value: "18 Feet (5.5m)",     icon: Gauge    },
      { label: "Heaped Capacity", value: "1.2 m³",            icon: Package  },
      { label: "Material",       value: "Hardox 400 Steel",   icon: Shield   },
      { label: "Weight",         value: "520 kg",             icon: Weight   },
      { label: "Hitch Type",     value: "3-Point Cat II/III", icon: Settings },
      { label: "Lift Height",    value: "Up to 3.2m",         icon: Gauge    },
    ],
    features: [
      { icon: Package,  title: "1.2 m³ Heaped Capacity",     desc: "Industry-leading heaped capacity for the 18 ft width class — fewer loads per cycle, faster operation, reduced fatigue." },
      { icon: Shield,   title: "Reinforced Cutting Edge",    desc: "Bolt-on reversible cutting edge in Hardox 400 — field-replaceable when worn, extending bucket life by years." },
      { icon: Settings, title: "Hydraulic Tilt Control",     desc: "Full hydraulic tilt for precise material placement — ideal for loading trucks, hoppers, and material handling at height." },
      { icon: Wrench,   title: "Spill Guard Design",         desc: "Integrated side boards prevent material spill during transit — especially important for loose grain, sand, and fertiliser." },
    ],
    compatibility: [
      "AutoNxt X45H2 — Full compatibility",
      "AutoNxt H55C2 — Full compatibility (recommended)",
      "AutoNxt X25H2 — Light material loads only",
      "3-Point Cat II/III diesel tractors",
    ],
    highlights: [
      "1.2 m³ heaped capacity — maximum per-load efficiency",
      "Reversible Hardox 400 cutting edge — field replaceable",
      "Hydraulic tilt for precise placement at height",
      "Spill-guard side boards included",
      "Best paired with X45H2 or H55C2 for full capacity",
      "Available now — ships from Thane, Maharashtra",
    ],
  },
};

export default function AttachmentDetail({ params }: { params: { slug: string } }) {
  const att = ATTACHMENTS[params?.slug ?? ""];

  if (!att) {
    return (
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Implement not found</h1>
          <Link href="/product"><Button>← Back to Products</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="bg-zinc-950 relative overflow-hidden pt-24 pb-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_60%,hsl(0,72%,40%,0.10),transparent_50%)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <Link href="/product" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Products
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-16">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-bold text-white px-3 py-1.5 rounded-full bg-primary">{att.badge}</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-400/15 border border-emerald-400/30 px-3 py-1.5 rounded-full">Available Now</span>
              </div>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">{att.type}</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">{att.name}</h1>
              <p className="text-white/60 font-semibold text-lg mb-5">{att.tagline}</p>
              <p className="text-white/50 text-base leading-relaxed mb-8 max-w-lg">{att.desc}</p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/book">
                  <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold h-12 px-7">
                    Request Quote <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/book">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-12 px-7">
                    Book Demo
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Hero image */}
            <motion.div
              className="relative w-full h-[400px] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            >
              <img
                src={att.heroImage}
                alt={att.name}
                className="w-full h-full object-cover"
                width={640} height={400}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-zinc-950/40" />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS BAR ── */}
      <section className="py-10 bg-primary/5 border-b border-primary/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {att.highlights.map((h, i) => (
              <motion.div key={i} className="flex items-start gap-2"
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground text-xs leading-snug font-medium">{h}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECS ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <motion.div className="flex items-center justify-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">Specifications</p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
            <motion.h2 className="font-display text-3xl font-bold text-foreground" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Technical Details
            </motion.h2>
          </div>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            {att.specs.map((spec, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors text-center">
                <spec.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{spec.label}</p>
                <p className="font-bold text-foreground text-sm">{spec.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <motion.div className="flex items-center justify-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">Key Features</p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
            <motion.h2 className="font-display text-3xl font-bold text-foreground" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Why Choose This Implement
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {att.features.map((f, i) => (
              <motion.div key={i} className="bg-card border border-border rounded-2xl p-7 hover:border-primary/30 hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPATIBILITY ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div className="flex items-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <div className="h-px w-10 bg-primary rounded-full" />
                <p className="text-primary font-bold text-sm uppercase tracking-widest">Compatibility</p>
              </motion.div>
              <motion.h2 className="font-display text-3xl font-bold text-foreground mb-6" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                Works With
              </motion.h2>
              <ul className="space-y-3">
                {att.compatibility.map((c, i) => (
                  <motion.li key={i} className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-foreground text-sm">{c}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[ev1, ev2].map((img, i) => (
                <motion.div key={i} className="rounded-2xl overflow-hidden border border-border h-40"
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <img src={img} alt={`AutoNxt in action ${i + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover" width={300} height={160} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0,72%,30%,0.5),transparent_65%)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <motion.div className="max-w-xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Get the {att.name}</h2>
            <p className="text-white/75 text-lg mb-10">
              Contact our team for a custom quote, delivery schedule, and compatibility consultation for your AutoNxt tractor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 h-12">
                  Request Quote <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/product">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold px-8 h-12">
                  View All Products
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
