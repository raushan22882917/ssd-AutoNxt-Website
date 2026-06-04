import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import {
  ArrowRight, Zap, BatteryCharging, Activity,
  Factory, Building2, Hammer, Shield, PlaneTakeoff, Leaf,
  CheckCircle2, Clock, ChevronRight,
} from "lucide-react";

export default function Industry() {
  const { t } = useLang();
  
  const industryIcons = [Leaf, Building2, Hammer, Shield, PlaneTakeoff, Factory];
  const industries = t.industryPage.industries.map((ind, i) => ({
    ...ind,
    icon: industryIcons[i] || Leaf
  }));

  const specIcons = [Zap, BatteryCharging, Activity];
  const tractors = t.industryPage.tractors.map((tractor) => ({
    ...tractor,
    specs: tractor.specs.map((s, idx) => ({
      ...s,
      icon: specIcons[idx] || Zap
    }))
  }));

  const texts = t.industryPage.texts;

  return (
    <div className="w-full min-h-screen">
      <SEO title={t.nav.industry} description="Explore AutoNxt electric utility vehicles across different sectors: agriculture, construction, airports, biomass, metal, and defense." />

      {/* ── HERO ── */}
      <section className="bg-surface-dark relative overflow-hidden pt-28 pb-0 lg:h-[87.5vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,hsl(0,72%,40%,0.12),transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,hsl(214,65%,32%,0.10),transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(hsl(0,0%,100%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,0%,100%) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div className="pb-16">
              <motion.div
                className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-4 py-1.5 mb-6"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-xs font-bold uppercase tracking-widest">
                  {texts.indSol}
                </span>
              </motion.div>
              <motion.h1
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.06]"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              >
                {texts.heroTitlePre}
                <span className="text-primary">{texts.heroTitleHighlight}</span>
                {texts.heroTitlePost}
              </motion.h1>
              <motion.p
                className="text-white/55 text-lg max-w-lg leading-relaxed mb-10"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
              >
                {texts.heroDesc}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}
              >
                {[
                  { icon: Building2, label: texts.industriesLabel, value: "6+" },
                  { icon: Factory, label: texts.applicationsLabel, value: "50+" },
                  { icon: Shield, label: texts.certifiedLabel, value: "iCAT" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center">
                      <f.icon className="w-4 h-4 text-white/60" />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest font-medium">{f.label}</p>
                      <p className="text-white font-bold text-sm">{f.value}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div
              className="relative pb-0 hidden lg:block"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            >
              <div className="grid grid-cols-3 gap-2 h-[420px]">
                <div className="col-span-2 row-span-2 rounded-tl-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=700&h=500&fit=crop&q=80&auto=format" alt="Biomass operations" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-tr-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop&q=80&auto=format" alt="Cement plant" className="w-full h-full object-cover" />
                </div>
                <div className="overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=250&fit=crop&q=80&auto=format" alt="Construction site" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface-dark to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── OUR SOLUTIONS ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <motion.div
                className="flex items-center gap-3 mb-3"
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              >
                <div className="h-px w-10 bg-primary rounded-full" />
                <p className="text-primary font-bold text-sm uppercase tracking-widest">
                  {texts.ourSolutions}
                </p>
              </motion.div>
              <motion.h2
                className="font-display text-3xl md:text-4xl font-bold text-foreground"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              >
                {texts.solHeading}
              </motion.h2>
            </div>
            <motion.p
              className="text-muted-foreground max-w-sm lg:text-right"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            >
              {texts.solDesc}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <motion.div
                  key={i}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
                  initial={{ opacity: 0, y: 36, rotateX: 12 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                  whileHover={{ rotateY: 5, rotateX: -4, scale: 1.03, y: -8, transition: { type: "spring", stiffness: 300, damping: 22 } }}
                  style={{ transformPerspective: 900, transformStyle: "preserve-3d" }}
                >
                  {/* Photo header */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={ind.img}
                      alt={ind.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    {/* Icon badge */}
                    <div className={`absolute bottom-3 left-3 w-[36px] h-[36px] rounded-xl ${ind.bg} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-[18px] h-[18px] text-white" />
                    </div>
                    {/* Short label */}
                    <span className="absolute top-3 right-3 text-[9px] font-bold text-white/80 tracking-widest uppercase bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
                      {ind.short}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{ind.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">{ind.detail}</p>
                    <div className="mt-5 pt-4 border-t border-border">
                      <Link href={`/industry/${ind.slug}`} className="inline-flex items-center text-sm font-semibold text-primary hover:gap-2 gap-1 transition-all" aria-label={`${texts.learnMore} about ${ind.title}`}>
                        {texts.learnMore} <span className="sr-only"> about {ind.title}</span> <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── OUR TRACTORS ── */}
      <section className="py-24 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <motion.div
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-5"
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            >
              <span className="text-primary text-xs font-bold uppercase tracking-widest">
                {texts.ourTractors}
              </span>
            </motion.div>
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              {texts.tractorsHeading}
            </motion.h2>
            <motion.p
              className="text-muted-foreground max-w-xl mx-auto"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            >
              {texts.tractorsDesc}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
            {tractors.map((t, i) => (
              <motion.div
                key={i}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 40, rotateX: 14 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ rotateY: i === 1 ? 0 : i === 0 ? 5 : -5, rotateX: -3, scale: 1.02, y: -10, transition: { type: "spring", stiffness: 280, damping: 22 } }}
                style={{ transformPerspective: 1000, transformStyle: "preserve-3d" }}
              >
                {/* Image area */}
                <div className={`relative ${t.accentBg} border-b ${t.accentBorder} p-8 flex items-center justify-center h-52`}>
                  {/* Status badge */}
                  <div className={`absolute top-4 left-4 inline-flex items-center gap-1.5 ${t.tagColor} text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm`}>
                    {t.status === "available"
                      ? <CheckCircle2 className="w-3 h-3" />
                      : <Clock className="w-3 h-3" />
                    }
                    {t.statusLabel}
                  </div>
                  {/* HP badge */}
                  <div className="absolute top-4 right-4 bg-foreground text-background text-xs font-black px-2.5 py-1 rounded-lg">
                    {t.hp}
                  </div>
                  <img
                    src={t.img}
                    alt={t.name}
                    className="h-36 object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
                    {texts.electricTractor} · {t.hp}
                  </p>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{t.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{t.desc}</p>

                  {/* Spec chips */}
                  <div className="flex flex-wrap gap-2 mb-5 mt-auto">
                    {t.specs.map((s, si) => {
                      const SpecIcon = s.icon;
                      return (
                        <div key={si} className="inline-flex items-center gap-1.5 bg-muted rounded-lg px-3 py-1.5 border border-border">
                          <SpecIcon className="w-3 h-3 text-primary shrink-0" />
                          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{s.label}</span>
                          <span className="text-[11px] font-bold text-foreground">{s.value}</span>
                        </div>
                      );
                    })}
                  </div>

                  <Button asChild
                    size="sm"
                    className={`w-full transition-all ${t.status === "available" ? "bg-primary text-white hover:bg-primary/90" : "bg-background border border-border text-muted-foreground hover:border-foreground/20 hover:bg-muted/50"}`}
                  >
                    <Link href={`/product/${t.slug}`}>
                      {texts.viewDetails} <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CUSTOM INQUIRY ── */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0,72%,30%,0.5),transparent_65%)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              {texts.dontSeeSector}
            </h2>
            <p className="text-white/70 text-base mb-8">
              {texts.ctaDesc}
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/95 font-semibold h-12 px-8">
              <Link href="/book">
                {texts.talkToUs} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
