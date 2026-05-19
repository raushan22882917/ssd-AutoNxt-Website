import { lazy, Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import {
  ArrowRight, Battery, Gauge, Zap, BatteryCharging, Activity, Clock,
  CheckCircle2, Box, ImageOff,
} from "lucide-react";
import { Link } from "wouter";

// Organized public image paths
const tractor1   = "/images/products/x45h2.png";
const tractor2   = "/images/products/x25h2.png";
const tractor3   = "/images/products/h55c2.png";
const batteryImg = "/images/products/battery.png";
const motorImg   = "/images/products/motor.png";
const fieldImg   = "/images/facility/right-wall.jpg";
const garageImg  = "/images/facility/garage-entry.jpg";
const wallImg    = "/images/facility/left-wall.jpg";
const ev1 = "/images/events/event-1.jpg";
const ev2 = "/images/events/event-2.jpg";
const ev3 = "/images/events/event-3.jpg";
const ev4 = "/images/events/event-4.jpg";
const ev5 = "/images/events/event-5.jpg";

const TractorViewer3D = lazy(() => import("@/components/TractorViewer3D"));

type Category = "all" | "tractors" | "attachments";

const tractors = [
  {
    slug: "x45h2",
    name: "X45H2",
    fullName: "AutoNxt X45H2",
    type: "45HP Electric Tractor",
    badge: "Flagship",
    badgeGrad: "from-primary to-red-700",
    status: "Available Now",
    image: tractor1,
    glb: "/tractor-model.glb",
    description: "Our flagship 45HP electric tractor with advanced battery technology and superior performance for large-scale agricultural operations.",
    specs: [
      { icon: Zap,             label: "Power",    value: "32 kW"    },
      { icon: BatteryCharging, label: "Battery",  value: "38.4 kWh" },
      { icon: Activity,        label: "Run Time", value: "8–10 hrs" },
      { icon: Clock,           label: "Charging", value: "4–6 hrs"  },
    ],
    cardGrad: "from-zinc-950 via-red-950/30 to-zinc-950",
    accentColor: "text-red-400",
    glowColor: "rgba(168,0,0,0.15)",
  },
  {
    slug: "x25h2",
    name: "X25H2",
    fullName: "AutoNxt X25H2",
    type: "25HP Compact Tractor",
    badge: "Best Value",
    badgeGrad: "from-accent to-blue-700",
    status: "Available Now",
    image: tractor2,
    glb: "/tractor-model-2.glb",
    description: "Compact 25HP electric tractor designed for small farms and specialized applications — agile, efficient, and built for precision.",
    specs: [
      { icon: Zap,             label: "Power",    value: "45 kW"    },
      { icon: BatteryCharging, label: "Battery",  value: "38.4 kWh" },
      { icon: Activity,        label: "Run Time", value: "6–8 hrs"  },
      { icon: Clock,           label: "Charging", value: "3–4 hrs"  },
    ],
    cardGrad: "from-zinc-950 via-blue-950/30 to-zinc-950",
    accentColor: "text-blue-400",
    glowColor: "rgba(30,64,175,0.15)",
  },
  {
    slug: "h55c2",
    name: "H55C2",
    fullName: "AutoNxt H55C2",
    type: "60HP Premium Tractor",
    badge: "Most Powerful",
    badgeGrad: "from-emerald-700 to-green-800",
    status: "Available Now",
    image: tractor3,
    glb: "/hitem3d-1.glb",
    description: "High-power 60HP electric tractor for commercial farming with extended liquid-cooled battery life and ultra-fast charging.",
    specs: [
      { icon: Zap,             label: "Power",    value: "45 kW"               },
      { icon: BatteryCharging, label: "Battery",  value: "66 kWh Liquid-Cool"  },
      { icon: Activity,        label: "Run Time", value: "10–12 hrs"           },
      { icon: Clock,           label: "Charging", value: "1.5 / 7 hrs"         },
    ],
    cardGrad: "from-zinc-950 via-emerald-950/30 to-zinc-950",
    accentColor: "text-emerald-400",
    glowColor: "rgba(5,150,105,0.15)",
  },
];

const attachments = [
  {
    slug: "bucket",
    name: "18 Ft Graber Bucket",
    type: "Implement",
    badge: "Heavy Duty",
    status: "Available Now",
    image: "/images/implement/bucket.png",
    description: "Heavy-duty 18 feet graber bucket for efficient material handling and excavation operations.",
  },
  {
    slug: "catcher",
    name: "18 Ft Catcher",
    type: "Implement",
    badge: "Precision",
    status: "Available Now",
    image: "/images/implement/cacher.png",
    description: "Precision-engineered 18 feet catcher for efficient material collection and harvesting.",
  },
  {
    slug: "loader",
    name: "18 Ft Loader Bucket",
    type: "Implement",
    badge: "Max Load",
    status: "Available Now",
    image: "/images/implement/loader.png",
    description: "Heavy-duty 18 feet loader bucket for maximum efficiency in loading and material transport.",
  },
];

const techSpecs = [
  { img: batteryImg, title: "LFP Battery Pack",  icon: Battery, desc: "High-density Lithium Iron Phosphate cells. 2,000+ charge cycles. IP67 waterproofed for decade-long farm life.", stat: "2,000+", statLabel: "Charge Cycles" },
  { img: motorImg,   title: "NXT-Drive Motor",    icon: Zap,     desc: "Axial flux permanent magnet motor. 96% peak efficiency. Instant torque delivery. India-manufactured with local service.", stat: "96%", statLabel: "Peak Efficiency" },
];

const FILTER_TABS: { id: Category; label: string }[] = [
  { id: "all",         label: "All Products"  },
  { id: "tractors",    label: "Tractors"      },
  { id: "attachments", label: "Implements"    },
];

export default function Product() {
  const [filter, setFilter] = useState<Category>("all");
  const [show3D, setShow3D] = useState<Record<string, boolean>>({});

  const toggle3D = (slug: string) =>
    setShow3D(prev => ({ ...prev, [slug]: !prev[slug] }));

  const showTractors    = filter === "all" || filter === "tractors";
  const showAttachments = filter === "all" || filter === "attachments";

  return (
    <div className="w-full min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="bg-zinc-950 relative overflow-hidden pt-24 pb-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_60%,hsl(0,72%,40%,0.10),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,hsl(214,65%,32%,0.07),transparent_50%)] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8 items-end">

            <div className="pb-16 pt-8">
              <motion.div
                className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-4 py-1.5 mb-6"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-xs font-bold uppercase tracking-widest">Electric Lineup 2025</span>
              </motion.div>
              <motion.h1
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-[1.04]"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              >
                Electric<br /><span className="text-primary">Tractors.</span>
              </motion.h1>
              <motion.p
                className="text-white/50 text-lg max-w-md leading-relaxed mb-10"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
              >
                Revolutionizing agriculture with sustainable, powerful, and efficient electric tractors — built for every farm, every terrain.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-5"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}
              >
                {[
                  { icon: Zap,     label: "HP Range", value: "25–60 HP"   },
                  { icon: Battery, label: "Charge",   value: "3–6 hrs"    },
                  { icon: Gauge,   label: "Models",   value: "3 Tractors" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5">
                    <f.icon className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-white/40 text-[9px] uppercase tracking-widest font-medium leading-none mb-0.5">{f.label}</p>
                      <p className="text-white font-bold text-sm leading-none">{f.value}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Hero 3D model */}
            <motion.div
              className="relative pb-0 hidden lg:block"
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="relative h-[640px]">
                <Suspense fallback={
                  <div className="flex items-center justify-center h-full">
                    <img src={tractor1} alt="AutoNxt X45H2" className="w-full max-w-md object-contain drop-shadow-[0_20px_60px_rgba(168,0,0,0.3)]" width={500} height={380} />
                  </div>
                }>
                  <TractorViewer3D
                    src="/hitem3d-1.glb"
                    fallbackSrc={tractor1}
                    className="w-full h-full"
                    rotate
                    showHint
                  />
                </Suspense>
                <motion.div
                  className="absolute top-16 left-0 bg-white/[0.07] backdrop-blur-md border border-white/[0.12] rounded-2xl px-5 py-3 z-10"
                  animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <p className="text-white/50 text-[9px] uppercase tracking-widest font-medium">Flagship Model</p>
                  <p className="text-white font-bold text-sm mt-0.5">X45H2 — 45HP</p>
                </motion.div>
                <motion.div
                  className="absolute top-36 right-4 bg-primary/10 backdrop-blur-md border border-primary/30 rounded-2xl px-4 py-2.5 z-10"
                  animate={{ y: [0, 6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <p className="text-primary text-[9px] uppercase tracking-widest font-medium">Zero Emissions</p>
                  <p className="text-white font-bold text-sm mt-0.5">100% Electric</p>
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FILTER + PRODUCTS ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">

          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-4"
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-primary text-xs font-bold uppercase tracking-widest">Our Products</span>
            </motion.div>
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              Explore the full range
            </motion.h2>
            <motion.p
              className="text-muted-foreground max-w-xl mx-auto"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            >
              From compact small-farm models to heavy-duty commercial powerhouses — with compatible implements for every task.
            </motion.p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  filter === tab.id
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TRACTORS */}
          <AnimatePresence>
            {showTractors && (
              <motion.div key="tractors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {tractors.map((t, i) => (
                    <motion.div
                      key={t.slug}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      <BackgroundGradient className="rounded-[20px] overflow-hidden">
                        <div className={`bg-gradient-to-br ${t.cardGrad} rounded-[18px] overflow-hidden`}>

                          {/* Image / 3D area */}
                          <div
                            className="relative flex items-center justify-center pt-8 pb-4 px-6 min-h-[192px]"
                            style={{ background: `radial-gradient(ellipse at 50% 100%, ${t.glowColor}, transparent 70%)` }}
                          >
                            <span className={`absolute top-4 left-4 z-10 text-[10px] font-bold text-white px-2.5 py-1 rounded-full bg-gradient-to-r ${t.badgeGrad} shadow-sm`}>
                              {t.badge}
                            </span>

                            {/* 3D toggle button */}
                            <button
                              onClick={() => toggle3D(t.slug)}
                              className={`absolute top-4 right-4 z-10 flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-full border transition-all ${
                                show3D[t.slug]
                                  ? "bg-white/20 border-white/40 text-white"
                                  : "bg-white/[0.07] border-white/20 text-white/60 hover:text-white hover:bg-white/15"
                              }`}
                            >
                              {show3D[t.slug]
                                ? <><ImageOff className="w-2.5 h-2.5" /> 2D</>
                                : <><Box className="w-2.5 h-2.5" /> 3D</>
                              }
                            </button>

                            {show3D[t.slug] ? (
                              <Suspense fallback={
                                <img src={t.image} alt={t.fullName} className="h-44 w-full object-contain" width={320} height={176} />
                              }>
                                <TractorViewer3D
                                  src={t.glb}
                                  fallbackSrc={t.image}
                                  className="w-full h-44"
                                  rotate
                                  showHint
                                />
                              </Suspense>
                            ) : (
                              <img
                                src={t.image}
                                alt={t.fullName}
                                loading="lazy"
                                decoding="async"
                                className="h-44 w-full object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-500"
                                width={320} height={176}
                              />
                            )}
                          </div>

                          {/* Content */}
                          <div className="px-6 pb-6 space-y-4">
                            <div>
                              <p className={`text-[10px] font-bold ${t.accentColor} uppercase tracking-widest mb-1`}>{t.type}</p>
                              <h3 className="font-display text-xl font-bold text-white">{t.fullName}</h3>
                              <p className="text-white/50 text-xs mt-1.5 leading-relaxed line-clamp-2">{t.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              {t.specs.map((s, si) => (
                                <div key={si} className="bg-white/[0.06] border border-white/[0.08] rounded-xl p-2.5 flex items-center gap-2">
                                  <s.icon className={`w-3 h-3 ${t.accentColor} shrink-0`} />
                                  <div>
                                    <p className="text-white/40 text-[8px] uppercase tracking-wide font-medium leading-none">{s.label}</p>
                                    <p className="text-white font-bold text-[11px] mt-0.5 leading-none">{s.value}</p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="flex gap-2 pt-1">
                              <Link href={`/product/${t.slug}`} className="flex-1">
                                <Button size="sm" className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold h-9">
                                  View Details <ArrowRight className="ml-1 w-3 h-3" />
                                </Button>
                              </Link>
                              <Link href="/book">
                                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white text-xs font-semibold h-9 px-4">
                                  Book
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </BackgroundGradient>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* IMPLEMENTS */}
          <AnimatePresence>
            {showAttachments && (
              <motion.div key="attachments" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest px-3">Implements & Attachments</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {attachments.map((a, i) => (
                    <motion.div
                      key={a.slug}
                      className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={a.image}
                          alt={a.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          width={400} height={176}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <span className="absolute bottom-3 left-3 text-[9px] font-bold text-white px-2 py-0.5 rounded-full bg-primary/80">{a.badge}</span>
                        <span className="absolute top-3 right-3 flex items-center gap-1 text-[9px] font-semibold text-emerald-400 bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5">
                          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                          {a.status}
                        </span>
                      </div>
                      <div className="p-5">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{a.type}</p>
                        <h3 className="font-display text-base font-bold text-foreground mb-2">{a.name}</h3>
                        <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-2">{a.description}</p>
                        <Link href={`/product/attachment/${a.slug}`}>
                          <Button size="sm" variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary hover:text-white text-xs h-8 font-semibold">
                            View Details <ArrowRight className="ml-1 w-3 h-3" />
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── TECH COMPONENTS ── */}
      <section className="py-20 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-14">
            <motion.div
              className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-4 py-1.5 mb-4"
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-primary text-xs font-bold uppercase tracking-widest">Core Technology</span>
            </motion.div>
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-white"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              Built Different.
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techSpecs.map((tech, i) => (
              <motion.div
                key={i}
                className="group relative bg-white/[0.04] border border-white/[0.09] rounded-2xl p-8 flex gap-7 items-start hover:border-primary/30 hover:bg-white/[0.06] transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="shrink-0 w-28 h-28 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center p-4 group-hover:border-primary/30 transition-colors">
                  <img src={tech.img} alt={tech.title} loading="lazy" decoding="async" className="w-full h-full object-contain" width={80} height={80} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <tech.icon className="w-4 h-4 text-primary" />
                    <h3 className="font-display text-lg font-bold text-white">{tech.title}</h3>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{tech.desc}</p>
                  <div className="inline-flex items-baseline gap-1.5 bg-primary/10 border border-primary/20 rounded-xl px-4 py-2">
                    <span className="font-display text-2xl font-bold text-primary">{tech.stat}</span>
                    <span className="text-white/50 text-xs font-medium">{tech.statLabel}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENT GALLERY STRIP ── */}
      <section className="py-16 bg-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 mb-8">
          <div className="flex items-end justify-between">
            <div>
              <motion.p
                className="text-primary text-xs font-bold uppercase tracking-widest mb-2"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              >
                June 2025 · Handover Ceremony
              </motion.p>
              <motion.h2
                className="font-display text-2xl md:text-3xl font-bold text-foreground"
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              >
                Tractors in the Field.
              </motion.h2>
            </div>
            <Link href="/gallery">
              <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:border-primary hover:text-primary text-xs">
                View Gallery <ArrowRight className="ml-1 w-3 h-3" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto px-4 md:px-8 pb-4 scrollbar-none">
          {[ev1, ev2, ev3, ev4, ev5].map((img, i) => (
            <motion.div
              key={i}
              className="shrink-0 w-64 h-44 rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-colors"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <img
                src={img}
                alt={`AutoNxt Event ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                width={256} height={176}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURE HIGHLIGHTS ── */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: CheckCircle2, title: "Zero Emissions",   desc: "100% electric drivetrain"          },
              { icon: Zap,          title: "Instant Torque",   desc: "From zero RPM on every terrain"    },
              { icon: Battery,      title: "Solar Compatible", desc: "Charge directly from solar panels" },
              { icon: Gauge,        title: "5-Year Warranty",  desc: "Backed by India service network"   },
            ].map((feat, i) => (
              <motion.div
                key={i}
                className="text-center p-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
                  <feat.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="font-display font-bold text-foreground text-sm mb-1">{feat.title}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FIELD CTA ── */}
      <motion.section
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <img
          src={fieldImg}
          alt="AutoNxt in the Field"
          loading="lazy"
          decoding="async"
          className="w-full h-80 object-cover object-center"
          width={1280} height={320}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center px-8 md:px-16">
          <div className="max-w-lg">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Experience AutoNxt</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Ready to Power the Fields?
            </h2>
            <div className="flex gap-3 flex-wrap">
              <Link href="/book">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold shadow-lg shadow-primary/25">
                  Schedule a Test Drive <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/industry">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold">
                  See Industries
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
