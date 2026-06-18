import { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

const TractorViewer3D = lazy(
  () => import("@/components/TractorViewer3D")
);

/* ── STATIC CONFIG FOR TECH SHOWCASE TABS ── */
const STATIC_TECH_TABS = [
  {
    id: "motor",
    glb: "/3dmodel/motor.glb",
    // Static fallback image shown on mobile instead of loading three.js
    image: "/images/products/motor.webp",
    accent: "text-amber-500",
  },
  {
    id: "battery",
    glb: "/3dmodel/battery.glb",
    image: "/images/products/battery.webp",
    accent: "text-blue-500",
  },
];

function TechShowcase() {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState(0);

  // Detect mobile — motor/battery 3D skipped on mobile to prevent main-thread block
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  const techTabs = t.home.techTabs.map((tab, i) => {
    const staticConfig = STATIC_TECH_TABS[i] || STATIC_TECH_TABS[0];
    return {
      ...staticConfig,
      label: tab.label,
      title: tab.title,
      subtitle: tab.subtitle,
      desc: tab.desc,
      specs: tab.specs,
    };
  });

  const tab = techTabs[activeTab] || techTabs[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left: info */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div>
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            {t.home.techTag}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.home.techHeading}
          </h2>
          
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-muted/50 rounded-xl w-fit border border-border">
          {techTabs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(i)}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                activeTab === i
                  ? "bg-background text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            <div>
              <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${tab.accent}`}>{tab.subtitle}</p>
              <h3 className="text-2xl font-bold text-foreground">{tab.title}</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">{tab.desc}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {tab.specs.map((s) => (
                <div key={s.label} className="bg-muted/40 rounded-xl p-4 border border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{s.label}</p>
                  <p className={`text-lg font-bold ${tab.accent}`}>{s.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Right: 3D viewer */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative rounded-2xl overflow-hidden border border-border bg-muted/20 w-full aspect-[4/3] lg:aspect-auto lg:h-[420px]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.glb}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {isMobile ? (
              /* Static image on mobile — motor/battery 3D not loaded */
              <div className="w-full h-full flex items-center justify-center p-6">
                <img
                  src={tab.image}
                  alt={tab.title}
                  className="max-h-[80%] w-auto object-contain drop-shadow-xl"
                  loading="lazy"
                />
              </div>
            ) : (
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              }>
                <TractorViewer3D src={tab.glb} className="w-full h-full" rotate showHint={false} />
              </Suspense>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Label overlay */}
        <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
          <div className="bg-black/60 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
            <p className={`text-xs font-bold uppercase tracking-widest mb-0.5 ${tab.accent}`}>{tab.subtitle}</p>
            <p className="text-white font-semibold text-sm">{tab.title}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
export default TechShowcase;
