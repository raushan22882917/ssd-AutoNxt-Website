import { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TractorViewer3D = lazy(
  () => import("@/components/TractorViewer3D")
);


/* ── TECH SHOWCASE TABS ── */
const techTabs = [
  {
    id: "motor",
    label: "Motor",
    glb: "/3dmodel/motor.glb",
    title: "32 kW Electric Motor",
    subtitle: "High-Efficiency Drive System",
    desc: "The X45H2 is powered by a high-efficiency 32 kW electric motor designed for maximum torque and precision. It ensures smooth and powerful performance, making it ideal for heavy-duty agricultural tasks.",
    specs: [
      { label: "Power Output", value: "32 kW" },
      { label: "Torque", value: "Max Torque" },
      { label: "Performance", value: "Precision" },
      { label: "Application", value: "Heavy-Duty" },
    ],
    accent: "text-amber-500",
  },
  {
    id: "battery",
    label: "Battery",
    glb: "/3dmodel/battery.glb",
    title: "38.4 kWh Battery Pack",
    subtitle: "High-Capacity Energy System",
    desc: "Equipped with a 38.4 kWh high-capacity battery, the X45H2 provides 8 hours of continuous operation. Optimized for fast charging and extended lifespan, ensuring reliability in the field.",
    specs: [
      { label: "Capacity", value: "38.4 kWh" },
      { label: "Runtime", value: "8 hrs" },
      { label: "Charging", value: "Fast Charge" },
      { label: "Lifespan", value: "Extended" },
    ],
    accent: "text-blue-500",
  },
];

function TechShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = techTabs[activeTab];

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
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Proprietary Technology</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Built from the Ground Up.</h2>
          
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
        className="relative rounded-2xl overflow-hidden border border-border bg-muted/20 h-[420px]"
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
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <TractorViewer3D src={tab.glb} className="w-full h-full" rotate showHint={false} />
            </Suspense>
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
