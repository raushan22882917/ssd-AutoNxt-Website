import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import { Shield, ArrowLeft, Mail, Trash2, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import AppAffiliationBanner from "@/components/legal/AppAffiliationBanner";

export default function AccountDeletion() {
  const { t } = useLang();
  const texts = t.accountDeletionPage.texts;
  const sections = t.accountDeletionPage.sections;
  const steps = t.accountDeletionPage.steps;
  const deletedItems = t.accountDeletionPage.deletedItems;
  const retainedItems = t.accountDeletionPage.retainedItems;

  return (
    <div className="w-full min-h-screen bg-background">
      <SEO
        title={texts.pageTitle}
        description={texts.metaDescription}
      />

      <section className="bg-background relative overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,hsl(0,72%,40%,0.08),transparent_60%)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(hsl(0,0%,0%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,0%,0%) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-4xl">
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-4 py-1.5 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Shield className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              {texts.legalBadge}
            </span>
          </motion.div>
          <motion.h1
            className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            {texts.pageTitle}
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-lg max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18 }}
          >
            {texts.pageSubtitle}
          </motion.p>
          <motion.p
            className="text-muted-foreground text-sm mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22 }}
          >
            {texts.effectiveDate}
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <AppAffiliationBanner />
          <motion.p
            className="text-muted-foreground leading-relaxed mb-10 text-base border-l-4 border-primary pl-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {texts.pageIntro}
          </motion.p>

          <motion.div
            className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-foreground text-xl mb-4 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-primary" />
              {texts.requestTitle}
            </h2>
            <ol className="space-y-3 mb-6">
              {steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-muted-foreground text-sm md:text-base">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <a href={texts.requestMailto}>
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold">
                <Mail className="w-4 h-4 mr-2" />
                {texts.requestButton}
              </Button>
            </a>
            <p className="text-xs text-muted-foreground mt-4">{texts.processingNote}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <motion.div
              className="bg-card border border-border rounded-2xl p-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display font-bold text-foreground text-lg mb-4 flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-primary" />
                {texts.deletedTitle}
              </h3>
              <ul className="space-y-2">
                {deletedItems.map((item, i) => (
                  <li key={i} className="text-muted-foreground text-sm leading-relaxed flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="bg-card border border-border rounded-2xl p-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              <h3 className="font-display font-bold text-foreground text-lg mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                {texts.retainedTitle}
              </h3>
              <ul className="space-y-2">
                {retainedItems.map((item, i) => (
                  <li key={i} className="text-muted-foreground text-sm leading-relaxed flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="space-y-10">
            {sections.map((s, i) => (
              <motion.div
                key={i}
                className="border-b border-border pb-10 last:border-0"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.04 }}
              >
                <h2 className="font-display font-bold text-foreground text-xl mb-4">{s.title}</h2>
                <p className="text-muted-foreground leading-relaxed text-base whitespace-pre-line">{s.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-10 bg-muted/40 border border-border rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">{texts.privacyLinkTitle}</p>
                <p className="text-muted-foreground text-sm mt-1">{texts.privacyLinkDesc}</p>
              </div>
            </div>
            <Link href="/privacy">
              <Button variant="outline" className="font-semibold">
                {texts.privacyLinkButton}
              </Button>
            </Link>
          </motion.div>

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
