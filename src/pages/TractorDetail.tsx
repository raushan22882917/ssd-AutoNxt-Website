import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import {
  ArrowRight, ArrowLeft, CheckCircle2, Zap, BatteryCharging,
  Gauge, Shield, Wifi, Clock, Weight, Wrench, Thermometer, Settings, Activity
} from "lucide-react";

const batteryImg = "/images/product-battery.png";
const motorImg = "/images/product-autonomous.png";

const TractorViewer3D = lazy(() => import("@/components/TractorViewer3D"));

const FEATURE_ICONS_MAP: Record<string, React.ElementType[]> = {
  x45h2: [Wifi, Zap],
  x25h2: [Gauge]
};

export default function TractorDetail({ params }: { params: { slug: string } }) {
  const { t } = useLang();
  const slug = params?.slug ?? "x45h2";
  
  const tractorFromT = t.tractorDetailPage.tractors[slug as "x45h2" | "x25h2"] || t.tractorDetailPage.tractors.x45h2;
  const texts = t.tractorDetailPage.texts;

  const specIcons = [Zap, BatteryCharging, Clock, Activity, Gauge, Weight, Settings, Wrench, Thermometer, Shield, Shield];
  const specs = tractorFromT.specs.map((s, i) => ({
    ...s,
    icon: specIcons[i] || Shield
  }));

  const featureIcons = FEATURE_ICONS_MAP[slug] || [Zap];
  const features = tractorFromT.features.map((f, i) => ({
    ...f,
    icon: featureIcons[i] || Zap
  }));

  const tractor = {
    ...tractorFromT,
    specs,
    features,
    image: "/3dmodel/x45.glb",
    glbSrc: "/3dmodel/x45.glb"
  };

  return (
    <div className="w-full min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="bg-surface-dark relative overflow-hidden pt-28 pb-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,hsl(0,72%,40%,0.14),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,hsl(214,65%,32%,0.10),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(hsl(0,0%,100%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,0%,100%) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <Link href="/product" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {texts.allTractors}
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-16">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 mb-5">
                <span className={`text-xs font-bold text-white px-3 py-1.5 rounded-full ${tractor.badgeColor}`}>{tractor.badge}</span>
                {tractor.status === "upcoming" && (
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/15 border border-amber-400/30 px-3 py-1.5 rounded-full">
                    {texts.comingSoon}
                  </span>
                )}
                {tractor.status === "available" && (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-400/15 border border-emerald-400/30 px-3 py-1.5 rounded-full">
                    {texts.availableNow}
                  </span>
                )}
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">{tractor.name}</h1>
              <p className="text-primary font-semibold text-lg mb-5">{tractor.tagline}</p>
              <p className="text-white/55 text-base leading-relaxed mb-8 max-w-lg">{tractor.desc}</p>
              <div className="flex gap-3">
                <Link href="/book">
                  <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold h-12 px-7">
                    {tractor.status === "available" ? texts.reserveNow : texts.registerInterest} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/book">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-12 px-7">
                    {texts.bookTestDrive}
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="relative w-full h-[420px]"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            >
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl scale-150 pointer-events-none" />
                  <img src={tractor.image} alt={tractor.name} className="relative h-64 md:h-80 object-contain drop-shadow-2xl" loading="eager" decoding="async" />
                </div>
              }>
                <TractorViewer3D
                  src={tractor.glbSrc}
                  fallbackSrc={tractor.image}
                  className="w-full h-full"
                  rotate
                  showHint
                />
              </Suspense>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface-dark to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section className="py-12 bg-primary/5 border-b border-primary/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tractor.highlights.map((h, i) => (
              <motion.div key={i} className="flex items-start gap-2"
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground text-xs leading-snug font-medium">{h}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL SPECS ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <motion.div className="flex items-center justify-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">
                {texts.technicalSpecs}
              </p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
            <motion.h2 className="font-display text-3xl md:text-4xl font-bold text-foreground" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              {texts.fullSpecs}{tractor.name}
            </motion.h2>
          </div>
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            {tractor.specs.map((spec, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors text-center">
                <spec.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{spec.label}</p>
                <p className="font-bold text-foreground text-sm">{spec.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <motion.div className="flex items-center justify-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">
                {texts.keyFeatures}
              </p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
            <motion.h2 className="font-display text-3xl font-bold text-foreground" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              {texts.whatSetsApart}
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tractor.features.map((f, i) => (
              <motion.div key={i} className="bg-card border border-border rounded-2xl p-7 hover:border-primary/30 hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BATTERY & MOTOR ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <motion.div className="flex items-center justify-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">
                {texts.coreTech}
              </p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "LFP Battery Pack", img: batteryImg, data: tractor.battery, icon: BatteryCharging },
              { title: "NXT-Drive Motor", img: motorImg, data: tractor.motor, icon: Zap },
            ].map((tech, ti) => (
              <motion.div key={ti} className="bg-card border border-border rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ti * 0.1 }}>
                <div className="bg-muted/40 p-6 flex items-center gap-5 border-b border-border">
                  <div className="w-16 h-16 rounded-xl bg-background border border-border flex items-center justify-center">
                    <img src={tech.img} alt={tech.title} className="w-10 h-10 object-contain" loading="lazy" />
                  </div>
                  <div>
                    <tech.icon className="w-4 h-4 text-primary mb-1" />
                    <h3 className="font-display font-bold text-foreground text-lg">{tech.title}</h3>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {tech.data.map((row, i) => (
                    <div key={i} className="flex items-center justify-between px-6 py-3">
                      <span className="text-muted-foreground text-sm">{row.label}</span>
                      <span className="font-semibold text-foreground text-sm text-right max-w-[55%]">{row.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATIONS ── */}
      <section className="py-20 bg-muted/40 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div className="flex items-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <div className="h-px w-10 bg-primary rounded-full" />
                <p className="text-primary font-bold text-sm uppercase tracking-widest">
                  {texts.applications}
                </p>
              </motion.div>
              <motion.h2 className="font-display text-3xl font-bold text-foreground mb-8" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                {texts.whereWorksBest}
              </motion.h2>
              <ul className="space-y-3">
                {tractor.applications.map((a, i) => (
                  <motion.li key={i} className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-muted-foreground text-sm">{a}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <motion.div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-all"
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <h3 className="font-display font-bold text-foreground text-xl mb-4">{texts.costComparison5Year}</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-muted-foreground mb-1.5">
                      <span>{texts.dieselTractor45HP}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-full bg-red-500/60" />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">{texts.dieselFuelMaint}</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-foreground mb-1.5">
                      <span>AutoNxt X45H2</span>
                      <span className="text-primary">{texts.dieselSavingsNote}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-1/5 bg-primary" />
                    </div>
                    <p className="text-[10px] text-primary mt-1 font-medium">{texts.electricFuelMaint}</p>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground">{texts.basedOnUsageNote}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0,72%,30%,0.5),transparent_65%)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10 max-w-xl">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              {tractor.status === "available" ? texts.getTractor : texts.registerTractor}
            </h2>
            <p className="text-white/70 text-base mb-8">
              {tractor.status === "available" ? texts.ctaDescAvailable : texts.ctaDescUpcoming}
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/book">
                <Button size="lg" className="bg-white text-primary hover:bg-white/95 font-semibold h-12 px-8">
                  {tractor.status === "available" ? texts.reserveNow : texts.registerInterest} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
