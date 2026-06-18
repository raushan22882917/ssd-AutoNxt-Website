import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { BlurDivider } from "@/components/ui/blur-divider";
import {
  ArrowRight, Zap, BatteryCharging, Activity,
  Factory, Building2, Hammer, Shield, PlaneTakeoff, Leaf,
  CheckCircle2, Clock, ChevronRight,
} from "lucide-react";

export default function Industry() {
  const { t } = useLang();
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);
  
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
      <section className="bg-background relative overflow-hidden pt-10 pb-0 md:pt-14 lg:h-[93.75vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,hsl(0,72%,40%,0.12),transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,hsl(214,65%,32%,0.10),transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(hsl(0,0%,0%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,0%,0%) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[0.5cm] lg:gap-9 items-end lg:items-start">
            <div className="pt-8 lg:pt-0 pb-0 lg:pb-0">
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
                className="font-display text-[1.55rem] sm:text-[2.1rem] md:text-[2.5rem] lg:text-[2.9rem] xl:text-[3.2rem] font-bold text-foreground mb-6 leading-[1.08] tracking-tight"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              >
                {texts.heroTitlePre}
                <span className="text-primary">{texts.heroTitleHighlight}</span>
                {texts.heroTitlePost}
              </motion.h1>
              <motion.p
                className="text-muted-foreground text-[12px] sm:text-sm md:text-base font-bold max-w-lg leading-relaxed mb-0"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
              >
                {texts.heroDesc}
              </motion.p>
              {/* Fact cards — horizontal row below description (visible only on desktop) */}
              <motion.div 
                className="hidden lg:flex flex-row gap-2 mt-8 w-full"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 }}
              >
                {[
                  { icon: Building2, label: texts.industriesLabel, value: "6+" },
                  { icon: Factory, label: texts.applicationsLabel, value: "250+" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 flex-1 py-1">
                    <f.icon className="w-4 h-4 text-neutral-500 flex-shrink-0" strokeWidth={2} />
                    <div className="min-w-0">
                      <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider leading-none truncate">{f.label}</p>
                      <p className="text-sm sm:text-base font-bold text-black mt-1 leading-tight truncate">{f.value}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div
              className="relative pb-0 w-full z-10"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            >
              {/* Collage grid with merge gradients */}
              <div className="relative w-full aspect-[1675/939] lg:aspect-auto lg:h-[420px]">
                <div className="grid grid-cols-3 gap-2 h-full lg:h-[420px] w-full">
                  <div className="col-span-2 row-span-2 rounded-xl lg:rounded-tl-2xl overflow-hidden relative">
                    <img
                      src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=700&h=500&fit=crop&q=80&auto=format"
                      alt="Biomass operations" width={700} height={500} fetchPriority="high"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-tr-xl lg:rounded-tr-2xl overflow-hidden relative">
                    <img
                      src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop&q=80&auto=format"
                      alt="Cement plant" width={400} height={250}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden relative rounded-br-xl lg:rounded-none">
                    <img
                      src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=250&fit=crop&q=80&auto=format"
                      alt="Construction site" width={400} height={250}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Top gradient — blends image top edge into background */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
              </div>
              {/* Fact cards — horizontal row below image (hidden on desktop) */}
              <div className="flex lg:hidden flex-row gap-2 mt-3 w-full">
                {[
                  { icon: Building2, label: texts.industriesLabel, value: "6+" },
                  { icon: Factory, label: texts.applicationsLabel, value: "250+" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 flex-1 py-1">
                    <f.icon className="w-4 h-4 text-neutral-500 flex-shrink-0" strokeWidth={2} />
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none truncate">{f.label}</p>
                      <p className="text-xs sm:text-sm font-bold text-foreground mt-1 leading-tight truncate">{f.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <BlurDivider />

      {/* ── OUR SOLUTIONS ── */}
      <section className="pt-12 pb-12 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6 sm:mb-12">
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
                  initial={isDesktop ? { opacity: 0, y: 36, rotateX: 12 } : { opacity: 0, y: 36 }}
                  whileInView={isDesktop ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                  whileHover={isDesktop ? { rotateY: 5, rotateX: -4, scale: 1.03, y: -8, transition: { type: "spring", stiffness: 300, damping: 22 } } : { scale: 1.03, y: -8, transition: { type: "spring", stiffness: 300, damping: 22 } }}
                  style={isDesktop ? { transformPerspective: 900, transformStyle: "preserve-3d" } : undefined}
                >
                  {/* Photo header */}
                  <div className="relative w-full lg:aspect-[8/5] overflow-hidden">
                    <img
                      src={ind.img}
                      alt={ind.title}
                      width={400}
                      height={250}
                      loading="lazy"
                      className="w-full h-auto lg:h-full block lg:object-cover group-hover:scale-105 transition-transform duration-700"
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
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{ind.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">{ind.detail}</p>
                    <div className="mt-3.5 lg:mt-5 pt-3 lg:pt-4 border-t border-border">
                      <Link href={`/industry/${ind.slug}`} className="inline-flex items-center text-xs lg:text-sm font-semibold text-primary hover:gap-2 gap-1 transition-all" aria-label={`${texts.learnMore} about ${ind.title}`}>
                        {texts.learnMore} <span className="sr-only"> about {ind.title}</span> <ChevronRight className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <BlurDivider />

      {/* ── OUR TRACTORS ── */}
      <section className="pt-6 pb-12 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-6 sm:mb-14">
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
                initial={isDesktop ? { opacity: 0, y: 40, rotateX: 14 } : { opacity: 0, y: 40 }}
                whileInView={isDesktop ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                whileHover={isDesktop ? { rotateY: i === 1 ? 0 : i === 0 ? 5 : -5, rotateX: -3, scale: 1.02, y: -10, transition: { type: "spring", stiffness: 280, damping: 22 } } : { scale: 1.02, y: -10, transition: { type: "spring", stiffness: 280, damping: 22 } }}
                style={isDesktop ? { transformPerspective: 1000, transformStyle: "preserve-3d" } : undefined}
              >
                {/* Image area */}
                <div className={`relative ${t.accentBg} border-b ${t.accentBorder} py-3 lg:p-8 px-6 lg:px-8 flex items-center justify-center h-[10.5rem] lg:h-52`}>
                  {/* Status badge */}
                  <div className={`absolute top-3 lg:top-4 left-3 lg:left-4 inline-flex items-center gap-1 lg:gap-1.5 ${t.tagColor} text-white text-[9px] lg:text-[10px] font-bold uppercase tracking-widest px-2.5 lg:px-3 py-0.5 lg:py-1 rounded-full shadow-sm`}>
                    {t.status === "available"
                      ? <CheckCircle2 className="w-2.5 lg:w-3 h-2.5 lg:h-3" />
                      : <Clock className="w-2.5 lg:w-3 h-2.5 lg:h-3" />
                    }
                    {t.statusLabel}
                  </div>
                  {/* HP badge */}
                  <div className="absolute top-3 lg:top-4 right-3 lg:right-4 bg-foreground text-background text-[11px] lg:text-xs font-black px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-md lg:rounded-lg">
                    {t.hp}
                  </div>
                  <img
                    src={t.img}
                    alt={t.name}
                    width={300}
                    height={144}
                    loading="lazy"
                    className="h-36 object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                  />
                </div>

                {/* Content */}
                <div className="p-4 lg:p-4.5 flex flex-col flex-1">
                  <p className="text-[9px] lg:text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5 lg:mb-1">
                    {texts.electricTractor} · {t.hp}
                  </p>
                  <h3 className="font-display text-lg lg:text-xl font-bold text-foreground mb-1 lg:mb-2 group-hover:text-primary transition-colors">{t.name}</h3>
                  <p className="text-muted-foreground text-xs lg:text-sm leading-relaxed mb-4 lg:mb-5">{t.desc}</p>

                  {/* Spec chips */}
                  <div className="flex flex-wrap gap-1.5 lg:gap-2 mb-4 lg:mb-5 mt-auto">
                    {t.specs.map((s, si) => {
                      const SpecIcon = s.icon;
                      return (
                        <div key={si} className="inline-flex items-center gap-1 lg:gap-1.5 bg-muted rounded-lg px-2 lg:px-3 py-1 lg:py-1.5 border border-border">
                          <SpecIcon className="w-2.5 lg:w-3 h-2.5 lg:h-3 text-primary shrink-0" />
                          <span className="text-[9px] lg:text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{s.label}</span>
                          <span className="text-[10px] lg:text-[11px] font-bold text-foreground">{s.value}</span>
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

      <BlurDivider />

      {/* ── CUSTOM INQUIRY ── */}
      <section className="pt-6 pb-12 bg-neutral-100 border-t border-neutral-200 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
              {texts.dontSeeSector}
            </h2>
            <p className="text-neutral-500 text-base mb-4">
              {texts.ctaDesc}
            </p>
            <Button asChild size="lg" className="bg-[#8B1A1A] hover:bg-[#7a1616] text-white font-semibold h-12 px-8 shadow-md">
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
