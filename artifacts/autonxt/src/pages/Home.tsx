import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, ChevronDown, Zap, Cpu, BatteryCharging, ShieldCheck, Globe, Activity, Trash2, Hammer, Building2, Shield, PlaneTakeoff, Factory, Leaf, Smartphone, CheckCircle, Monitor, BarChart3, Download, MapPin, Bell, Wrench, Package, Ticket, CalendarDays, QrCode, User, IndianRupee, TrendingUp } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

import tractor1 from "@assets/1_1777731255751.png";
import tractor2 from "@assets/2_1777731255751.png";
import fieldImg from "@assets/8.RightSideGateWall_1777731255752.jpg";
import trailerImg from "@assets/7.LeftSideGateWall_1777731255752.jpg";
import batteryImg from "@assets/battery_1777731255752.png";
import motorImg from "@assets/motor_1777731255752.png";

import baifLogo from "@assets/baif-logo_1777740195489.jpg";
import dksmLogo from "@assets/dksm_1777740195489.png";
import noidaAirportLogo from "@assets/noid-airport_1777740195490.jpeg";
import jslLogo from "@assets/OIP_1777740195490.webp";
import relianceLogo from "@assets/reliance_1777740195490.png";

import dashboardMain from "@assets/Screenshot_2026-05-02_at_22.34.39_1777741515996.png";
import dashboardService from "@assets/Screenshot_2026-05-02_at_22.34.45_1777741515996.png";
import appScreen1 from "@assets/image_1777741441774.png";
import appScreen2 from "@assets/image_1777741450357.png";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const FAQ_CATEGORIES = [
  { id: "all",        label: "All" },
  { id: "technical",  label: "Technical Specifications" },
  { id: "charging",   label: "Charging & Battery" },
  { id: "apps",       label: "Applications & Suitability" },
  { id: "cost",       label: "Cost & Financing" },
  { id: "perf",       label: "Performance & Efficiency" },
];

const FAQS = [
  {
    cat: "technical",
    q: "Why AutoNxt electric tractors over diesel tractors?",
    a: "AutoNxt electric tractors offer significantly lower running costs — electricity is up to 70% cheaper per hour than diesel. They produce zero direct emissions, have fewer moving parts (meaning lower maintenance costs), deliver instant full torque from startup, and operate silently. Over a 5-year period, farmers typically save ₹3–5 lakh compared to diesel equivalents.",
  },
  {
    cat: "perf",
    q: "How many hours does the tractor work on a single charge?",
    a: "Our tractors are designed for a full working day. The X45H2 delivers 8–10 hours of standard field operations on one charge. For heavy-duty tasks such as deep tilling or loaded haulage, expect 6–8 hours. Our smart battery management system gives you real-time range estimates so you're never caught off guard.",
  },
  {
    cat: "charging",
    q: "How long does the tractor take to charge from 0–100%?",
    a: "Using our standard AC charger (included), a full charge takes approximately 6–8 hours — ideal for overnight charging. With our optional DC fast charger, you can reach 80% charge in under 3 hours. A complete charge costs roughly ₹150–200 at standard Indian electricity rates.",
  },
  {
    cat: "apps",
    q: "What implements can be used with AutoNxt tractors?",
    a: "AutoNxt tractors are compatible with all standard 3-point hitch implements including rotavators, ploughs, seed drills, cultivators, harrows, and post-hole diggers. The PTO (Power Take-Off) is compatible with most standard Indian agricultural equipment. Our team can advise on compatibility for specific implements.",
  },
  {
    cat: "charging",
    q: "Can the tractor be charged at home?",
    a: "Yes. Our standard charger plugs into any 15-amp single-phase socket — the same as a regular home power point. You don't need a special charging station. For faster charging, we recommend a dedicated 32-amp circuit, which most agricultural households already have for irrigation pump connections.",
  },
  {
    cat: "perf",
    q: "Does the tractor have enough power for heavy-duty work?",
    a: "Absolutely. Electric motors deliver maximum torque from zero RPM — unlike diesel engines that need to rev up. The X45H2's motor produces the pulling equivalent of a 55HP diesel tractor in practical fieldwork. Farmers switching from diesel consistently report better performance in demanding conditions like wet paddy fields and heavy soil.",
  },
  {
    cat: "charging",
    q: "After how many years will the battery need to be replaced?",
    a: "Our lithium iron phosphate (LFP) battery packs are rated for 3,000+ charge cycles with less than 20% capacity degradation — translating to roughly 8–10 years of typical farm use. The battery comes with a 5-year / 3,000-cycle warranty. Post-warranty, the battery can be replaced as a modular unit.",
  },
  {
    cat: "cost",
    q: "How much savings will I have by using Electric Tractors?",
    a: "On average, AutoNxt owners save ₹60,000–₹90,000 per year on fuel and maintenance compared to a diesel tractor of equivalent power. Over 5 years that's ₹3–4.5 lakh in direct savings, before accounting for government subsidies and carbon credits. Our finance calculator can give you a personalised estimate.",
  },
  {
    cat: "technical",
    q: "Is the tractor remote controlled?",
    a: "Select models in our commercial range offer optional GPS-guided autonomous operation and remote monitoring via the AutoNxt NXT-OS app. The standard range includes full telematics — you can monitor location, battery health, and usage data remotely. Full autonomous driving is available for industrial and airport applications.",
  },
  {
    cat: "cost",
    q: "Are there any financing options for buying the tractor?",
    a: "Yes. We partner with leading rural banks and NBFCs to offer EMI plans starting from ₹8,000/month with as low as 10% down payment. Kisan Credit Card (KCC) holders get preferential rates. Additionally, multiple state governments offer EV subsidies of ₹50,000–₹1.5 lakh on agricultural EVs. Contact our team to explore the best option for you.",
  },
];

function FaqSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = FAQS.filter(
    (f) => activeCategory === "all" || f.cat === activeCategory
  );

  return (
    <section className="py-24 bg-muted/30" id="faq">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Have a question? Find the answer.
          </h2>
          <p className="text-muted-foreground text-lg">
            Frequently asked questions about our electric tractors.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setOpenIndex(null); }}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-card text-foreground border-border hover:border-primary/50 hover:text-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ list */}
        <div className="max-w-3xl mx-auto space-y-3">
          <AnimatePresence>
            {filtered.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={`${activeCategory}-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                  className={`bg-card rounded-xl border transition-all duration-200 overflow-hidden ${
                    isOpen ? "border-primary/50 shadow-md" : "border-border hover:border-primary/30"
                  }`}
                  data-testid={`faq-item-${i}`}
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                  >
                    <span className="font-semibold text-foreground text-base leading-snug">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed border-t border-border/60 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useLang();
  return (
    <div className="w-full flex flex-col min-h-screen pt-16">

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

        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-16">
          {/* Left: Text */}
          <div className="order-2 lg:order-1">
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-1.5 text-sm font-semibold text-primary mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t.home.heroBadge}
            </motion.span>

            <motion.h1
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.05]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {t.home.heroTitle1} <br />
              <span className="text-primary">{t.home.heroTitleHighlight}</span><br />
              <span className="text-accent">{t.home.heroTitle2}</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              {t.home.heroDesc}
            </motion.p>

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

          {/* Right: Hero Image */}
          <motion.div
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative" style={{ perspective: "900px" }}>
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-2xl" />
              <motion.img
                src={tractor1}
                alt="Autonxt X45H2 Electric Tractor"
                className="relative w-full max-w-xl mx-auto drop-shadow-2xl"
                animate={{ y: [0, -18, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            {/* Floating spec badges */}
            <motion.div
              className="absolute top-8 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-xl px-4 py-2.5 shadow-lg shadow-primary/5"
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              whileHover={{ scale: 1.07, y: -3, transition: { duration: 0.2 } }}
            >
              <p className="text-xs text-muted-foreground font-medium">Flagship Model</p>
              <p className="text-sm font-bold text-foreground">X45H2 — 45HP</p>
            </motion.div>
            <motion.div
              className="absolute bottom-10 left-2 md:left-6 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 shadow-md"
              initial={{ opacity: 0, x: -16, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              whileHover={{ scale: 1.07, x: 3, transition: { duration: 0.2 } }}
            >
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Zero Emissions</p>
              <p className="text-xs font-semibold text-emerald-700">100% Electric</p>
            </motion.div>
            <motion.div
              className="absolute top-[45%] left-0 md:left-2 bg-card/90 backdrop-blur-sm border border-border rounded-xl px-3 py-2 shadow-md"
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
      <section className="py-14 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-border">
            {[
              { label: "Electric Tractors Deployed", value: "5,000+" },
              { label: "States Covered", value: "18+" },
              { label: "Hours Saved / Farmer / Year", value: "300+" },
              { label: "CO₂ Offset (Tons)", value: "50K+" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center justify-center text-center px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</h3>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ── */}
      <section className="py-14 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <motion.p
            className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Trusted by India's Leading Organisations
          </motion.p>
          <div className="flex flex-wrap items-center justify-center gap-5 md:gap-8">
            {[
              { img: baifLogo, name: "BAIF Development Research", bg: "bg-white" },
              { img: dksmLogo, name: "DKSM", bg: "bg-white" },
              { img: noidaAirportLogo, name: "Noida International Airport", bg: "bg-[#0a1628]" },
              { img: jslLogo, name: "Jaywant Sugars Ltd.", bg: "bg-white" },
              { img: relianceLogo, name: "Reliance New Energy", bg: "bg-black" },
            ].map((org, i) => (
              <motion.div
                key={i}
                className="group flex flex-col items-center gap-2 cursor-default"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                data-testid={`logo-partner-${i}`}
              >
                <div className={`h-16 w-40 rounded-xl border border-border ${org.bg} flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/10 transition-all duration-200 overflow-hidden px-4`}>
                  <img
                    src={org.img}
                    alt={org.name}
                    className="h-10 w-full object-contain"
                  />
                </div>
                <span className="text-[10px] text-muted-foreground text-center max-w-[120px] leading-tight">{org.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROVEN TRACK RECORD ── */}
      <section className="py-24 bg-muted/40 border-y border-border relative overflow-hidden">
        {/* Subtle light glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,hsl(0,72%,40%,0.04),transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,hsl(214,65%,32%,0.03),transparent_55%)] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-4 py-1.5 mb-5"
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-bold uppercase tracking-widest">Impact by Numbers</span>
            </motion.div>
            <motion.h2
              className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              Proven Track Record.
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-lg max-w-xl mx-auto"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            >
              Real impact across India's most demanding industries — numbers that speak for themselves.
            </motion.p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" style={{ perspective: "1200px" }}>
            {[
              {
                icon: Package,
                value: "250+",
                title: "Orders Placed",
                desc: "Electric tractors deployed across industries nationwide",
                short: "ORDERS",
                bar: "bg-primary",
                badgeBg: "bg-primary/15",
                badgeText: "text-primary",
                numColor: "text-primary",
                glow: "bg-primary/5",
                glowBorder: "group-hover:border-primary/30",
                img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&h=400&fit=crop&q=80&auto=format",
              },
              {
                icon: Building2,
                value: "8",
                title: "Industries Served",
                desc: "Sectors actively deploying AutoNxt EV tractors",
                short: "INDUSTRIES",
                bar: "bg-sky-500",
                badgeBg: "bg-sky-100",
                badgeText: "text-sky-700",
                numColor: "text-sky-600",
                glow: "bg-sky-50",
                glowBorder: "group-hover:border-sky-300",
                img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500&h=400&fit=crop&q=80&auto=format",
              },
              {
                icon: Leaf,
                value: "47,135",
                title: "Trees Saved",
                desc: "Lifetime CO₂ reduction equivalent across the entire fleet",
                short: "TREES SAVED",
                bar: "bg-emerald-500",
                badgeBg: "bg-emerald-100",
                badgeText: "text-emerald-700",
                numColor: "text-emerald-600",
                glow: "bg-emerald-50",
                glowBorder: "group-hover:border-emerald-300",
                img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&h=400&fit=crop&q=80&auto=format",
              },
              {
                icon: TrendingUp,
                value: "₹3.16Cr",
                title: "Cost Saved",
                desc: "Operational savings delivered to customers over diesel",
                short: "COST SAVED",
                bar: "bg-amber-500",
                badgeBg: "bg-amber-100",
                badgeText: "text-amber-700",
                numColor: "text-amber-600",
                glow: "bg-amber-50",
                glowBorder: "group-hover:border-amber-300",
                img: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=500&h=400&fit=crop&q=80&auto=format",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className={`group relative bg-card border border-border ${stat.glowBorder} rounded-2xl overflow-hidden cursor-default transition-all duration-300 hover:shadow-lg`}
                initial={{ opacity: 0, y: 40, rotateX: 14 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ rotateY: 6, rotateX: -4, scale: 1.04, y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                style={{ transformPerspective: 900, transformStyle: "preserve-3d" }}
              >
                {/* Background image */}
                <img src={stat.img} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-[0.10] group-hover:opacity-[0.15] transition-opacity duration-500" />
                {/* White wash overlay */}
                <div className="absolute inset-0 bg-white/80 pointer-events-none" />

                {/* Top coloured accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] ${stat.bar} opacity-80`} />

                {/* Hover inner glow */}
                <div className={`absolute inset-0 ${stat.glow} opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none rounded-2xl`} />

                <div className="relative z-10 p-7 flex flex-col gap-5 h-full">
                  {/* Badge */}
                  <div className={`inline-flex items-center gap-1.5 ${stat.badgeBg} ${stat.badgeText} rounded-full px-2.5 py-1 self-start`}>
                    <stat.icon className="w-3 h-3" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">{stat.short}</span>
                  </div>

                  {/* Hero number */}
                  <div>
                    <p className={`font-display text-5xl md:text-6xl font-black ${stat.numColor} leading-none tracking-tight`}>
                      {stat.value}
                    </p>
                  </div>

                  {/* Text */}
                  <div className="mt-auto">
                    <p className="text-foreground font-bold text-base mb-1.5">{stat.title}</p>
                    <p className="text-muted-foreground text-sm leading-snug">{stat.desc}</p>
                  </div>

                  {/* Bottom progress bar */}
                  <div className="h-px bg-border rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${stat.bar} rounded-full`}
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.09 + 0.4, duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT TEASER ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14">
            <div>
              <motion.div
                className="flex items-center gap-3 mb-3"
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              >
                <div className="h-px w-10 bg-primary rounded-full" />
                <p className="text-primary font-bold text-sm uppercase tracking-widest">Our Lineup</p>
              </motion.div>
              <motion.h2
                className="font-display text-4xl md:text-5xl font-bold text-foreground"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              >
                Built for Every Field.
              </motion.h2>
            </div>
            <Link href="/product">
              <Button variant="outline" className="mt-4 md:mt-0 border-foreground/20 text-foreground hover:border-primary hover:text-primary">
                View All Models <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
            {[
              {
                img: tractor1,
                name: "AutoNxt X45H2",
                type: "45HP Electric Tractor",
                tag: "Best Seller",
                tagColor: "bg-primary",
                tagText: "text-white",
                desc: "Experience the future of farming with AutoNxt's revolutionary 45HP Electric Tractor — designed for versatility and power across all farming and haulage activities.",
                specs: [
                  { icon: Zap, label: "Motor", value: "32 kW" },
                  { icon: BatteryCharging, label: "Battery", value: "38.4 kWh" },
                  { icon: Activity, label: "Runtime", value: "8 hrs" },
                ],
                accentBg: "bg-primary/5",
                accentBorder: "border-primary/20",
              },
              {
                img: tractor1,
                name: "AutoNxt X60H2",
                type: "60HP Electric Tractor",
                tag: "Most Powerful",
                tagColor: "bg-accent",
                tagText: "text-white",
                desc: "The X60H2 brings even more power with its 60HP engine, ensuring high performance while maintaining zero emissions — a perfect balance of power and sustainability.",
                specs: [
                  { icon: Zap, label: "Motor", value: "45 kW" },
                  { icon: BatteryCharging, label: "Battery", value: "52 kWh" },
                  { icon: Activity, label: "Runtime", value: "10 hrs" },
                ],
                accentBg: "bg-accent/5",
                accentBorder: "border-accent/20",
              },
              {
                img: tractor2,
                name: "AutoNxt X25H2",
                type: "25HP Electric Tractor",
                tag: "Compact",
                tagColor: "bg-emerald-600",
                tagText: "text-white",
                desc: "The compact yet powerful X25H2 is perfect for small farms and precision farming. With a 25HP electric motor, it delivers efficiency while reducing operational costs.",
                specs: [
                  { icon: Zap, label: "Motor", value: "18 kW" },
                  { icon: BatteryCharging, label: "Battery", value: "24 kWh" },
                  { icon: Activity, label: "Runtime", value: "8 hrs" },
                ],
                accentBg: "bg-emerald-50",
                accentBorder: "border-emerald-200",
              },
            ].map((p, i) => (
              <motion.div
                key={i}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 40, rotateX: 14 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ rotateY: i === 1 ? 0 : i === 0 ? 5 : -5, rotateX: -3, scale: 1.02, y: -10, transition: { type: "spring", stiffness: 280, damping: 22 } }}
                style={{ transformPerspective: 1000, transformStyle: "preserve-3d" }}
                data-testid={`card-product-${i}`}
              >
                {/* Image area */}
                <div className={`relative ${p.accentBg} p-8 flex items-center justify-center h-52 border-b ${p.accentBorder}`}>
                  <span className={`absolute top-4 left-4 text-[10px] font-bold ${p.tagText} px-3 py-1 rounded-full ${p.tagColor} shadow-sm`}>{p.tag}</span>
                  <img src={p.img} alt={p.name} className="h-36 object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{p.type}</p>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{p.desc}</p>

                  {/* Spec chips */}
                  <div className="flex flex-wrap gap-2 mb-5 mt-auto">
                    {p.specs.map((s, si) => (
                      <div key={si} className="inline-flex items-center gap-1.5 bg-muted rounded-lg px-3 py-1.5 border border-border">
                        <s.icon className="w-3 h-3 text-primary shrink-0" />
                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{s.label}</span>
                        <span className="text-[11px] font-bold text-foreground">{s.value}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/product">
                    <Button size="sm" className="w-full bg-background border border-primary text-primary hover:bg-primary hover:text-white transition-all">
                      Learn More <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 bg-background relative overflow-hidden">
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
                <p className="text-primary font-bold text-sm uppercase tracking-widest">Technology</p>
              </motion.div>
              <motion.h2
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.08]"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}
              >
                Precision<br />Engineering.
              </motion.h2>
            </div>
            <motion.p
              className="text-muted-foreground text-lg max-w-sm lg:text-right"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            >
              Every component engineered for maximum efficiency, safety, and performance in Indian field conditions.
            </motion.p>
          </div>

          {/* Feature cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: "1200px" }}>
            {[
              {
                icon: Zap,
                title: "High-Torque Motor",
                desc: "Instant torque from zero RPM — outperforms diesel in raw pulling power, hill climbs, and wet-field traction.",
                spec: "Zero RPM",
                specColor: "text-amber-600",
                specBg: "bg-amber-50",
                specBorder: "border-amber-200",
                grad: "from-amber-500/90 to-orange-600/90",
                num: "01",
                img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop&q=80&auto=format",
              },
              {
                icon: BatteryCharging,
                title: "Extended Range Battery",
                desc: "Full-day farm operations on one charge. LFP chemistry, solar-compatible, 10-year rated lifespan.",
                spec: "8–10 hrs",
                specColor: "text-blue-600",
                specBg: "bg-blue-50",
                specBorder: "border-blue-200",
                grad: "from-blue-600/90 to-indigo-700/90",
                num: "02",
                img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=300&fit=crop&q=80&auto=format",
              },
              {
                icon: Cpu,
                title: "Smart Control System",
                desc: "NXT-OS platform with real-time diagnostics, GPS fleet tracking, predictive maintenance, and OTA updates.",
                spec: "OTA Ready",
                specColor: "text-violet-600",
                specBg: "bg-violet-50",
                specBorder: "border-violet-200",
                grad: "from-violet-600/90 to-purple-800/90",
                num: "03",
                img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop&q=80&auto=format",
              },
              {
                icon: ShieldCheck,
                title: "Rugged Build",
                desc: "IP67-sealed electronics. Every joint, seal, and housing tested across India's harshest terrain and monsoon weather.",
                spec: "IP67 Rated",
                specColor: "text-slate-600",
                specBg: "bg-slate-100",
                specBorder: "border-slate-200",
                grad: "from-slate-600/90 to-slate-800/90",
                num: "04",
                img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&h=300&fit=crop&q=80&auto=format",
              },
              {
                icon: Activity,
                title: "Telemetry & Analytics",
                desc: "Live performance dashboards, fleet-wide analytics, and intelligent alerts for uptime-critical industrial operations.",
                spec: "Live Data",
                specColor: "text-cyan-600",
                specBg: "bg-cyan-50",
                specBorder: "border-cyan-200",
                grad: "from-cyan-500/90 to-sky-700/90",
                num: "05",
                img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop&q=80&auto=format",
              },
              {
                icon: Globe,
                title: "Zero Emissions",
                desc: "100% electric drivetrain — no diesel, no exhaust, no noise. Cleaner air for farmers, workers, and villages.",
                spec: "100% Clean",
                specColor: "text-emerald-600",
                specBg: "bg-emerald-50",
                specBorder: "border-emerald-200",
                grad: "from-emerald-500/90 to-teal-700/90",
                num: "06",
                img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=300&fit=crop&q=80&auto=format",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                className="group"
                initial={{ opacity: 0, y: 36, rotateX: 12 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ rotateY: 6, rotateX: -4, scale: 1.04, y: -8, transition: { type: "spring", stiffness: 300, damping: 22 } }}
                style={{ transformPerspective: 900, transformStyle: "preserve-3d" }}
              >
                <div className="bg-card border border-border rounded-2xl overflow-hidden h-full hover:border-primary/25 hover:shadow-2xl transition-all duration-300">
                  {/* Photo + gradient banner */}
                  <div className="relative h-36 flex items-center justify-center overflow-hidden">
                    {/* Real photo */}
                    <img
                      src={f.img}
                      alt={f.title}
                      className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Gradient tint overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${f.grad}`} />
                    {/* Number watermark */}
                    <span className="absolute top-1 left-3 font-display text-[88px] font-black text-white/[0.10] leading-none select-none pointer-events-none">
                      {f.num}
                    </span>
                    {/* Soft inner glow on hover */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Centered icon box */}
                    <div className="relative w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <f.icon className="w-7 h-7 text-white drop-shadow" />
                    </div>
                    {/* Spec pill */}
                    <div className={`absolute bottom-3 right-3 ${f.specBg} ${f.specColor} border ${f.specBorder} text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm`}>
                      {f.spec}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-base font-bold text-foreground mb-2.5 group-hover:text-primary transition-colors">{f.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIAL SOLUTIONS ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Industrial Solutions</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">EV Tractor of Choice for Industry.</h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Autonxt electric tractors are built for constant workload across India's most demanding industrial environments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
            {[
              {
                icon: Trash2,
                title: "Municipal Solid Waste",
                short: "MSW",
                desc: "Designed for constant workload in waste collection, transportation, and landfill operations — zero emissions, reduced operational costs.",
                color: "text-green-600",
                bg: "bg-green-600",
                border: "hover:border-green-300",
                img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=320&fit=crop&q=80&auto=format",
              },
              {
                icon: Factory,
                title: "Metal Manufacturing",
                short: "METAL",
                desc: "From material handling to logistics, our tractors streamline metal manufacturing operations while minimising environmental impact.",
                color: "text-slate-300",
                bg: "bg-slate-700",
                border: "hover:border-slate-300",
                img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=320&fit=crop&q=80&auto=format",
              },
              {
                icon: Building2,
                title: "Cement Manufacturing",
                short: "CEMENT",
                desc: "Optimise material handling, transportation, and site maintenance in cement plants — reducing downtime and enhancing productivity.",
                color: "text-orange-300",
                bg: "bg-orange-700",
                border: "hover:border-orange-300",
                img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=320&fit=crop&q=80&auto=format",
              },
              {
                icon: Hammer,
                title: "Construction Industry",
                short: "CONST.",
                desc: "Unmatched versatility and power for site preparation, material handling, and equipment transportation — greener construction ahead.",
                color: "text-yellow-300",
                bg: "bg-yellow-700",
                border: "hover:border-yellow-300",
                img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=320&fit=crop&q=80&auto=format",
              },
              {
                icon: Shield,
                title: "Defence",
                short: "DEF.",
                desc: "Superior performance and rugged durability for military logistics, base maintenance, and all-terrain operations with remote operation options.",
                color: "text-red-300",
                bg: "bg-primary",
                border: "hover:border-primary/40",
                img: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=600&h=320&fit=crop&q=80&auto=format",
              },
              {
                icon: PlaneTakeoff,
                title: "Airports",
                short: "AIRPORT",
                desc: "From baggage handling to runway maintenance — zero-emission, autonomous-ready tractors for smoother, greener airport operations.",
                color: "text-sky-300",
                bg: "bg-accent",
                border: "hover:border-accent/40",
                img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=320&fit=crop&q=80&auto=format",
              },
              {
                icon: Leaf,
                title: "Biomass",
                short: "BIO",
                desc: "Revolutionise biomass collection, processing, and transportation with zero emissions and low operating costs for a greener future.",
                color: "text-lime-300",
                bg: "bg-lime-700",
                border: "hover:border-lime-300",
                img: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=600&h=320&fit=crop&q=80&auto=format",
              },
            ].map((sol, i) => (
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
                <Card className={`bg-card border border-border ${sol.border} hover:shadow-xl transition-all duration-300 h-full overflow-hidden`}>
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
                        <sol.icon className={`w-3.5 h-3.5 ${sol.color}`} />
                      </div>
                      <span className="text-white text-[11px] font-bold uppercase tracking-widest drop-shadow-sm">{sol.short}</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-base font-bold text-foreground mb-2">{sol.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{sol.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/industry">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-semibold" data-testid="btn-all-industries">
                Explore All Industries <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── TECH SHOWCASE: Battery + Motor ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Proprietary Technology</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Built from the Ground Up.</h2>
                <p className="text-muted-foreground text-lg">
                  Unlike competitors who retrofit diesel tractors, Autonxt designs every component — motor, battery, controller — specifically for Indian agricultural conditions.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="bg-muted/40 rounded-xl p-5 border border-border hover:border-primary/30 transition-colors">
                  <img src={batteryImg} alt="Autonxt Battery Pack" className="w-full h-28 object-contain mb-4" />
                  <h4 className="font-bold text-foreground mb-1">Lithium Battery Pack</h4>
                  <p className="text-xs text-muted-foreground">High-density LFP cells. 10-year lifespan. IP67 sealed.</p>
                </div>
                <div className="bg-muted/40 rounded-xl p-5 border border-border hover:border-primary/30 transition-colors">
                  <img src={motorImg} alt="Autonxt Motor" className="w-full h-28 object-contain mb-4" />
                  <h4 className="font-bold text-foreground mb-1">NXT-Drive Motor</h4>
                  <p className="text-xs text-muted-foreground">Axial flux design. Peak efficiency 96%. India-made.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden border border-border"
            >
              <img src={trailerImg} alt="Autonxt X45C2 in field" className="w-full h-[420px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">AUTONXT X45C2</p>
                <p className="text-white font-display text-xl font-semibold">Heavy-Duty Commercial Tractor</p>
              </div>
            </motion.div>
          </div>
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
              <p className="text-primary font-bold text-sm uppercase tracking-widest mb-3">In the Field</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">From Sunrise to Sunset.</h2>
              <p className="text-white/80 text-lg mb-6">One charge. All day. Every season. Autonxt is built for the rhythm of Indian farming.</p>
              <Link href="/gallery">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90" data-testid="btn-view-gallery">
                  View Gallery <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VIDEOS ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">AutoNxt in Action</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Watch the X45H2 at Work.
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl">Real-world videos straight from our YouTube channel — from flooded paddy fields to industrial hauling.</p>
            </div>
            <a
              href="https://www.youtube.com/@autonxtautomation8368"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <Button variant="outline" className="border-border hover:border-primary hover:text-primary gap-2 font-semibold">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#FF0000]"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                View Channel
              </Button>
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { id: "3PVEHTybb_o", title: "X45H2 Product Description (English)" },
              { id: "9Px1KnfeBdY", title: "Rotavator Puddling in Flooded Farms" },
              { id: "kia8cxkaUJc", title: "First Delivery — Jaywant Sugar Mill" },
              { id: "u2a1EoXayrk", title: "45HP Electric Tractor Full Power Demo" },
              { id: "UHtiUSmO27I", title: "Haulage, Tiller, Reaper & Water Wash" },
              { id: "Z6107d2ygF0", title: "X45H2 उत्पाद विवरण — हिंदी में" },
            ].map((v, i) => (
              <motion.a
                key={v.id}
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl overflow-hidden border border-border hover:border-primary/40 hover:shadow-lg transition-all block bg-black"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08 }}
              >
                <div className="relative aspect-video">
                  <img
                    src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`}
                    alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`; }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary/90 group-hover:bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                      <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[14px] border-transparent border-l-white ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-card">
                  <p className="text-xs font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">{v.title}</p>
                </div>
              </motion.a>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/gallery">
              <Button variant="outline" className="border-border hover:border-primary hover:text-primary font-semibold gap-2" data-testid="btn-view-all-videos">
                View Full Gallery <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SOFTWARE WE DELIVER ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Digital Ecosystem</motion.p>
            <motion.h2 className="font-display text-4xl md:text-5xl font-bold text-foreground" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Software We <span className="text-primary">Deliver.</span>
            </motion.h2>
            <motion.p className="text-muted-foreground mt-4 max-w-xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              Complete digital tools to manage, monitor, and maintain your AutoNxt electric tractor fleet.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Dashboard Card */}
            <motion.div
              className="bg-card border border-border rounded-3xl overflow-hidden hover:border-primary/30 hover:shadow-2xl transition-all duration-300 group"
              initial={{ opacity: 0, x: -40, rotateY: -10 }} whileInView={{ opacity: 1, x: 0, rotateY: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ rotateY: 4, rotateX: -3, scale: 1.01, y: -8, transition: { type: "spring", stiffness: 280, damping: 22 } }}
              style={{ transformPerspective: 1000, transformStyle: "preserve-3d" }}
            >
              {/* Real Dashboard Screenshots */}
              <div className="bg-[#0d1117] h-56 relative overflow-hidden">
                <div className="absolute inset-0 flex items-start justify-start">
                  <img
                    src={dashboardMain}
                    alt="AutoNxt Fleet Dashboard"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/60 via-transparent to-transparent" />
                </div>
                {/* Floating inset screenshot */}
                <div className="absolute bottom-3 right-3 w-36 rounded-lg overflow-hidden border border-white/20 shadow-xl group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={dashboardService}
                    alt="AutoNxt Service Center"
                    className="w-full object-cover object-top"
                  />
                </div>
                {/* Live badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white/80 text-[10px] font-semibold tracking-wide">LIVE DASHBOARD</span>
                </div>
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Monitor className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-widest">Web Platform</p>
                    <h3 className="font-display font-bold text-foreground text-xl">NXT-Fleet Dashboard</h3>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {["Real-time GPS fleet tracking", "Battery & diagnostics monitoring", "Fleet analytics & performance reports", "Multi-farm management portal"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-secondary shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/book">
                  <Button variant="outline" className="border-secondary/40 text-secondary hover:bg-secondary hover:text-white font-semibold gap-2">
                    Request Access <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Mobile App Card */}
            <motion.div
              className="bg-card border border-border rounded-3xl overflow-hidden hover:border-primary/30 hover:shadow-2xl transition-all duration-300 group"
              initial={{ opacity: 0, x: 40, rotateY: 10 }} whileInView={{ opacity: 1, x: 0, rotateY: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ rotateY: -4, rotateX: -3, scale: 1.01, y: -8, transition: { type: "spring", stiffness: 280, damping: 22 } }}
              style={{ transformPerspective: 1000, transformStyle: "preserve-3d" }}
            >
              {/* Real App Screenshots */}
              <div className="bg-[#0d1117] h-56 relative overflow-hidden">
                <div className="absolute inset-0">
                  <img
                    src={appScreen1}
                    alt="AutoNxt Tractor Management"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/60 via-transparent to-transparent" />
                </div>
                {/* Floating inset screenshot */}
                <div className="absolute bottom-3 right-3 w-36 rounded-lg overflow-hidden border border-white/20 shadow-xl group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={appScreen2}
                    alt="AutoNxt Driver Management"
                    className="w-full object-cover object-top"
                  />
                </div>
                {/* Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1">
                  <Smartphone className="w-3 h-3 text-primary" />
                  <span className="text-white/80 text-[10px] font-semibold tracking-wide">iOS & ANDROID</span>
                </div>
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-widest">iOS & Android</p>
                    <h3 className="font-display font-bold text-foreground text-xl">AutoNxt Service App</h3>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {["Book & schedule service appointments", "Live technician location tracking", "Complete service history & records", "Spare parts ordering & delivery"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Button className="bg-primary text-white hover:bg-primary/90 font-semibold gap-2">
                  Download App <Download className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VISITING PASS & MOBILE APP ── */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <motion.p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Visit & Connect</motion.p>
            <motion.h2 className="font-display text-4xl md:text-5xl font-bold text-foreground" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Get a <span className="text-primary">Visiting Pass</span> or App
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* Visiting Pass */}
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

              {/* Styled Pass Preview */}
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

            {/* Download App */}
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
      </section>

      {/* ── FAQ ── */}
      <FaqSection />

      {/* ── CTA ── */}
      <section className="py-24 bg-surface-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Ready to Go Electric?</h2>
            <p className="text-white/70 text-xl mb-10">
              Join 5,000+ Indian farmers who have switched to Autonxt. Reserve your tractor today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/book">
                <Button size="lg" className="h-13 px-10 text-base bg-primary text-white hover:bg-primary/90 font-semibold" data-testid="btn-cta-book">
                  Book Now
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="h-13 px-10 text-base border-white/30 text-white hover:bg-white/10 font-semibold" data-testid="btn-cta-story">
                  Our Story
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
