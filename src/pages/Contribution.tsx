import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import { Leaf, Wind, TreePine, ArrowRight, ArrowLeft, Award, Handshake, Target } from "lucide-react";
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
      <section className="bg-surface-dark relative overflow-hidden pt-24 pb-0 lg:h-[93.75vh] flex items-center">
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

      <div className="pb-10 md:pb-20">
        <div className="container mx-auto px-4 md:px-6 pt-10 md:pt-16">

          {/* Impact Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-24">
            {impacts.map((impact, i) => {
              const ImpactIcon = impact.icon;
              return (
                <motion.div
                  key={i}
                  className="bg-card border border-border rounded-2xl p-5 md:p-8 text-center hover:border-primary/40 transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <ImpactIcon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <p className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1.5">{impact.value}</p>
                  <p className="font-semibold text-foreground mb-2 text-sm">{impact.label}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{impact.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Key Initiatives */}
          <div className="mb-10 md:mb-24">
            <motion.h2
              className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-8 md:mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {texts.keyInitiatives}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {initiatives.map((item, i) => {
                const InitIcon = item.icon;
                return (
                  <motion.div
                    key={i}
                    className="bg-card border border-border rounded-2xl p-5 md:p-8 hover:border-primary/40 transition-colors group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-4 md:mb-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <InitIcon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                      </div>
                      <span className="text-xs font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-full border border-primary/20">{item.badge}</span>
                    </div>
                    <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* ── CTA ── */}
      <section className="py-12 md:py-20 bg-neutral-100 border-t border-neutral-200 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10 max-w-2xl">
          <motion.div
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl lg:text-5xl font-bold text-neutral-900 mb-3">{texts.joinMovement}</h2>
            <p className="text-neutral-500 text-sm md:text-lg max-w-xl mx-auto mb-6 md:mb-8">
              {texts.joinDesc}
            </p>
            <Button asChild size="lg" className="bg-[#8B1A1A] hover:bg-[#7a1616] text-white font-semibold h-11 md:h-12 px-7 md:px-8 shadow-md">
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
