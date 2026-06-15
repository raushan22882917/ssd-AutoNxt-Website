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
import { useLang } from "@/contexts/LanguageContext";

const SHOWCASE_ROTATE_MS = 5000;

const TAB_SHOWCASE_IMAGES = [
  {
    images: [
      "/images/mobile/WEB.png",
      "/images/app/dashboard-main.webp",
      "/images/app/dashboard-service.webp",
      "/images/app/app-screen-1.webp",
      "/images/app/app-screen-2.webp",
    ],
    alt: "NXT-Fleet web dashboard",
  },
  {
    images: [
      "/images/mobile/image.png",
      "/images/mobile/image-2.png",
    ],
    alt: "AutoNxt mobile app",
  },
  {
    images: [
      "/images/mobile/TAB.png",
    ],
    alt: "AutoNxt tablet automation dashboard",
  },
] as const;

/* ── STATIC CONFIG FOR SOFTWARE SHOWCASE TABS ── */
const STATIC_SOFTWARE_TABS = [
  {
    id: "web",
    icon: Monitor,
    accent: "text-secondary",
    accentBg: "bg-secondary",
    accentBorder: "border-secondary",
    ctaHref: "/book",
    ctaVariant: "outline" as const,
    device: "desktop",
  },
  {
    id: "mobile",
    icon: Smartphone,
    accent: "text-primary",
    accentBg: "bg-primary",
    accentBorder: "border-primary",
    ctaHref: "#",
    ctaVariant: "default" as const,
    device: "mobile",
  },
  {
    id: "tablet",
    icon: Monitor,
    accent: "text-accent",
    accentBg: "bg-accent",
    accentBorder: "border-accent",
    ctaHref: "/book",
    ctaVariant: "outline" as const,
    device: "tablet",
  },
];

function SoftwareShowcase() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const showcase = TAB_SHOWCASE_IMAGES[active] ?? TAB_SHOWCASE_IMAGES[0];
  const images = showcase.images;

  useEffect(() => {
    setImageIndex(0);
  }, [active]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, SHOWCASE_ROTATE_MS);
    return () => clearInterval(timer);
  }, [active, images.length]);

  const softwareTabs = t.home.softwareTabs.map((tab, i) => {
    const staticConfig = STATIC_SOFTWARE_TABS[i] || STATIC_SOFTWARE_TABS[0];
    return {
      ...staticConfig,
      label: tab.label,
      subtitle: tab.subtitle,
      title: tab.title,
      desc: tab.desc,
      features: tab.features,
      ctaLabel: tab.cta,
    };
  });

  const tab = softwareTabs[active] || softwareTabs[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-10 items-center max-w-7xl mx-auto">

      {/* ── LEFT: text + tabs ── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="space-y-8"
      >
        {/* Tab switcher */}
        <div className="flex gap-1 p-1 bg-muted/60 rounded-xl w-fit border border-border shadow-sm">
          {softwareTabs.map((t, i) => {
            const Icon = t.icon;
            const isActive = active === i;
            return (
              <motion.button
                key={t.id}
                onClick={() => setActive(i)}
                whileHover={!isActive ? { scale: 1.06, y: -1 } : {}}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-colors duration-200 group ${
                  isActive
                    ? "bg-background shadow-md border border-border text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {/* Red hover background glow */}
                {!isActive && (
                  <span className="absolute inset-0 rounded-lg bg-primary/0 group-hover:bg-primary/8 transition-colors duration-200" />
                )}

                <Icon className={`w-4 h-4 relative z-10 transition-colors duration-200 ${
                  isActive ? "text-primary" : "group-hover:text-primary"
                }`} />

                <span className={`relative z-10 transition-colors duration-200 ${
                  isActive ? "text-primary" : "group-hover:text-primary"
                }`}>
                  {t.label}
                </span>

                {/* Active: solid red underline */}
                {isActive && (
                  <motion.span
                    layoutId="activeTabBar"
                    className="absolute bottom-0 left-3 right-3 h-[3px] rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}

                {/* Hover: animated red underline (slides in from left) */}
                {!isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-250" />
                )}
              </motion.button>
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

            <Link href={tab.ctaHref}>
              <Button
                variant={tab.ctaVariant}
                className={tab.ctaVariant === "outline"
                  ? `${tab.accentBorder} ${tab.accent} hover:${tab.accentBg} hover:text-white font-semibold gap-2`
                  : "bg-primary text-white hover:bg-primary/90 font-semibold gap-2"}
              >
                {tab.ctaLabel} <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── RIGHT: tab image carousel (5s when multiple) ── */}
      <motion.div
        initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="flex items-center justify-center w-full"
      >
        <div className="relative w-full">
          {images.map((src, i) => (
            <motion.img
              key={`${active}-${src}`}
              src={src}
              alt={showcase.alt}
              className={`w-full h-auto block ${i === 0 ? "relative" : "absolute inset-0"}`}
              animate={{ opacity: imageIndex === i ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              aria-hidden={imageIndex !== i}
            />
          ))}
        </div>
      </motion.div>

    </div>
  );
}

export default SoftwareShowcase;