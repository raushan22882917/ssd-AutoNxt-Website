import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import { ArrowRight, MapPin, Clock, Briefcase, Zap, Users, Rocket, Heart } from "lucide-react";
import SEO from "@/components/SEO";
import { BlurDivider } from "@/components/ui/blur-divider";

const DEPT_COLORS: Record<string, string> = {
  Engineering: "bg-blue-50 text-blue-700 border border-blue-200",
  Operations: "bg-amber-50 text-amber-700 border border-amber-200",
  Sales: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Marketing: "bg-purple-50 text-purple-700 border border-purple-200",
};

export default function Careers() {
  const { t } = useLang();
  const texts = t.careersPage.texts;
  const roles = t.careersPage.roles;

  const perkIcons = [Zap, Rocket, Users, Heart];
  const perks = t.careersPage.perks.map((p, i) => ({
    ...p,
    icon: perkIcons[i] || Zap,
  }));

  return (
    <div className="w-full min-h-screen bg-background">
      <SEO title={t.nav.resources + " - " + t.common.careers} description="Join the revolution at AutoNxt Automation. Explore career opportunities in building smart electric mobility and sustainable agriculture technology." />

      {/* ── HERO ── */}
      <section className="bg-background relative overflow-hidden pt-10 pb-0 md:pt-14 lg:pt-[18px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,hsl(0,72%,40%,0.12),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,hsl(214,65%,32%,0.09),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(hsl(0,0%,0%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,0%,0%) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[0.5cm] lg:gap-9 items-end">
            <div className="pt-8 lg:pt-16 pb-0 lg:pb-16">
              <motion.div
                className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-4 py-1.5 mb-6"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-xs font-bold uppercase tracking-widest">{texts.careersBadge}</span>
              </motion.div>
              <motion.h1
                className="font-display text-[1.55rem] sm:text-[2.1rem] md:text-[2.5rem] lg:text-[2.9rem] xl:text-[3.2rem] font-bold text-foreground mb-6 leading-[1.08] tracking-tight"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              >
                {texts.heroTitle1}<span className="text-primary">{texts.heroTitleHighlight}</span><br />{texts.heroTitle2}
              </motion.h1>
              <motion.p
                className="text-muted-foreground text-[12px] sm:text-sm md:text-base font-bold max-w-lg leading-relaxed mb-0"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
              >
                {texts.heroDesc}
              </motion.p>
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
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80"
                      alt="Engineers at work"
                      className="w-full h-full object-cover"
                      loading="eager" decoding="async"
                    />
                  </div>
                  <div className="rounded-tr-xl lg:rounded-tr-2xl overflow-hidden relative">
                    <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80"
                      alt="Team collaboration"
                      className="w-full h-full object-cover"
                      loading="eager" decoding="async"
                    />
                  </div>
                  <div className="overflow-hidden relative rounded-br-xl lg:rounded-none">
                    <img
                      src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=500&q=80"
                      alt="Field work"
                      className="w-full h-full object-cover"
                      loading="eager" decoding="async"
                    />
                  </div>
                </div>
                {/* Top gradient — blends image top edge into background */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
              </div>
              {/* Fact cards — horizontal row below image */}
              <div className="flex flex-row gap-2 mt-3 w-full">
                {[
                  { icon: Briefcase, label: texts.openRolesLabel, value: `${roles.length}${texts.positionsCount}` },
                  { icon: MapPin, label: texts.locationsLabel, value: texts.locationsVal },
                  { icon: Users, label: texts.teamSizeLabel, value: texts.teamSizeVal },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 flex-1 rounded-lg border border-border bg-card shadow-sm px-3 py-2">
                    <f.icon className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} />
                    <div className="min-w-0">
                      <p className="text-[9px] font-bold text-foreground leading-tight truncate">{f.value}</p>
                      <p className="text-[8px] text-muted-foreground leading-none truncate">{f.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <BlurDivider />

      {/* ── WHY AUTONXT ── */}
      <section className="pt-12 pb-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <motion.div className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">{texts.whyJoinUs}</p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
            <motion.h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              {texts.workOnProblems}
            </motion.h2>
            <motion.p className="text-muted-foreground"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              {texts.whyJoinUsDesc}
            </motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {perks.map((p, i) => {
              const PerkIcon = p.icon;
              return (
                <motion.div
                  key={i}
                  className={`bg-card border ${p.border} rounded-2xl p-5 hover:shadow-lg transition-all`}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                >
                  <div className={`w-10 h-10 rounded-xl ${p.bg} flex items-center justify-center mb-4`}>
                    <PerkIcon className={`w-[20px] h-[20px] ${p.color}`} />
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-2">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <BlurDivider />

      {/* ── OPEN ROLES ── */}
      <section className="pt-12 pb-24 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <motion.div className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">{texts.openPositions}</p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
            <motion.h2 className="font-display text-3xl md:text-4xl font-bold text-foreground"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              {roles.length}{texts.rolesAvailable}
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {roles.map((role, i) => (
              <motion.div
                key={i}
                className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-lg transition-all group"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 2) * 0.07 }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${DEPT_COLORS[role.dept] ?? "bg-muted text-muted-foreground"}`}>
                    {role.dept}
                  </span>
                </div>
                <h3 className="font-display font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors leading-snug">
                  {role.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{role.desc}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" />{role.location}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary" />{role.type}</span>
                </div>
                <div className="mt-5 pt-5 border-t border-border">
                  <a
                    href={`mailto:sales@autonxt.in?subject=Application: ${role.title}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    {texts.applyViaEmail} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BlurDivider />

      {/* ── CTA ── */}
      <section className="pt-12 pb-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0,72%,30%,0.5),transparent_65%)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <motion.div
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">{texts.dontSeeRole}</h2>
            <p className="text-white/75 text-lg mb-10">
              {texts.dontSeeRoleDesc}
            </p>
            <a href="mailto:sales@autonxt.in?subject=Open Application - AutoNxt">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 h-12">
                {texts.sendOpenApp} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
