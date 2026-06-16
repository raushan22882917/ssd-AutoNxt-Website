import { useEffect, useState } from "react";
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

const TAB_SHOWCASE_IMAGES = [
  {
    images: ["/images/mobile/dahbaord.png"],
    alt: "NXT-Fleet web dashboard",
  },
  {
    images: ["/images/mobile/phone1.png", "/images/mobile/phone2.png"],
    alt: "AutoNxt mobile app",
  },
  {
    images: ["/images/mobile/ttab.png"],
    alt: "AutoNxt tablet automation dashboard",
  },
] as const;

const SHOWCASE_ROTATE_MS = 4500;

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
  const currentImage = showcase.images[imageIndex] ?? showcase.images[0];

  useEffect(() => {
    setImageIndex(0);
  }, [active]);

  useEffect(() => {
    if (showcase.images.length <= 1) return;
    const timer = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % showcase.images.length);
    }, SHOWCASE_ROTATE_MS);
    return () => clearInterval(timer);
  }, [showcase.images.length, active]);

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
    <div className="relative w-full min-h-[540px] md:min-h-[640px] overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImage}
          src={currentImage}
          alt={showcase.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 w-full h-full object-contain bg-background"
        />
      </AnimatePresence>

      <div className="relative z-10 h-full">
        <div className="container mx-auto px-4 md:px-8 h-full py-6 sm:py-8 md:py-10 lg:py-12 flex flex-col">
          {/* Tab switcher */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="flex gap-1 p-1 bg-muted/80 rounded-xl w-fit border border-border shadow-sm"
          >
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
                      ? "bg-white text-primary"
                      : "text-foreground/80"
                  }`}
                >
                  {!isActive && (
                    <span className="absolute inset-0 rounded-lg bg-primary/0 group-hover:bg-primary/8 transition-colors duration-200" />
                  )}
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">{t.label}</span>
                </motion.button>
              );
            })}
          </motion.div>

          <div className="flex-1 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28 }}
                className="w-full max-w-xl space-y-6 mt-6"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1.5 text-foreground/70">{tab.subtitle}</p>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{tab.title}</h3>
                  <p className="text-foreground/85 text-lg leading-relaxed">{tab.desc}</p>
                </div>

                <ul className="space-y-3">
                  {tab.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-foreground/85">
                      <CheckCircle className="w-4 h-4 shrink-0 text-primary" /> {f}
                    </li>
                  ))}
                </ul>

                <Link href={tab.ctaHref}>
                  <Button className="bg-white text-foreground hover:bg-white/90 font-semibold gap-2">
                    {tab.ctaLabel} <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SoftwareShowcase;