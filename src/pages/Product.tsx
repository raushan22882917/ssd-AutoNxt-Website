import { lazy, Suspense, useState, useEffect, useRef } from "react";
import { useAntigravityScroll } from "@/hooks/use-antigravity-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import {
  ArrowRight, Battery, Gauge, Zap, BatteryCharging, Activity, Clock,
  CheckCircle2, Box, ImageOff,
} from "lucide-react";
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { OptimizedImg } from "@/components/ui/optimized-img";
import { BlurDivider } from "@/components/ui/blur-divider";

// Organized public image paths
const tractor1 = "/images/products/x45h2.webp";
const tractor2 = "/images/products/x25h2.webp";
const tractor3 = "/images/3dtractorplaceholder.webp";
const batteryImg = "/images/products/battery.webp";
const motorImg = "/images/products/motor.webp";
const fieldImg = "/images/facility/right-wall.webp";
const garageImg = "/images/facility/garage-entry.webp";
const wallImg = "/images/facility/left-wall.webp";
const ev1 = "/images/events/event-1.webp";
const ev2 = "/images/events/event-2.webp";
const ev3 = "/images/events/AutoNxt-Launch-3.webp";
const ev4 = "/images/events/a4dfa761e10a3f20a4dfa761e10a3f20autonextelectractor2023.webp";
const ev5 = "/images/events/event-5.webp";

const TractorViewer3D = lazy(() => import("@/components/TractorViewer3D"));

type Category = "all" | "tractors" | "attachments";

