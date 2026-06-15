import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import { Shield, ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";

export default function Privacy() {
  const { t } = useLang();
  const sections = t.privacyPage.sections;
  const texts = t.privacyPage.texts;

  return (
    <div className="w-full min-h-screen bg-background">
      <SEO title={texts.policyTitle} description="AutoNxt Automation Privacy Policy and data protection terms." />

      {/* ── HEADER ── */}
      <section className="bg-background relative overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,hsl(214,65%,32%,0.15),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(hsl(0,0%,0%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,0%,0%) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-4xl">
          <motion.div
            className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-6"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          >
            <Shield className="w-3.5 h-3.5 text-accent" />
            <span className="text-accent text-xs font-bold uppercase tracking-widest">{texts.legalBadge}</span>
          </motion.div>
          <motion.h1
            className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          >
            {texts.policyTitle}
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
          >
            {texts.effectiveDate}
          </motion.p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <motion.p
            className="text-muted-foreground leading-relaxed mb-12 text-base border-l-4 border-primary pl-5 italic"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            {texts.policyIntro}
          </motion.p>
          <div className="space-y-10">
            {sections.map((s, i) => (
              <motion.div
                key={i}
                className="border-b border-border pb-10 last:border-0"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.04 }}
              >
                <h2 className="font-display font-bold text-foreground text-xl mb-4">{s.title}</h2>
                <p className="text-muted-foreground leading-relaxed text-base whitespace-pre-line">{s.body}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" /> {texts.backToHome}
            </Link>
            <p className="text-xs text-muted-foreground">{texts.copyright}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
