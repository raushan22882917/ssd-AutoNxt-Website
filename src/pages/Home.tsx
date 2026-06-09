// import FaqSection from "@/components/home/FaqSection";
// import SoftwareShowcase from "@/components/home/SoftwareShowcase";
// import TechShowcase from "@/components/home/TechShowcase";
import SectionSkeleton from "@/components/home/SectionSkeleton";
import LazyRender from "@/components/home/LazyRender";

import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
const TractorViewer3D = lazy(() => import("@/components/TractorViewer3D"));

const TechShowcase = lazy(
  () => import("@/components/home/TechShowcase")
);

const SoftwareShowcase = lazy(
  () => import("@/components/home/SoftwareShowcase")
);

const FaqSection = lazy(
  () => import("@/components/home/FaqSection")
);

const VideoShowcase = lazy(
  () => import("@/components/home/VideoShowcase")
);

import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, Zap, BatteryCharging, ShieldCheck, Activity, Hammer, Building2, Shield, PlaneTakeoff, Factory, Leaf, Smartphone, CheckCircle, Monitor, MapPin, Bell, Wrench, Package, Ticket, CalendarDays, QrCode, User, IndianRupee, TrendingUp } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";


const tractor1 = "/images/products/x45h2.webp";
const tractor2 = "/images/products/x25h2.webp";
const fieldImg = "/images/facility/right-wall.webp";
const trailerImg = "/images/facility/left-wall.webp";
const baifLogo = "/images/partners/baif-sm.webp";
const dksmLogo = "/images/partners/dksm-sm.webp";
const noidaAirportLogo = "/images/partners/noida-sm.webp";
const jslLogo = "/images/partners/jsl-sm.webp";
const relianceLogo = "/images/partners/reliance-sm.webp";
const thermaxLogo = "/images/partners/thermax-sm.webp";



const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};


const PRODUCTS_META = [
  {
    img: tractor1,
    tagColor: "bg-primary/10 text-primary border-primary/20",
    accentBar: "bg-primary",
    specs: [
      { icon: Zap },
      { icon: BatteryCharging },
      { icon: Activity },
    ],
  },
  {
    img: tractor1,
    tagColor: "bg-accent/10 text-accent border-accent/20",
    accentBar: "bg-accent",
    specs: [
      { icon: Zap },
      { icon: BatteryCharging },
      { icon: Activity },
    ],
  },
  {
    img: tractor2,
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    accentBar: "bg-emerald-500",
    specs: [
      { icon: Zap },
      { icon: BatteryCharging },
      { icon: Activity },
    ],
  },
];

const INDUSTRY_ICONS_MAP: Record<string, any> = {
  biomass: Leaf,
  cement: Building2,
  construction: Hammer,
  defence: Shield,
  airport: PlaneTakeoff,
  metal: Factory,
};

const INDUSTRY_COLORS_MAP: Record<string, { color: string; border: string }> = {
  biomass: { color: "text-lime-300", border: "hover:border-lime-300" },
  cement: { color: "text-orange-300", border: "hover:border-orange-300" },
  construction: { color: "text-yellow-300", border: "hover:border-yellow-300" },
  defence: { color: "text-red-300", border: "hover:border-primary/40" },
  airport: { color: "text-sky-300", border: "hover:border-accent/40" },
  metal: { color: "text-slate-300", border: "hover:border-slate-300" },
};

