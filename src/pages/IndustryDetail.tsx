import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import {
  ArrowRight, ArrowLeft, CheckCircle2, Leaf, Building2, Hammer,
  Shield, PlaneTakeoff, Factory, Zap, BatteryCharging, Clock,
  Truck, Settings, Globe, Users,
} from "lucide-react";

const INDUSTRY_ICONS: Record<string, React.ElementType> = {
  biomass: Leaf,
  cement: Building2,
  construction: Hammer,
  defence: Shield,
  airport: PlaneTakeoff,
  metal: Factory
};

const APP_ICONS_MAP: Record<string, React.ElementType[]> = {
  biomass: [Truck, Settings, Factory, Globe],
  cement: [Truck, Factory],
  construction: [Truck],
  defence: [Truck],
  airport: [Truck],
  metal: [Truck]
};

const getFirstSentence = (text: string) => {
  if (!text) return "";
  const match = text.match(/^[^.!?।]+[.!?।]/);
  return match ? match[0] : text;
};

export default function IndustryDetail({ params }: { params: { slug: string } }) {
  const { t } = useLang();
  const slug = params?.slug ?? "biomass";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  const industryFromT = t.industryDetailPage.industries[slug as "biomass"] || t.industryDetailPage.industries.biomass;
  const texts = t.industryDetailPage.texts;

  if (!industryFromT) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">{texts.industryNotFound}</h2>
          <Button asChild>
            <Link href="/industry">
              {texts.backToIndustries}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const icon = INDUSTRY_ICONS[slug] || Leaf;
  const appIcons = APP_ICONS_MAP[slug] || [Truck];
  const applications = (industryFromT.applications || []).map((app, idx) => ({
    ...app,
    icon: appIcons[idx] || Truck
  }));

  const industry = {
    ...industryFromT,
    icon,
    applications
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <SEO title={industry.title} description={industry.desc} />

      {/* ── HEADER ── */}
      <section className="bg-surface-dark relative overflow-hidden pt-28 pb-16 lg:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,hsl(214,65%,32%,0.12),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(hsl(0,0%,100%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,0%,100%) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <Link href="/industry" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {texts.allIndustries}
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div
                className={`inline-flex items-center gap-2 ${industry.bg} bg-opacity-20 border border-white/10 rounded-full px-4 py-1.5 mb-6`}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              >
                <industry.icon className="w-3.5 h-3.5 text-primary" />
                <span className="text-white text-xs font-bold uppercase tracking-widest">{industry.badge}</span>
              </motion.div>
              <motion.h1
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              >
                {industry.title}
              </motion.h1>
              <motion.p
                className="text-primary font-semibold text-lg mb-6"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.14 }}
              >
                {industry.tagline}
              </motion.p>
              <motion.p
                className="text-white/80 text-base md:text-lg leading-relaxed"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              >
                {getFirstSentence(industry.desc)}
              </motion.p>
            </div>

            <motion.div 
              className="lg:col-span-5 relative w-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.22, duration: 0.6 }}
            >
              <div 
                className="relative h-[240px] sm:h-[300px] lg:h-[380px] overflow-hidden"
                style={{
                  maskImage: "radial-gradient(ellipse at center, black 50%, transparent 100%)",
                  WebkitMaskImage: "radial-gradient(ellipse at center, black 50%, transparent 100%)"
                }}
              >
                <img 
                  src={industry.image ? industry.image.replace(/\.(webp|png)$/i, "-clean.webp") : ""} 
                  alt={industry.title} 
                  width={600}
                  height={380}
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTIONS ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">{texts.overview}</h2>
                <p className="text-muted-foreground leading-relaxed text-base">{industry.desc}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">{texts.challenge}</h2>
                <p className="text-muted-foreground leading-relaxed text-base">{industry.challenges}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">{texts.theAutoNxtSolution}</h2>
                <p className="text-muted-foreground leading-relaxed text-base">{industry.solution}</p>
              </motion.div>

              {/* Applications */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">{texts.keyApplications}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {industry.applications.map((app, i) => {
                    const AppIcon = app.icon;
                    return (
                      <div key={i} className="bg-card border border-border rounded-xl p-6 hover:border-primary/20 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                          <AppIcon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-bold text-foreground text-base mb-2">{app.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{app.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Sidebar Benefits */}
            <div>
              <motion.div
                className="bg-card border border-border rounded-2xl p-8 sticky top-24"
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              >
                <h3 className="font-display font-bold text-foreground text-xl mb-6">{texts.whyAutoNxt}</h3>
                <ul className="space-y-4">
                  {industry.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECHNICAL SPECS ── */}
      <section className="py-20 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <motion.h2 className="font-display text-3xl font-bold text-foreground" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              {texts.builtFor} {industry.title}
            </motion.h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: Zap, title: texts.electricMotor, desc: texts.torque0Rpm },
              { icon: BatteryCharging, title: texts.batteryRange, desc: texts.perChargeDuty },
              { icon: Clock, title: texts.chargeTime, desc: texts.acChargingStandard },
              { icon: Users, title: texts.fleetSupport, desc: texts.remoteDiagnostics },
            ].map((s, i) => {
              const SpecIcon = s.icon;
              return (
                <motion.div
                  key={i}
                  className="bg-card border border-border rounded-xl p-5 text-center"
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                >
                  <SpecIcon className="w-5 h-5 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-foreground text-sm mb-1">{s.title}</h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── RECOMMENDED MODELS ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground">{texts.recommendedModels}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {industry.models.map((model, i) => (
              <motion.div
                key={i}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all group"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              >
                <div className="bg-primary/5 p-6 flex justify-center h-44 items-center">
                  <img src={model.img} alt={model.name} className="h-32 object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="font-display font-bold text-foreground text-lg">{model.name}</h3>
                    <span className="bg-foreground text-background text-[10px] font-bold px-2 py-0.5 rounded">{model.hp}</span>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-4">{model.note}</p>
                  <Button asChild size="sm" className="w-full">
                    <Link href={`/product/${model.slug}`}>
                      {texts.viewFullSpecs}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0,72%,30%,0.5),transparent_65%)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10 max-w-xl">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              {texts.readyToGoElectric} {industry.title}?
            </h2>
            <p className="text-white/70 text-base mb-8">
              {texts.ctaDesc}
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/95 font-semibold h-12 px-8">
              <Link href="/book">
                {texts.bookConsultation} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
