import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import { Leaf, Wind, TreePine, ArrowRight, ArrowLeft, Award, Handshake, Target, ChevronDown, Compass, Milestone } from "lucide-react";
import SEO from "@/components/SEO";

export default function Contribution() {
  const { t, lang } = useLang();

  const impactIcons = [Leaf, Wind, TreePine];
  const impacts = t.contributionPage.impacts.map((imp, i) => ({
    ...imp,
    icon: impactIcons[i] || Leaf,
  }));

  const initiativeIcons = [Target, Handshake, Award];
  const initiatives = t.contributionPage.initiatives.map((init, i) => ({
    ...init,
    icon: initiativeIcons[i] || Target,
  }));

  const timeline = t.contributionPage.timeline;
  const texts = t.contributionPage.texts;

  const statIcons = [Leaf, TreePine, Target];
  const stats = t.contributionPage.stats.map((s, i) => ({
    ...s,
    icon: statIcons[i] || Leaf,
  }));


  return (
    <div className="w-full min-h-screen bg-background">
      <SEO title={t.nav.contribution} description="Discover the ESG impact, carbon footprint reduction, and environmental contributions of AutoNxt electric tractors." />

      {/* ── HERO ── */}
      <section className="bg-surface-dark relative overflow-hidden pt-28 pb-0 lg:h-[87.5vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,hsl(134,72%,30%,0.10),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,hsl(214,65%,32%,0.09),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(hsl(0,0%,100%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,0%,100%) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div className="pb-16">
              <motion.div
                className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/25 rounded-full px-4 py-1.5 mb-6"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">{texts.contribBadge}</span>
              </motion.div>
              <motion.h1
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.06]"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              >
                {texts.heroTitlePre}<span className="text-primary">{texts.heroTitleHighlight}</span>{texts.heroTitlePost}
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
                {stats.map((f, i) => (
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
                  <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&h=500&fit=crop&q=80&auto=format" alt="Green fields" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-tr-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=250&fit=crop&q=80&auto=format" alt="Forest" className="w-full h-full object-cover" />
                </div>
                <div className="overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=400&h=250&fit=crop&q=80&auto=format" alt="Nature" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface-dark to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="pb-20">
        <div className="container mx-auto px-4 md:px-6 pt-16">

          {/* Impact Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {impacts.map((impact, i) => {
              const ImpactIcon = impact.icon;
              return (
                <motion.div
                  key={i}
                  className="bg-card border border-border rounded-2xl p-8 text-center hover:border-primary/40 transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <ImpactIcon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-display text-4xl font-bold text-foreground mb-2">{impact.value}</p>
                  <p className="font-semibold text-foreground mb-3 text-sm">{impact.label}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{impact.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Key Initiatives */}
          <div className="mb-24">
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {texts.keyInitiatives}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {initiatives.map((item, i) => {
                const InitIcon = item.icon;
                return (
                  <motion.div
                    key={i}
                    className="bg-card border border-border rounded-2xl p-8 hover:border-primary/40 transition-colors group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <InitIcon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">{item.badge}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
      </div>
    </div>

      {/* ── OUR JOURNEY ── */}
      <section className="py-24 bg-[#f5e6e6] dark:bg-[#1a0f0f] border-y border-red-200/30 dark:border-red-950/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015),transparent_65%)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex justify-center mb-16">
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-red-950 dark:text-red-50 text-center flex items-center justify-center gap-3 cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Compass className="w-8 h-8 text-primary" />
              {texts.ourJourney}
            </motion.h2>
          </div>
          
          <div className="relative">
            {/* SVG Flowchart Arrow Marker Definitions */}
            <svg className="absolute w-0 h-0 pointer-events-none">
              <defs>
                <marker id="arrow-desktop" viewBox="0 0 10 10" refX="16" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 1 2 L 7 5 L 1 8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
                <marker id="arrow-mobile" viewBox="0 0 10 10" refX="16" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 1 2 L 7 5 L 1 8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
              </defs>
            </svg>

            <div className="space-y-6 relative z-10">
              {timeline.map((item, i) => {
                const parts = item.event.split(" — ");
                const title = parts[0];
                const desc = parts[1] || "";
                const isEven = i % 2 === 0;
                
                // Alternating color classes optimized for the light red-black (#f5e6e6) background
                const cardStyles = isEven
                  ? {
                      bg: "bg-red-50/60 dark:bg-red-950/20 border-red-200/50 dark:border-red-900/30",
                      yearText: "text-red-600 dark:text-red-400",
                      titleText: "text-red-950 dark:text-red-50",
                      descText: "text-red-900/80 dark:text-red-200/80",
                      badge: "bg-red-100/60 dark:bg-red-900/40 text-red-800 dark:text-red-200",
                      glow: "shadow-[0_0_15px_rgba(239,68,68,0.02)]",
                      dot: "bg-red-500 ring-red-100/80 dark:ring-red-950/50"
                    }
                  : {
                      bg: "bg-blue-50/60 dark:bg-blue-950/20 border-blue-200/50 dark:border-blue-900/30",
                      yearText: "text-blue-600 dark:text-blue-400",
                      titleText: "text-blue-950 dark:text-blue-50",
                      descText: "text-blue-900/80 dark:text-blue-200/80",
                      badge: "bg-blue-100/60 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200",
                      glow: "shadow-[0_0_15px_rgba(59,130,246,0.02)]",
                      dot: "bg-blue-500 ring-blue-100/80 dark:ring-blue-900/50"
                    };

                return (
                  <motion.div
                    key={i}
                    className={`flex flex-col md:flex-row gap-6 md:gap-0 items-start md:items-center relative ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    {/* Zigzag connecting arrow to the next node (except for the last item) */}
                    {i < timeline.length - 1 && (
                      <>
                        {/* Mobile straight arrow */}
                        <svg 
                          className="absolute block md:hidden pointer-events-none z-10 select-none overflow-visible"
                          style={{ top: "50%", left: 0, width: "100%", height: "100%" }}
                        >
                          <line 
                            x1="24" 
                            y1="0" 
                            x2="24" 
                            y2="100%" 
                            stroke="currentColor" 
                            strokeWidth="1.5" 
                            strokeDasharray="4"
                            markerEnd="url(#arrow-mobile)"
                            className="text-red-200/70 dark:text-red-950/30"
                          />
                        </svg>

                        {/* Desktop zigzag diagonal arrow */}
                        <svg 
                          className="absolute hidden md:block pointer-events-none z-10 select-none overflow-visible"
                          style={{ top: "50%", left: 0, width: "100%", height: "100%" }}
                        >
                          <line 
                            x1={isEven ? "45%" : "55%"} 
                            y1="0" 
                            x2={isEven ? "55%" : "45%"} 
                            y2="100%" 
                            stroke="currentColor" 
                            strokeWidth="1.5" 
                            strokeDasharray="4"
                            markerEnd="url(#arrow-desktop)"
                            className="text-red-200/70 dark:text-red-950/30"
                          />
                        </svg>
                      </>
                    )}

                    {/* Card Wrapper */}
                    <div className={`w-full md:w-[45%] pl-14 md:pl-0 ${isEven ? "md:pr-8" : "md:pl-8"}`}>
                      <div className={`w-full max-w-[320px] border rounded-2xl p-4.5 ${cardStyles.bg} ${cardStyles.glow} hover:shadow-md transition-all duration-300 relative group ${
                        isEven ? "ml-auto" : "mr-auto"
                      }`}>
                        
                        {/* Year & Badge */}
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wider uppercase ${cardStyles.badge}`}>
                            {item.year}
                          </span>
                        </div>
                        
                        {/* Title */}
                        <h3 className={`font-display text-sm font-bold mb-1 leading-snug ${cardStyles.titleText}`}>
                          {title}
                        </h3>
                        
                        {/* Description */}
                        <p className={`text-[11px] leading-relaxed ${cardStyles.descText}`}>
                          {desc}
                        </p>
                      </div>
                    </div>

                    {/* Timeline Central/Edge Dot */}
                    <div className={`absolute ${
                      isEven ? "md:left-[45%]" : "md:left-[55%]"
                    } left-6 -translate-x-1/2 w-4 h-4 rounded-full ${cardStyles.dot} border-2 border-[#f5e6e6] dark:border-[#1a0f0f] ring-4 ring-red-100 dark:ring-red-950/40 shrink-0 z-20 flex items-center justify-center top-1/2 -translate-y-1/2`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    
                    {/* Spacer to push opposite content */}
                    <div className="hidden md:block w-[45%]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-background border-t border-border relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10 max-w-2xl">
          <motion.div
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">{texts.joinMovement}</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              {texts.joinDesc}
            </p>
            <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold h-12 px-8">
              <Link href="/book">
                {texts.partnerBtn} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
