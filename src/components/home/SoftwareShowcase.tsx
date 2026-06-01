import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

import { Button } from "@/components/ui/button";

import {
  ArrowRight,
  CheckCircle,
  Monitor,
  Smartphone,
} from "lucide-react";

const dashboardMain    = "/images/app/dashboard-main.png";
const dashboardService = "/images/app/dashboard-service.png";
const appScreen1       = "/images/app/app-screen-1.png";
const appScreen2       = "/images/app/app-screen-2.png";


/* ── Mobile screen auto-carousel ── */
function MobileScreenCarousel({ screens }: { screens: string[] }) {
  const [idx, setIdx] = useState(0);
  const total = screens.length;

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % total), 2500);
    return () => clearInterval(id);
  }, [total]);

  return (
    <div className="relative overflow-hidden bg-[#0d1117]" style={{ aspectRatio: "9/16" }}>
      <AnimatePresence mode="wait">
        <motion.img
          key={screens[idx]}
          src={screens[idx]}
          alt="App screen"
          className="absolute inset-0 w-full h-full object-cover object-top"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>
      {/* Dot indicators */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
        {screens.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`rounded-full transition-all duration-300 ${i === idx ? "w-4 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Software Showcase: tabs left, device right ── */
const softwareTabs = [
  {
    id: "web",
    label: "Web App",
    icon: Monitor,
    accent: "text-secondary",
    accentBg: "bg-secondary",
    accentBorder: "border-secondary",
    subtitle: "Web Platform",
    title: "NXT-Fleet Dashboard",
    desc: "A powerful browser-based fleet management platform. Monitor every tractor in real time, track battery health, and manage multiple farms from a single dashboard.",
    features: ["Real-time GPS fleet tracking", "Battery & diagnostics monitoring", "Fleet analytics & performance reports", "Multi-farm management portal"],
    cta: { label: "Request Access", href: "/book", variant: "outline" as const },
    device: "desktop",
  },
  {
    id: "mobile",
    label: "Mobile App",
    icon: Smartphone,
    accent: "text-primary",
    accentBg: "bg-primary",
    accentBorder: "border-primary",
    subtitle: "iOS & Android",
    title: "AutoNxt Service App",
    desc: "Book service, track technicians live, and manage your tractor's complete service history — all from your phone. Available on iOS and Android.",
    features: ["Book & schedule service appointments", "Live technician location tracking", "Complete service history & records", "Spare parts ordering & delivery"],
    cta: { label: "Download App", href: "#", variant: "default" as const },
    device: "mobile",
  },
  {
    id: "tablet",
    label: "Tablet",
    icon: Monitor,
    accent: "text-accent",
    accentBg: "bg-accent",
    accentBorder: "border-accent",
    subtitle: "Analytics Dashboard",
    title: "NXT-Fleet Analytics",
    desc: "Deep fleet analytics on a tablet-optimised interface. Track performance trends, battery cycles, and operational efficiency across your entire fleet — in the field or at the office.",
    features: ["Fleet-wide performance analytics", "Battery health & cycle tracking", "Operational efficiency reports", "Multi-user access control"],
    cta: { label: "Request Access", href: "/book", variant: "outline" as const },
    device: "tablet",
  },
];

function SoftwareShowcase() {
  const [active, setActive] = useState(0);
  const tab = softwareTabs[active];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

      {/* ── LEFT: text + tabs ── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="space-y-8"
      >
        {/* Tab switcher */}
        <div className="flex gap-2 p-1 bg-muted/50 rounded-xl w-fit border border-border">
          {softwareTabs.map((t, i) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                  active === i
                    ? "bg-background text-foreground shadow-sm border border-border"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.28 }}
            className="space-y-6"
          >
            <div>
              <p className={`text-xs font-bold uppercase tracking-widest mb-1.5 ${tab.accent}`}>{tab.subtitle}</p>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{tab.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{tab.desc}</p>
            </div>

            <ul className="space-y-3">
              {tab.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle className={`w-4 h-4 shrink-0 ${tab.accent}`} /> {f}
                </li>
              ))}
            </ul>

            <Link href={tab.cta.href}>
              <Button
                variant={tab.cta.variant}
                className={tab.cta.variant === "outline"
                  ? `${tab.accentBorder} ${tab.accent} hover:${tab.accentBg} hover:text-white font-semibold gap-2`
                  : "bg-primary text-white hover:bg-primary/90 font-semibold gap-2"}
              >
                {tab.cta.label} <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── RIGHT: device mockup ── */}
      <motion.div
        initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full flex justify-center"
          >
            {/* Desktop browser */}
            {tab.device === "desktop" && (
              <div className="w-full rounded-2xl overflow-hidden border border-border shadow-2xl bg-[#1a1a2e]">
                <div className="flex items-center gap-2 px-4 py-3 bg-[#12121f] border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 mx-3 bg-white/10 rounded-md px-3 py-1 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span className="text-white/40 text-[11px] font-mono truncate">fleet.autonxt.in/dashboard</span>
                  </div>
                  <Monitor className="w-3.5 h-3.5 text-white/30" />
                </div>
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <img src={dashboardMain} alt="NXT-Fleet Dashboard" className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/30 to-transparent" />
                  <div className="absolute bottom-3 right-3 w-36 rounded-lg overflow-hidden border border-white/20 shadow-xl">
                    <img src={dashboardService} alt="Service Center" className="w-full object-cover" />
                  </div>
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white/80 text-[10px] font-semibold tracking-wide">LIVE</span>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile phone */}
            {tab.device === "mobile" && (
              <div className="relative w-[240px]">
                <div className="relative rounded-[2.5rem] border-[7px] border-[#1a1a2e] bg-[#1a1a2e] shadow-2xl overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#1a1a2e] rounded-b-2xl z-10" />
                  <div className="bg-[#0d1117] px-4 pt-6 pb-1 flex justify-between items-center">
                    <span className="text-white/50 text-[9px] font-semibold">9:41</span>
                    <div className="flex gap-1 items-center">
                      <div className="w-3 h-1.5 rounded-sm bg-white/40" />
                      <div className="w-1 h-1 rounded-full bg-white/40" />
                    </div>
                  </div>
                  <MobileScreenCarousel screens={[appScreen1, appScreen2, "/images/app/app-screen-3.png", "/images/app/app-screen-4.png", "/images/app/app-screen-5.png", "/images/app/app-screen-6.png"]} />
                  <div className="bg-[#0d1117] py-2 flex justify-center">
                    <div className="w-16 h-1 rounded-full bg-white/30" />
                  </div>
                </div>
                <div className="absolute -right-2 top-20 w-1.5 h-10 bg-[#1a1a2e] rounded-r-md" />
                <div className="absolute -left-2 top-16 w-1.5 h-7 bg-[#1a1a2e] rounded-l-md" />
                <div className="absolute -left-2 top-28 w-1.5 h-7 bg-[#1a1a2e] rounded-l-md" />
              </div>
            )}

            {/* Tablet */}
            {tab.device === "tablet" && (
              <div className="relative w-full max-w-[520px]">
                {/* Tablet outer shell — landscape */}
                <div className="rounded-[2rem] border-[10px] border-[#1a1a2e] bg-[#1a1a2e] shadow-2xl overflow-hidden">
                  {/* Top thin bar with camera */}
                  <div className="bg-[#0d0d1a] h-5 flex items-center justify-center border-b border-white/10">
                    <div className="w-2 h-2 rounded-full bg-white/25" />
                  </div>
                  {/* Screen */}
                  <div className="relative overflow-hidden bg-[#0d1117]" style={{ aspectRatio: "16/10" }}>
                    <img
                      src="/screen.png"
                      alt="NXT-Fleet Analytics"
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Subtle vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                    {/* Status bar */}
                    <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-4 py-1.5 bg-black/50 backdrop-blur-sm">
                      <span className="text-white/70 text-[10px] font-semibold tracking-wide">AutoNxt Fleet</span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-emerald-400 text-[9px] font-bold">LIVE</span>
                        </div>
                        <div className="w-3 h-1.5 rounded-sm bg-white/40" />
                      </div>
                    </div>
                  </div>
                  {/* Bottom bar with home indicator */}
                  <div className="bg-[#0d0d1a] h-5 flex items-center justify-center border-t border-white/10">
                    <div className="w-12 h-1 rounded-full bg-white/20" />
                  </div>
                </div>
                {/* Left side power button */}
                <div className="absolute -left-3 top-16 w-2 h-12 bg-[#1a1a2e] rounded-l-md shadow-md" />
                {/* Right side volume buttons */}
                <div className="absolute -right-3 top-12 w-2 h-8 bg-[#1a1a2e] rounded-r-md shadow-md" />
                <div className="absolute -right-3 top-24 w-2 h-8 bg-[#1a1a2e] rounded-r-md shadow-md" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

    </div>
  );
}

export default SoftwareShowcase;