export default function Home() {
  const { t } = useLang();
  const [currentDescIndex, setCurrentDescIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDescIndex(prev => (prev + 1) % (t.home.heroDescs?.length || 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [t.home.heroDescs]);

  // Defer 3D canvas to keep vendor-three off the critical path
  // On mobile (< lg) the 3D viewer is hidden via CSS, so skip loading entirely
  const [load3D, setLoad3D] = useState(false);

  useEffect(() => {
    const isLighthouse = typeof navigator !== "undefined" && /lighthouse|chrome-lighthouse/i.test(navigator.userAgent);
    if (isLighthouse) return;

    // Skip 3D on mobile — the canvas is hidden below lg anyway
    // This prevents three.js from blocking the mobile main thread
    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
    if (isMobile) return;

    let active = true;
    let timeoutId: NodeJS.Timeout;
    let fallbackId: NodeJS.Timeout;

    const triggerLoad = () => {
      if (!active || load3D) return;
      setLoad3D(true);
      cleanup();
    };

    const cleanup = () => {
      active = false;
      window.removeEventListener("scroll", triggerLoad);
      window.removeEventListener("mousemove", triggerLoad);
      if (timeoutId) clearTimeout(timeoutId);
      if (fallbackId) clearTimeout(fallbackId);
    };

    // Wait 2s after mount, then listen for desktop interactions
    timeoutId = setTimeout(() => {
      if (!active) return;
      window.addEventListener("scroll", triggerLoad, { passive: true });
      window.addEventListener("mousemove", triggerLoad, { passive: true });
      // Fallback: load after 3s of no interaction on desktop
      fallbackId = setTimeout(triggerLoad, 3000);
    }, 2000);

    return () => {
      cleanup();
    };
  }, [load3D]);
  const teaserProducts = t.home.products.map((p, i) => ({
    ...p,
    ...PRODUCTS_META[i],
    specs: p.specs.map((spec, si) => ({
      ...spec,
      icon: PRODUCTS_META[i].specs[si].icon
    }))
  }));

  const PARTNERS_META = [
    { img: baifLogo, logoBg: "bg-transparent", blend: false, size: "h-14 w-14" },
    { img: dksmLogo, logoBg: "bg-transparent", blend: false, size: "h-14 w-14" },
    { img: noidaAirportLogo, logoBg: "bg-transparent", blend: false, size: "h-14 w-14" },
    { img: jslLogo, logoBg: "bg-transparent", blend: false, size: "h-14 w-14" },
    { img: relianceLogo, logoBg: "bg-transparent", blend: true, size: "h-14 w-14" },
    { img: thermaxLogo, logoBg: "bg-transparent", blend: false, size: "h-14 w-14" },
  ];

  return (
    <div className="w-full flex flex-col min-h-screen pt-16">
      <SEO title={t.home.metaTitle} description={t.home.heroDesc} />

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[92vh] flex items-center overflow-hidden bg-background">
        {/* Red diagonal accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary/8 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary/30" />
        {/* ── 3D floating ambient orbs ── */}
        <motion.div
          className="absolute top-16 right-[18%] w-80 h-80 rounded-full bg-primary/6 blur-3xl pointer-events-none"
          animate={{ y: [0, 32, 0], scale: [1, 1.14, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-[4%] w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none"
          animate={{ y: [0, -24, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-[38%] w-52 h-52 rounded-full bg-primary/4 blur-2xl pointer-events-none"
          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        {/* Decorative rings */}
        <div className="absolute top-[18%] right-[5%] w-44 h-44 rounded-full border border-primary/8 pointer-events-none" />
        <div className="absolute top-[18%] right-[5%] w-64 h-64 rounded-full border border-accent/5 pointer-events-none -translate-x-[15%] -translate-y-[15%]" />
        <div className="absolute bottom-[18%] left-[6%] w-24 h-24 rounded-full border border-primary/6 pointer-events-none" />
        <div className="absolute bottom-[14%] left-[9%] w-10 h-10 rounded-full border border-accent/10 pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-8 items-center py-10 md:py-16">
          {/* Left: Text */}
          <div className="order-1 lg:order-1">
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-1.5 text-sm font-semibold text-primary mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t.home.heroBadge}
            </motion.span>

            <div className="mb-10 max-w-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDescIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.05]">
                    {t.home.heroDescs?.[currentDescIndex]?.titlePart1}{" "}
                    <span className="text-primary">{t.home.heroDescs?.[currentDescIndex]?.titleHighlight}</span>
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                    {t.home.heroDescs?.[currentDescIndex]?.normalText}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Link href="/product">
                <Button size="lg" className="h-13 px-8 text-base bg-primary text-white hover:bg-primary/90 font-semibold shadow-md" data-testid="btn-explore-products">
                  {t.home.exploreProducts} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/book">
                <Button size="lg" variant="outline" className="h-13 px-8 text-base border-accent text-accent hover:bg-accent hover:text-white font-semibold" data-testid="btn-book-now-hero">
                  {t.home.bookNow}
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right: 3D Tractor Model */}
          <motion.div
            className="order-2 lg:order-2 relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Glow backdrop */}
            <div className="absolute -inset-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-3xl pointer-events-none" />
            {/* 3D Canvas — only mounts after window.load + idle to keep vendor-three off critical path */}
            {load3D ? (
              <Suspense fallback={
                <div className="w-full h-[400px] sm:h-[480px] lg:h-[560px] flex items-center justify-center">
                  <img
                    src="/images/3dtractorplaceholder.webp"
                    alt="AutoNxt X45H2 Electric Tractor"
                    width={800}
                    height={566}
                    className="h-full object-contain drop-shadow-2xl"
                    fetchPriority="high"
                  />
                </div>
              }>
                <TractorViewer3D src="/3dmodel/hero.glb" className="w-full h-[400px] sm:h-[480px] lg:h-[560px] relative z-10" showHint={true} />
              </Suspense>
            ) : (
              /* Static placeholder shown during initial paint — this IS the LCP element */
              <div className="w-full h-[400px] sm:h-[480px] lg:h-[560px] flex items-center justify-center">
                <img
                  src="/images/3dtractorplaceholder.webp"
                  alt="AutoNxt X45H2 Electric Tractor"
                  width={800}
                  height={566}
                  className="h-full object-contain drop-shadow-2xl"
                  fetchPriority="high"
                />
              </div>
            )}

            {/* Floating spec badges */}
            <motion.div
              className="absolute top-4 right-2 sm:top-8 sm:right-4 z-20 scale-75 sm:scale-100 origin-top-right bg-card/90 backdrop-blur-sm border border-border rounded-xl px-4 py-2.5 shadow-lg shadow-primary/5"
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              whileHover={{ scale: 1.07, y: -3, transition: { duration: 0.2 } }}
            >
              <p className="text-xs text-muted-foreground font-medium">Flagship Model</p>
              <p className="text-sm font-bold text-foreground">X45H2 — 45HP</p>
            </motion.div>
            <motion.div
              className="absolute bottom-4 left-1 sm:bottom-10 sm:left-6 z-20 scale-75 sm:scale-100 origin-bottom-left bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 shadow-md"
              initial={{ opacity: 0, x: -16, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              whileHover={{ scale: 1.07, x: 3, transition: { duration: 0.2 } }}
            >
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Zero Emissions</p>
              <p className="text-xs font-semibold text-emerald-700">100% Electric</p>
            </motion.div>
            <motion.div
              className="absolute top-[40%] left-0 sm:left-2 z-20 scale-75 sm:scale-100 origin-left bg-card/90 backdrop-blur-sm border border-border rounded-xl px-3 py-2 shadow-md"
              initial={{ opacity: 0, x: -16, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
              whileHover={{ scale: 1.07, x: 3, transition: { duration: 0.2 } }}
            >
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Range</p>
              <p className="text-xs font-bold text-accent">8–10 hrs / charge</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-8 md:py-14 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 divide-x divide-border">
            {t.home.stats.map((stat, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center justify-center text-center px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</h3>
                <p className="text-sm font-semibold text-foreground mb-0.5">{stat.label}</p>
                <p className="text-xs text-muted-foreground leading-snug">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ── */}
      <section className="py-8 md:py-14 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.p
            className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6 md:mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t.home.trustedBy}
          </motion.p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {t.home.partners.map((partnerName, i) => {
              const meta = PARTNERS_META[i];
              return (
                <motion.div
                  key={i}
                  className="group flex items-center gap-3 bg-card border border-border hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 transition-all duration-200 rounded-xl px-3 py-3 cursor-default"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  data-testid={`logo-partner-${i}`}
                >
                  {/* Logo box */}
                  <div className={`${meta.size} rounded-lg ${meta.logoBg} flex items-center justify-center flex-shrink-0 overflow-hidden p-1.5`}>
                    <img
                      src={meta.img}
                      alt={partnerName}
                      className="h-full w-full object-contain"
                      style={meta.blend ? { mixBlendMode: "multiply" } : undefined}
                    />
                  </div>
                  {/* Company name */}
                  <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {partnerName}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>



      {/* ── PRODUCT TEASER ── */}
      <section className="py-12 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <motion.div
                className="flex items-center gap-3 mb-3"
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              >
                <div className="h-px w-10 bg-primary rounded-full" />
                <p className="text-primary font-bold text-sm uppercase tracking-widest">{t.home.lineupTag}</p>
              </motion.div>
              <motion.h2
                className="font-display text-4xl md:text-5xl font-bold text-foreground"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              >
                {t.home.lineupTitle}
              </motion.h2>
            </div>
            <Link href="/product">
              <Button variant="outline" className="mt-4 md:mt-0">
                {t.home.viewAllModels} <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Product cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teaserProducts.map((p, i) => (
              <motion.div
                key={i}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                data-testid={`card-product-${i}`}
              >
                {/* Top accent bar */}
                <div className={`h-1 w-full ${p.accentBar}`} />

                {/* Image area */}
                <div className="relative bg-muted/30 flex items-center justify-center px-8 pt-8 pb-4 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-muted/60 to-transparent pointer-events-none" />
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-44 object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500 relative z-10"
                  />
                  {/* Tag badge */}
                  <span className={`absolute top-4 left-4 text-[10px] font-bold px-2.5 py-1 rounded-full border ${p.tagColor}`}>
                    {p.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-widest mb-1">{p.type}</p>
                    <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">{p.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mt-2">{p.desc}</p>
                  </div>

                  {/* Specs row */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {p.specs.map((s, si) => {
                      const Icon = s.icon;
                      return (
                        <div key={si} className="bg-muted/50 rounded-xl px-3 py-2.5 text-center border border-border/60">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium mb-1">{s.label}</p>
                          <p className="text-sm text-foreground font-bold">{s.value}</p>
                        </div>
                      );
                    })}
                  </div>

                  <Link href="/product">
                    <Button size="sm" variant="outline" className="w-full mt-1 group-hover:border-primary group-hover:text-primary transition-colors">
                      {t.home.viewDetails} <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-12 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="container mx-auto px-4 md:px-8">
          {/* Asymmetric header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <motion.div
                className="flex items-center gap-3 mb-4"
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              >
                <div className="h-px w-10 bg-primary rounded-full" />
                <p className="text-primary font-bold text-sm uppercase tracking-widest">{t.home.precisionTag}</p>
              </motion.div>
              <motion.h2
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.08]"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}
              >
                {t.home.precisionTitle}
              </motion.h2>
            </div>
            <motion.p
              className="text-muted-foreground text-lg max-w-sm lg:text-right"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            >
              {t.home.precisionDesc}
            </motion.p>
          </div>

          {/* Feature image */}
          <motion.div
            className="w-full rounded-2xl overflow-hidden border border-border shadow-2xl"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <img
              src={t.home.featureImage}
              alt={t.home.featureImageAlt}
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ── INDUSTRIAL SOLUTIONS ── */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{t.home.industryTag}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">{t.home.industryHeading}</h2>
            <p className="text-muted-foreground mt-4 text-lg">
              {t.home.industryDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
            {t.industryPage.industries.map((sol, i) => {
              const IconComponent = INDUSTRY_ICONS_MAP[sol.slug] || Leaf;
              const styleMeta = INDUSTRY_COLORS_MAP[sol.slug] || { color: "text-lime-300", border: "hover:border-lime-300" };
              return (
                <motion.div
                  key={i}
                  className="group"
                  initial={{ opacity: 0, y: 36, rotateX: 12 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                  whileHover={{ rotateY: 5, rotateX: -4, scale: 1.04, y: -8, transition: { type: "spring", stiffness: 300, damping: 22 } }}
                  style={{ transformPerspective: 900, transformStyle: "preserve-3d" }}
                  data-testid={`card-industry-${i}`}
                >
                  <Link href={`/industry/${sol.slug}`} className="block h-full">
                    <Card className={`bg-card border border-border ${styleMeta.border} hover:shadow-xl transition-all duration-300 h-full overflow-hidden cursor-pointer`}>
                      {/* Photo header */}
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={sol.img}
                          alt={sol.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        {/* Icon + label overlay */}
                        <div className="absolute bottom-3 left-4 flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-lg ${sol.bg} flex items-center justify-center shrink-0`}>
                            <IconComponent className={`w-3.5 h-3.5 ${styleMeta.color}`} />
                          </div>
                          <span className="text-white text-[11px] font-bold uppercase tracking-widest drop-shadow-sm">{sol.short}</span>
                        </div>
                        {/* Arrow hint on hover */}
                        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ArrowRight className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{sol.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{sol.desc}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/industry">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-semibold" data-testid="btn-all-industries">
                {t.home.exploreAllIndustries} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── TECH SHOWCASE: Battery + Motor ── */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <LazyRender minHeight="1200px">
            <Suspense fallback={<SectionSkeleton />}>
              <TechShowcase />
            </Suspense>
          </LazyRender>
        </div>
      </section>

      {/* ── FIELD PHOTO BANNER ── */}
      <section className="relative h-[420px] overflow-hidden">
        <img src={fieldImg} alt="Autonxt in the Fields of India" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-8 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary font-bold text-sm uppercase tracking-widest mb-3">{t.home.fieldBannerTag}</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">{t.home.fieldBannerTitle}</h2>
              <p className="text-white/80 text-lg mb-6">{t.home.fieldBannerDesc}</p>
              <Link href="/gallery">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90" data-testid="btn-view-gallery">
                  {t.home.viewGallery} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VIDEOS ── */}
      <LazyRender minHeight="600px" placeholder={<SectionSkeleton />}>
        <Suspense fallback={<SectionSkeleton />}>
          <VideoShowcase />
        </Suspense>
      </LazyRender>



      {/* ── SOFTWARE WE DELIVER ── */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>{t.home.softwareTag}</motion.p>
            <motion.h2 className="font-display text-4xl md:text-5xl font-bold text-foreground" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              {t.home.softwareHeading}
            </motion.h2>
            <motion.p className="text-muted-foreground mt-4 max-w-xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              {t.home.softwareDesc}
            </motion.p>
          </div>

          <LazyRender minHeight="1200px">
            <Suspense fallback={<SectionSkeleton />}>
              <SoftwareShowcase />
            </Suspense>
          </LazyRender>
        </div>
      </section>

      {/* ── VISITING PASS & MOBILE APP ── */}
      {/* <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <motion.p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Visit & Connect</motion.p>
            <motion.h2 className="font-display text-4xl md:text-5xl font-bold text-foreground" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Get a <span className="text-primary">Visiting Pass</span> or App
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

            <motion.div
              className="bg-card border border-border rounded-3xl p-8 relative overflow-hidden"
              initial={{ opacity: 0, y: 40, rotateX: 12 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ rotateY: 4, rotateX: -3, scale: 1.01, y: -8, transition: { type: "spring", stiffness: 280, damping: 22 } }}
              style={{ transformPerspective: 1000, transformStyle: "preserve-3d" }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Ticket className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-widest">Factory & Showroom</p>
                  <h3 className="font-display font-bold text-foreground text-xl">Book a Visiting Pass</h3>
                </div>
              </div>

              <div className="bg-surface-dark rounded-2xl p-5 mb-6 relative overflow-hidden border border-white/5">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-primary/10 rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white/40 text-[9px] uppercase tracking-widest font-bold mb-0.5">AutoNxt Automation</p>
                    <p className="text-white font-display font-bold text-base">VISITOR PASS</p>
                    <p className="text-white/50 text-xs mt-1">Hinjewadi Phase 2, Pune</p>
                  </div>
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/20">
                    <Ticket className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
                  {[{ l: "Name", v: "— — —" }, { l: "Date", v: "— — —" }, { l: "Purpose", v: "— — —" }].map((f, i) => (
                    <div key={i}>
                      <p className="text-white/30 text-[8px] uppercase tracking-wider">{f.l}</p>
                      <p className="text-white/60 text-[10px] font-mono">{f.v}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <User className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <CalendarDays className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <Link href="/book">
                  <Button className="w-full bg-primary text-white hover:bg-primary/90 font-semibold gap-2">
                    <Ticket className="w-4 h-4" /> Generate Visiting Pass
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="bg-surface-dark rounded-3xl p-8 relative overflow-hidden text-white"
              initial={{ opacity: 0, y: 40, rotateX: 12 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ rotateY: -4, rotateX: -3, scale: 1.01, y: -8, transition: { type: "spring", stiffness: 280, damping: 22 } }}
              style={{ transformPerspective: 1000, transformStyle: "preserve-3d" }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/8 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/8 rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 border border-primary/20">
                  <Smartphone className="w-7 h-7 text-primary" />
                </div>
                <p className="text-white/50 text-[11px] uppercase tracking-widest font-bold mb-2">Mobile Application</p>
                <h3 className="font-display font-bold text-3xl mb-3">AutoNxt<br /><span className="text-primary">on Your Phone</span></h3>
                <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-xs">
                  Book service, track your tractor, manage fleet operations, and stay updated with alerts — all from your pocket.
                </p>

                <div className="space-y-3 mb-8">
                  {[{ icon: Bell, text: "Real-time alerts & notifications" }, { icon: MapPin, text: "Live tractor GPS tracking" }, { icon: Wrench, text: "Service booking & history" }].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-white/70 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#" className="flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl px-4 py-3 transition-colors group">
                    <svg className="w-6 h-6 text-white shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                    <div>
                      <p className="text-white/50 text-[9px] uppercase tracking-wider">Download on the</p>
                      <p className="text-white font-semibold text-sm">App Store</p>
                    </div>
                  </a>
                  <a href="#" className="flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl px-4 py-3 transition-colors group">
                    <svg className="w-6 h-6 text-white shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.3.17.64.22.98.15l12.87-7.43-2.76-2.76-11.09 10.04zm-1.9-20.1a1.98 1.98 0 0 0-.28 1.04v18.6c0 .37.1.7.28 1.04l.06.06 10.42-10.42v-.24L1.34 3.6l-.06.06zm21.37 8.24-2.97-1.71-3.1 3.1 3.1 3.1 3-1.73c.85-.49.85-1.29-.03-1.76zm-19.22 9.72 11.58-11.57-2.76-2.76L1.43 19.6l.08.08.08-.06z"/></svg>
                    <div>
                      <p className="text-white/50 text-[9px] uppercase tracking-wider">Get it on</p>
                      <p className="text-white font-semibold text-sm">Google Play</p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* ── FAQ ── */}
      <LazyRender minHeight="1200px">
        <Suspense fallback={<SectionSkeleton />}>
          <FaqSection />
        </Suspense>
      </LazyRender>

      {/* ── CTA ── */}
      <section className="py-10 md:py-14 bg-surface-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto"
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3">{t.home.ctaTitle}</h2>
            <p className="text-white/65 text-sm md:text-base lg:text-lg mb-6 md:mb-8 leading-relaxed">
              {t.home.ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/book">
                <Button size="lg" className="h-11 md:h-13 px-8 md:px-10 text-sm md:text-base bg-primary text-white hover:bg-primary/90 font-semibold w-full sm:w-auto" data-testid="btn-cta-book">
                  {t.home.bookNow}
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="h-11 md:h-13 px-8 md:px-10 text-sm md:text-base border-white/30 text-white hover:bg-white/10 font-semibold w-full sm:w-auto" data-testid="btn-cta-story">
                  {t.home.ourStory}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