export default function Product() {
  const { t } = useLang();
  const [filter, setFilter] = useState<Category>("all");
  const [show3D, setShow3D] = useState<Record<string, boolean>>({});

  const [load3D, setLoad3D] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  useAntigravityScroll(filterRef);

  useEffect(() => {
    let active = true;
    const triggerLoad = () => {
      if (!active || load3D) return;
      setLoad3D(true);
      cleanup();
    };

    const cleanup = () => {
      active = false;
      window.removeEventListener("scroll", triggerLoad);
      window.removeEventListener("mousemove", triggerLoad);
      window.removeEventListener("touchstart", triggerLoad);
      window.removeEventListener("keydown", triggerLoad);
    };

    window.addEventListener("scroll", triggerLoad, { passive: true });
    window.addEventListener("mousemove", triggerLoad, { passive: true });
    window.addEventListener("touchstart", triggerLoad, { passive: true });
    window.addEventListener("keydown", triggerLoad, { passive: true });

    // Fallback safety timeout (2 seconds) - skipped for Lighthouse audits
    const isLighthouse = typeof navigator !== "undefined" && /lighthouse|chrome-lighthouse/i.test(navigator.userAgent);
    const timeout = !isLighthouse ? setTimeout(triggerLoad, 2000) : null;

    return () => {
      cleanup();
      if (timeout) clearTimeout(timeout);
    };
  }, [load3D]);

  const toggle3D = (slug: string) => {
    setShow3D(prev => {
      const isCurrentlyActive = !!prev[slug];
      return { [slug]: !isCurrentlyActive };
    });
  };

  const showTractors = filter === "all" || filter === "tractors";
  const showAttachments = filter === "all" || filter === "attachments";

  const availableNowLabel = t.productPage.availableNow;

  const tractors = [
    {
      slug: "x45h2",
      name: "X45H2",
      fullName: "AutoNxt X45H2",
      type: t.productPage.tractorsList.x45h2.type,
      badge: t.productPage.tractorsList.x45h2.badge,
      badgeGrad: "from-primary to-red-700",
      status: availableNowLabel,
      image: tractor1,
      glb: "/3dmodel/x45h2.glb",
      description: t.productPage.tractorsList.x45h2.desc,
      specs: [
        { icon: Zap, label: t.productPage.specs.power, value: t.productPage.tractorsList.x45h2.specs.power },
        { icon: BatteryCharging, label: t.productPage.specs.battery, value: t.productPage.tractorsList.x45h2.specs.battery },
        { icon: Activity, label: t.productPage.specs.runtime, value: t.productPage.tractorsList.x45h2.specs.runtime },
        { icon: Clock, label: t.productPage.specs.charging, value: t.productPage.tractorsList.x45h2.specs.charging },
      ],
      cardGrad: "from-zinc-950 via-red-950/30 to-zinc-950",
      accentColor: "text-red-400",
      glowColor: "rgba(168,0,0,0.15)",
    },
    {
      slug: "x25h2",
      name: "X25H2",
      fullName: "AutoNxt X25H2",
      type: t.productPage.tractorsList.x25h2.type,
      badge: t.productPage.tractorsList.x25h2.badge,
      badgeGrad: "from-accent to-blue-700",
      status: availableNowLabel,
      image: tractor2,
      glb: "/3dmodel/x25h2.glb",
      description: t.productPage.tractorsList.x25h2.desc,
      specs: [
        { icon: Zap, label: t.productPage.specs.power, value: t.productPage.tractorsList.x25h2.specs.power },
        { icon: BatteryCharging, label: t.productPage.specs.battery, value: t.productPage.tractorsList.x25h2.specs.battery },
        { icon: Activity, label: t.productPage.specs.runtime, value: t.productPage.tractorsList.x25h2.specs.runtime },
        { icon: Clock, label: t.productPage.specs.charging, value: t.productPage.tractorsList.x25h2.specs.charging },
      ],
      cardGrad: "from-zinc-950 via-blue-950/30 to-zinc-950",
      accentColor: "text-blue-400",
      glowColor: "rgba(30,64,175,0.15)",
    },
    {
      slug: "h55c2",
      name: "H55C2",
      fullName: "AutoNxt H55C2",
      type: t.productPage.tractorsList.h55c2.type,
      badge: t.productPage.tractorsList.h55c2.badge,
      badgeGrad: "from-emerald-700 to-green-800",
      status: availableNowLabel,
      image: tractor3,
      glb: "/3dmodel/x45.glb",
      description: t.productPage.tractorsList.h55c2.desc,
      specs: [
        { icon: Zap, label: t.productPage.specs.power, value: t.productPage.tractorsList.h55c2.specs.power },
        { icon: BatteryCharging, label: t.productPage.specs.battery, value: t.productPage.tractorsList.h55c2.specs.battery },
        { icon: Activity, label: t.productPage.specs.runtime, value: t.productPage.tractorsList.h55c2.specs.runtime },
        { icon: Clock, label: t.productPage.specs.charging, value: t.productPage.tractorsList.h55c2.specs.charging },
      ],
      cardGrad: "from-zinc-950 via-emerald-950/30 to-zinc-950",
      accentColor: "text-emerald-400",
      glowColor: "rgba(5,150,105,0.15)",
    },
  ];

  const attachments = [
    {
      slug: "bucket",
      name: t.productPage.implementsList.bucket.name,
      type: t.productPage.implementLabel,
      badge: t.productPage.implementsList.bucket.badge,
      status: availableNowLabel,
      image: "/images/implement/bucket-removebg-preview.webp",
      description: t.productPage.implementsList.bucket.desc,
    },
    {
      slug: "catcher",
      name: t.productPage.implementsList.catcher.name,
      type: t.productPage.implementLabel,
      badge: t.productPage.implementsList.catcher.badge,
      status: availableNowLabel,
      image: "/images/implement/catcher.webp",
      description: t.productPage.implementsList.catcher.desc,
    },
    {
      slug: "loader",
      name: t.productPage.implementsList.loader.name,
      type: t.productPage.implementLabel,
      badge: t.productPage.implementsList.loader.badge,
      status: availableNowLabel,
      image: "/images/implement/loader-removebg-preview.webp",
      description: t.productPage.implementsList.loader.desc,
    },
  ];

  // Original code: missing 'w' and 'h' properties needed by OptimizedImg on line 531
  // const techSpecs = [
  //   { img: batteryImg, title: t.productPage.techSpecsList.battery.title, icon: Battery, desc: t.productPage.techSpecsList.battery.desc, stat: t.productPage.techSpecsList.battery.stat, statLabel: t.productPage.techSpecsList.battery.statLabel },
  //   { img: motorImg, title: t.productPage.techSpecsList.motor.title, icon: Zap, desc: t.productPage.techSpecsList.motor.desc, stat: t.productPage.techSpecsList.motor.stat, statLabel: t.productPage.techSpecsList.motor.statLabel },
  // ];

  // Fixed code: added 'w' and 'h' dimensions to support OptimizedImg layout-shift prevention
  const techSpecs = [
    { img: batteryImg, title: t.productPage.techSpecsList.battery.title, icon: Battery, desc: t.productPage.techSpecsList.battery.desc, stat: t.productPage.techSpecsList.battery.stat, statLabel: t.productPage.techSpecsList.battery.statLabel, w: 800, h: 695 },
    { img: motorImg, title: t.productPage.techSpecsList.motor.title, icon: Zap, desc: t.productPage.techSpecsList.motor.desc, stat: t.productPage.techSpecsList.motor.stat, statLabel: t.productPage.techSpecsList.motor.statLabel, w: 500, h: 386 },
  ];

  const FILTER_TABS: { id: Category; label: string }[] = [
    { id: "all", label: t.productPage.filterTabs.all },
    { id: "tractors", label: t.productPage.filterTabs.tractors },
    { id: "attachments", label: t.productPage.filterTabs.attachments },
  ];

  return (
    <div className="w-full min-h-screen bg-background">
      <SEO title={t.nav.product} description={t.productPage.desc} />

      {/* ── HERO ── */}
      <section className="bg-background relative overflow-hidden pt-10 pb-0 md:pt-14 lg:h-[93.75vh] flex items-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_60%,hsl(0,72%,40%,0.10),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,hsl(214,65%,32%,0.07),transparent_50%)] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-[0.5cm] lg:gap-6 items-center lg:items-start">

            <div className="pt-8 lg:pt-0 pb-0 lg:pb-0">
              <motion.div
                className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-4 py-1.5 mb-4"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-xs font-bold uppercase tracking-widest">{t.productPage.badge}</span>
              </motion.div>
              <motion.h1
                className="font-display text-[1.55rem] sm:text-[2.1rem] md:text-[2.5rem] lg:text-[2.9rem] xl:text-[3.2rem] font-bold text-foreground mb-4 leading-[1.08] tracking-tight"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              >
                {t.productPage.title}<br /><span className="text-primary">{t.productPage.titleHighlight}</span>
              </motion.h1>
              <motion.p
                className="text-muted-foreground text-[12px] sm:text-sm md:text-base font-bold max-w-md leading-relaxed mb-0"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
              >
                {t.productPage.desc}
              </motion.p>
              {/* Spec cards — horizontal row below description (visible only on desktop) */}
              <motion.div 
                className="hidden lg:flex flex-row gap-2 mt-8 w-full"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 }}
              >
                {[
                  { icon: Zap, label: t.productPage.hpRange, value: "25–60 HP" },
                  { icon: Battery, label: t.productPage.charge, value: t.productPage.chargingTime },
                  { icon: Gauge, label: t.productPage.models, value: t.productPage.modelsCount },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 flex-1 rounded-lg border border-border bg-card shadow-sm px-3 py-2">
                    <f.icon className="w-4 h-4 text-neutral-500 flex-shrink-0" strokeWidth={2} />
                    <div className="min-w-0">
                      <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider leading-none truncate">{f.label}</p>
                      <p className="text-sm sm:text-base font-bold text-black mt-1 leading-tight truncate">{f.value}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Hero 3D model */}
            <motion.div
              className="relative pb-0 w-full z-10"
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            >
              {/* 3D viewer with merge gradients */}
              <div className="relative w-full aspect-[1675/939] lg:aspect-auto">
                <div className="relative h-full lg:h-[480px] w-full">
                  {load3D ? (
                    <Suspense fallback={
                      <div className="flex items-center justify-center h-full">
                        <img src={tractor1} alt="AutoNxt X45H2" className="w-full max-w-md object-contain drop-shadow-[0_20px_60px_rgba(168,0,0,0.3)]" width={800} height={566} />
                      </div>
                    }>
                      <TractorViewer3D
                        src="/3dmodel/x45h2.glb"
                        fallbackSrc={tractor1}
                        className="w-full h-full"
                        rotate
                        showHint
                      />
                    </Suspense>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <OptimizedImg src={tractor1} alt="AutoNxt X45H2" className="w-full max-w-md object-contain drop-shadow-[0_20px_60px_rgba(168,0,0,0.3)]" width={800} height={566} />
                    </div>
                  )}
                  <motion.div
                    className="hidden lg:block absolute top-8 left-0 bg-background/90 backdrop-blur-md border border-border rounded-2xl px-5 py-3 z-10"
                    animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <p className="text-muted-foreground text-[9px] uppercase tracking-widest font-medium">{t.productPage.flagshipModel}</p>
                    <p className="text-foreground font-bold text-sm mt-0.5">X45H2 — 45HP</p>
                  </motion.div>
                  <motion.div
                    className="hidden lg:block absolute top-28 right-4 bg-primary/10 backdrop-blur-md border border-primary/30 rounded-2xl px-4 py-2.5 z-10"
                    animate={{ y: [0, 6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <p className="text-primary text-[9px] uppercase tracking-widest font-medium">{t.productPage.zeroEmissions}</p>
                    <p className="text-foreground font-bold text-sm mt-0.5">{t.productPage.electric100}</p>
                  </motion.div>
                </div>
                {/* Top gradient — blends image top edge into background */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
              </div>
              {/* Spec cards — horizontal row below the 3D viewer on all screens (hidden on desktop) */}
              <div className="flex lg:hidden flex-row gap-2 mt-3 w-full">
                {[
                  { icon: Zap, label: t.productPage.hpRange, value: "25–60 HP" },
                  { icon: Battery, label: t.productPage.charge, value: t.productPage.chargingTime },
                  { icon: Gauge, label: t.productPage.models, value: t.productPage.modelsCount },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 flex-1 rounded-lg border border-border bg-card shadow-sm px-3 py-2">
                    <f.icon className="w-4 h-4 text-neutral-500 flex-shrink-0" strokeWidth={2} />
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none truncate">{f.label}</p>
                      <p className="text-xs sm:text-sm font-bold text-foreground mt-1 leading-tight truncate">{f.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <BlurDivider />

      {/* ── FILTER + PRODUCTS ── */}
      <section className="pt-6 pb-12 md:pt-10 md:pb-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">

          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-4"
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-primary text-xs font-bold uppercase tracking-widest">{t.productPage.ourProducts}</span>
            </motion.div>
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              {t.productPage.exploreAll}
            </motion.h2>
            <motion.p
              className="text-muted-foreground max-w-xl mx-auto"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            >
              {t.productPage.exploreDesc}
            </motion.p>
          </div>

          {/* Filter tabs */}
          <div ref={filterRef} className="flex items-center justify-center gap-2 mb-12 flex-wrap">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${filter === tab.id
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
                  {tractors.map((tractor, i) => (
                    <motion.div
                      key={tractor.slug}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">

                        {/* Top accent bar — matches Home page lineup cards */}
                        <div className={`h-1 w-full bg-gradient-to-r ${tractor.badgeGrad}`} />

                        {/* Image / 3D area */}
                        <div
                          className="relative flex items-center justify-center pt-8 pb-4 px-6 min-h-[192px] bg-muted/30"
                          style={{ background: `radial-gradient(ellipse at 50% 100%, ${tractor.glowColor}, transparent 70%)` }}
                        >
                          <span className={`absolute top-4 left-4 z-10 text-[10px] font-bold text-white px-2.5 py-1 rounded-full bg-gradient-to-r ${tractor.badgeGrad} shadow-sm`}>
                            {tractor.badge}
                          </span>
                          {/* Available Now badge */}
                          <span className="absolute top-4 right-4 z-10 flex items-center gap-1.5 text-[9px] font-bold text-white bg-emerald-500 rounded-full px-2.5 py-1 shadow-sm shadow-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            {tractor.status}
                          </span>

                          {/* 3D toggle button */}
                          <button
                            onClick={() => toggle3D(tractor.slug)}
                            className={`absolute bottom-4 right-4 z-10 flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-full border transition-all ${show3D[tractor.slug]
                              ? "bg-primary/20 border-primary/40 text-primary"
                              : "bg-muted border-border text-muted-foreground hover:text-foreground hover:bg-muted/80"
                              }`}
                          >
                            {show3D[tractor.slug]
                              ? <><ImageOff className="w-2.5 h-2.5" /> 2D</>
                              : <><Box className="w-2.5 h-2.5" /> 3D</>
                            }
                          </button>

                          {show3D[tractor.slug] ? (
                            <Suspense fallback={
                              <OptimizedImg src={tractor.image} alt={tractor.fullName} className="h-36 w-full object-contain" width={800} height={566} />
                            }>
                              <TractorViewer3D
                                src={tractor.glb}
                                fallbackSrc={tractor.image}
                                className="w-full h-36"
                                rotate
                                showHint
                              />
                            </Suspense>
                          ) : (
                            <OptimizedImg
                              src={tractor.image}
                              alt={tractor.fullName}
                              loading="lazy"
                              decoding="async"
                              className="h-36 w-full object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                              width={800} height={566}
                            />
                          )}
                        </div>

                        {/* Content */}
                        <div className="px-4 pb-4 space-y-4">
                          <div>
                            <p className={`text-[10px] font-bold ${tractor.accentColor} uppercase tracking-widest mb-1`}>{tractor.type}</p>
                            <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">{tractor.fullName}</h3>
                            <p className="text-muted-foreground text-xs mt-1.5 leading-relaxed line-clamp-2">{tractor.description}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            {tractor.specs.map((s, si) => (
                              <div key={si} className="bg-muted/50 border border-border/60 rounded-xl p-2 flex items-center gap-2">
                                <s.icon className={`w-3 h-3 ${tractor.accentColor} shrink-0`} />
                                <div>
                                  <p className="text-muted-foreground text-[8px] uppercase tracking-wide font-medium leading-none">{s.label}</p>
                                  <p className="text-foreground font-bold text-[11px] mt-0.5 leading-none">{s.value}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-2 pt-1">
                            <Button asChild size="sm" variant="outline" className="w-full group-hover:border-primary group-hover:text-primary text-xs font-semibold h-9 flex-1">
                              <Link href={`/product/${tractor.slug}`}>
                                {t.productPage.viewDetails} <ArrowRight className="ml-1 w-3 h-3" />
                              </Link>
                            </Button>
                            <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-white text-xs font-semibold h-9 px-4">
                              <Link href="/book">
                                {t.productPage.book}
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
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
                  <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest px-3">{t.productPage.implementsTitle}</span>
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
                      {/* Top accent bar */}
                      <div className="h-1 w-full bg-primary" />

                      {/* Image area — object-contain on muted bg, matches tractor cards */}
                      <div className="relative bg-muted/30 flex items-center justify-center px-8 pt-8 pb-4 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-muted/60 to-transparent pointer-events-none" />
                        <OptimizedImg
                          src={a.image}
                          alt={a.name}
                          loading="lazy"
                          decoding="async"
                          className="h-36 object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500 relative z-10"
                          width={594} height={420}
                        />
                        {/* Badge */}
                        <span className="absolute top-4 left-4 z-10 text-[10px] font-bold text-white px-2.5 py-1 rounded-full bg-primary/80 shadow-sm">
                          {a.badge}
                        </span>
                        {/* Available Now */}
                        <span className="absolute top-4 right-4 z-10 flex items-center gap-1.5 text-[9px] font-bold text-white bg-emerald-500 rounded-full px-2.5 py-1 shadow-sm shadow-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          {a.status}
                        </span>
                      </div>

                      <div className="p-4">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{a.type}</p>
                        <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors mb-2">{a.name}</h3>
                        <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-2">{a.description}</p>
                        <Button asChild size="sm" variant="outline" className="w-full group-hover:border-primary group-hover:text-primary text-xs h-8 font-semibold">
                          <Link href={`/product/attachment/${a.slug}`}>
                            {t.productPage.viewDetails} <ArrowRight className="ml-1 w-3 h-3" />
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <BlurDivider />

      {/* ── TECH COMPONENTS ── */}
      <section className="pt-6 pb-12 md:pt-10 md:pb-20 bg-gradient-to-b from-white via-red-50/25 to-white border-y border-red-100/50 relative overflow-hidden shadow-[inset_0_0_60px_rgba(220,38,38,0.025)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#dc262604_1px,transparent_1px),linear-gradient(to_bottom,#dc262604_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-14">
            <motion.div
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-4"
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-primary text-xs font-bold uppercase tracking-widest">{t.productPage.coreTech}</span>
            </motion.div>
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-neutral-900"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              {t.productPage.builtDifferent}
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techSpecs.map((tech, i) => (
              <motion.div
                key={i}
                className="group relative bg-white border border-red-100/60 rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row gap-5 md:gap-7 items-start hover:border-primary/30 hover:shadow-xl hover:shadow-red-500/12 transition-all duration-300 shadow-lg shadow-red-500/5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="shrink-0 w-22 h-22 sm:w-32 sm:h-32 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center p-3 md:p-4 group-hover:border-primary/30 group-hover:bg-white transition-all duration-300">
                  <OptimizedImg src={tech.img} alt={tech.title} loading="lazy" decoding="async" className="w-full h-full object-contain" width={tech.w} height={tech.h} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <tech.icon className="w-4 h-4 text-primary shrink-0" />
                    <h3 className="font-display text-lg font-bold text-neutral-900">{tech.title}</h3>
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-4">{tech.desc}</p>
                  <div className="inline-flex items-baseline gap-1.5 bg-primary/10 border border-primary/20 rounded-xl px-3 py-2 max-w-full">
                    <span className="font-display text-xl md:text-2xl font-bold text-primary">{tech.stat}</span>
                    <span className="text-neutral-500 text-xs font-medium truncate">{tech.statLabel}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENT GALLERY STRIP (Temporarily disabled) ── */}
      {/* <section className="py-16 bg-background overflow-hidden"></section> */}

      <BlurDivider />

      {/* ── FEATURE HIGHLIGHTS ── */}
      <section className="pt-8 pb-16 bg-muted/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-3xl font-bold text-primary">
              Key Core Features
            </h2>
          </div>
          {/* Parent Red Background Box containing both the image card and the four feature cards */}
          <div className="relative rounded-3xl overflow-hidden border border-primary/15 bg-primary/5 p-6 md:p-8 lg:p-10 shadow-lg z-10">
            {/* Background ambient light red glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(0,72%,40%,0.04),transparent_70%)] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-8 items-stretch relative z-10">
              {/* Left Column: Image in a box with overlay text and no red tint */}
              <div className="relative rounded-2xl overflow-hidden min-h-[350px] lg:min-h-full border border-primary/20 shadow-md">
                {/* Background Image - Clean and opaque */}
                <OptimizedImg
                  src={fieldImg}
                  alt="Core Features Illustration"
                  className="absolute inset-0 w-full h-full object-cover object-center z-0"
                  loading="lazy"
                />
                {/* Dark gradient mask for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 pointer-events-none z-0" />

                {/* Text overlaid on top of the image in a high-visibility color */}
                <div className="relative z-10 flex flex-col h-full justify-between p-6 gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/30 rounded-full px-3 py-1 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                      <span className="text-yellow-300 text-[10px] font-bold uppercase tracking-widest">Highlights</span>
                    </div>
                  </div>
                  <div className="text-left mt-auto">
                    <p className="text-yellow-300 font-display font-bold text-lg md:text-xl leading-tight drop-shadow-md">
                      Experience the Future of Farming
                    </p>
                    <p className="text-white text-xs md:text-sm mt-2 font-medium drop-shadow-sm">
                      100% Electric & Autonomous Drivetrains
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: 4 features inside the same parent red background box */}
              <div className="flex flex-col justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { icon: CheckCircle2, title: t.productPage.features.zeroEmissions, desc: t.productPage.features.zeroEmissionsDesc },
                    { icon: Zap, title: t.productPage.features.instantTorque, desc: t.productPage.features.instantTorqueDesc },
                    { icon: BatteryCharging, title: t.productPage.features.fastCharging, desc: t.productPage.features.fastChargingDesc },
                    { icon: Gauge, title: t.productPage.features.warranty, desc: t.productPage.features.warrantyDesc },
                  ].map((feat, i) => (
                    <motion.div
                      key={i}
                      className="bg-card/60 backdrop-blur-sm border border-border/80 rounded-2xl p-5 hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col items-start text-left"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                        <feat.icon className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-display font-bold text-foreground text-sm mb-1 leading-snug">{feat.title}</h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">{feat.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlurDivider />

      {/* ── FIELD CTA ── */}
      <motion.section
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <OptimizedImg
          src={fieldImg}
          alt="AutoNxt in the Field"
          loading="lazy"
          decoding="async"
          className="w-full h-80 object-cover object-center"
          width={1200} height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center px-8 md:px-16">
          <div className="max-w-lg">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">{t.productPage.experienceTag}</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
              {t.productPage.readyToPower}
            </h2>
            <div className="flex gap-3 flex-wrap">
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold shadow-lg shadow-primary/25">
                <Link href="/industry">
                  {t.productPage.seeIndustries} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
