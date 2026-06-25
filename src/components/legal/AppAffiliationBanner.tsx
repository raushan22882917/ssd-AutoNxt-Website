import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";
import { Smartphone } from "lucide-react";

const logoImg = "/small-logo-black-sm.webp";

export default function AppAffiliationBanner() {
  const { t } = useLang();
  const a = t.legalAppAffiliation;

  const rows = [
    { label: a.appNameLabel, value: a.appNameValue },
    { label: a.developerLabel, value: a.developerValue },
    { label: a.playDeveloperLabel, value: a.playDeveloperValue },
    { label: a.packageIdLabel, value: a.packageIdValue },
    { label: a.websiteLabel, value: a.websiteValue },
  ];

  return (
    <motion.div
      className="bg-card border-2 border-primary/25 rounded-2xl p-6 md:p-8 mb-10 shadow-sm"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-5">
        <div className="flex items-center gap-3 flex-shrink-0">
          <img
            src={logoImg}
            alt="AutoNxt Automation logo"
            width={48}
            height={48}
            className="w-12 h-12 object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-display font-bold text-lg tracking-widest uppercase text-foreground">
              Auton<span className="text-primary">xt</span>
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-medium">
              Automation
            </span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <Smartphone className="w-4 h-4 text-primary flex-shrink-0" />
            <h2 className="font-display font-bold text-foreground text-lg leading-snug">
              {a.bannerTitle}
            </h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{a.bannerDesc}</p>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
            {rows.map(({ label, value }) => (
              <div key={label} className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="text-muted-foreground font-medium shrink-0">{label}:</dt>
                <dd className="text-foreground font-semibold break-all">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </motion.div>
  );
}
