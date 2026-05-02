import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, ChevronDown, Zap, Cpu, BatteryCharging, ShieldCheck, Globe, Activity, Trash2, Hammer, Building2, Shield, PlaneTakeoff, Factory, Leaf } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

import tractor1 from "@assets/1_1777731255751.png";
import tractor2 from "@assets/2_1777731255751.png";
import fieldImg from "@assets/8.RightSideGateWall_1777731255752.jpg";
import trailerImg from "@assets/7.LeftSideGateWall_1777731255752.jpg";
import batteryImg from "@assets/battery_1777731255752.png";
import motorImg from "@assets/motor_1777731255752.png";

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
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-2xl" />
              <img
                src={tractor1}
                alt="Autonxt X45H2 Electric Tractor"
                className="relative w-full max-w-xl mx-auto drop-shadow-2xl"
              />
            </div>
            {/* Floating badge */}
            <motion.div
              className="absolute top-8 right-4 bg-card border border-border rounded-xl px-4 py-2.5 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              <p className="text-xs text-muted-foreground font-medium">Flagship Model</p>
              <p className="text-sm font-bold text-foreground">X45H2 — 45HP</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-14 bg-foreground text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-white/10">
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
                <p className="text-xs uppercase tracking-widest text-white/60 font-medium">{stat.label}</p>
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
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { name: "Reliance Industries", abbr: "RIL" },
              { name: "BAIF Development Research", abbr: "BAIF" },
              { name: "Noida International Airport", abbr: "NIA" },
              { name: "National Highways Authority", abbr: "NHAI" },
              { name: "Indian Army", abbr: "IA" },
              { name: "IFFCO Kisan", abbr: "IFFCO" },
              { name: "Bharatmala Project", abbr: "BMP" },
            ].map((org, i) => (
              <motion.div
                key={i}
                className="group flex flex-col items-center gap-1 cursor-default"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                data-testid={`logo-partner-${i}`}
              >
                <div className="h-14 px-6 rounded-xl border border-border bg-muted/30 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-200">
                  <span className="font-display font-bold text-lg text-foreground/50 group-hover:text-primary transition-colors tracking-wide">
                    {org.abbr}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground text-center max-w-[90px] leading-tight">{org.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT TEASER ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14">
            <div className="max-w-2xl">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Our Lineup</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Built for Every Field.
              </h2>
            </div>
            <Link href="/product">
              <Button variant="outline" className="mt-4 md:mt-0 border-foreground/20 text-foreground hover:border-primary hover:text-primary">
                View All Models <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                img: tractor1,
                name: "Autonxt X45H2",
                type: "45HP Electric Tractor",
                tag: "Best Seller",
                tagColor: "bg-primary",
                desc: "Powerful 45HP motor for heavy fieldwork. Extended range battery for full-day operations.",
              },
              {
                img: tractor2,
                name: "Autonxt X25H4",
                type: "25HP Electric Tractor",
                tag: "Compact",
                tagColor: "bg-accent",
                desc: "Agile and efficient for small-to-medium farms. Perfect for precision agriculture.",
              },
            ].map((p, i) => (
              <motion.div
                key={i}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-testid={`card-product-${i}`}
              >
                <div className="relative bg-muted/40 p-8 flex items-center justify-center h-56">
                  <span className={`absolute top-4 left-4 text-xs font-bold text-white px-3 py-1 rounded-full ${p.tagColor}`}>{p.tag}</span>
                  <img src={p.img} alt={p.name} className="h-40 object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">{p.type}</p>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{p.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{p.desc}</p>
                  <Link href="/product">
                    <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                      Learn More <ArrowRight className="ml-1 w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 bg-muted/40">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Technology</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Precision Engineering.</h2>
            <p className="text-muted-foreground mt-4">Every component engineered for maximum efficiency, safety, and performance in Indian field conditions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "High-Torque Motor", desc: "Instant torque from zero RPM. Outperforms diesel in pulling power and response." },
              { icon: BatteryCharging, title: "Extended Range Battery", desc: "Full-day farm operations on a single charge. Solar-compatible charging." },
              { icon: Cpu, title: "Smart Control System", desc: "NXT-OS platform for real-time diagnostics, fleet tracking, and OTA updates." },
              { icon: ShieldCheck, title: "Rugged Build", desc: "IP67 rated electronics. Tested across India's harshest terrain and weather." },
              { icon: Activity, title: "Telemetry & Analytics", desc: "Real-time performance data and predictive maintenance alerts for fleets." },
              { icon: Globe, title: "Zero Emissions", desc: "100% electric. No diesel, no exhaust, no noise — clean air for villages." },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Card className="bg-card border-border hover:border-primary/40 hover:shadow-md transition-all h-full">
                  <CardContent className="p-7">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                      <f.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2">{f.title}</h3>
                    <p className="text-muted-foreground text-sm">{f.desc}</p>
                  </CardContent>
                </Card>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Trash2,
                title: "Municipal Solid Waste",
                short: "MSW",
                desc: "Designed for constant workload in waste collection, transportation, and landfill operations — zero emissions, reduced operational costs.",
                color: "text-green-600",
                bg: "bg-green-50",
                border: "hover:border-green-300",
              },
              {
                icon: Factory,
                title: "Metal Manufacturing",
                short: "METAL",
                desc: "From material handling to logistics, our tractors streamline metal manufacturing operations while minimising environmental impact.",
                color: "text-slate-600",
                bg: "bg-slate-50",
                border: "hover:border-slate-300",
              },
              {
                icon: Building2,
                title: "Cement Manufacturing",
                short: "CEMENT",
                desc: "Optimise material handling, transportation, and site maintenance in cement plants — reducing downtime and enhancing productivity.",
                color: "text-orange-600",
                bg: "bg-orange-50",
                border: "hover:border-orange-300",
              },
              {
                icon: Hammer,
                title: "Construction Industry",
                short: "CONST.",
                desc: "Unmatched versatility and power for site preparation, material handling, and equipment transportation — greener construction ahead.",
                color: "text-yellow-600",
                bg: "bg-yellow-50",
                border: "hover:border-yellow-300",
              },
              {
                icon: Shield,
                title: "Defence",
                short: "DEF.",
                desc: "Superior performance and rugged durability for military logistics, base maintenance, and all-terrain operations with remote operation options.",
                color: "text-primary",
                bg: "bg-primary/5",
                border: "hover:border-primary/40",
              },
              {
                icon: PlaneTakeoff,
                title: "Airports",
                short: "AIRPORT",
                desc: "From baggage handling to runway maintenance — zero-emission, autonomous-ready tractors for smoother, greener airport operations.",
                color: "text-accent",
                bg: "bg-accent/5",
                border: "hover:border-accent/40",
              },
              {
                icon: Leaf,
                title: "Biomass",
                short: "BIO",
                desc: "Revolutionise biomass collection, processing, and transportation with zero emissions and low operating costs for a greener future.",
                color: "text-lime-600",
                bg: "bg-lime-50",
                border: "hover:border-lime-300",
              },
            ].map((sol, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                data-testid={`card-industry-${i}`}
              >
                <Card className={`bg-card border border-border ${sol.border} hover:shadow-md transition-all duration-300 h-full`}>
                  <CardContent className="p-7">
                    <div className={`w-12 h-12 rounded-xl ${sol.bg} flex items-center justify-center mb-5`}>
                      <sol.icon className={`w-6 h-6 ${sol.color}`} />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-widest ${sol.color} mb-2 block`}>{sol.short}</span>
                    <h3 className="text-base font-bold text-foreground mb-3">{sol.title}</h3>
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

      {/* ── FAQ ── */}
      <FaqSection />

      {/* ── CTA ── */}
      <section className="py-24 bg-foreground text-white relative overflow-hidden">
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
