import { Link } from "wouter";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Youtube, Instagram, Mail, Phone, MapPin } from "lucide-react";
const logoImg = "/small-logo-white-sm.webp";
import { useLang } from "@/contexts/LanguageContext";

/* ── Reusable animated footer link ── */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.li
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
    >
      <Link href={href} className="group relative inline-flex items-center gap-1.5 text-white/80 transition-colors duration-200 hover:text-primary">
        {/* Sliding red underline */}
        <span className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] rounded-full bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-250" />
        {children}
      </Link>
    </motion.li>
  );
}

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-surface-dark text-white">
      <div className="container mx-auto px-4 md:px-8 pt-14 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <img src={logoImg} alt="Autonxt Logo" width={32} height={32} className="w-8 h-8 object-contain" />
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-lg tracking-widest uppercase text-white">
                  Auton<span className="text-red-400">xt</span>
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-white/80 font-medium">Automation</span>
              </div>
            </div>
            <p className="text-white/85 text-sm leading-relaxed max-w-xs">
              {t.common.slogan}
            </p>
            <div className="flex gap-3">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="AutoNxt on X (Twitter)" className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors" data-testid="link-social-0">
                <Twitter className="w-3.5 h-3.5 text-white" />
              </a>
              <a href="https://www.linkedin.com/company/autonxt-automation" target="_blank" rel="noopener noreferrer" aria-label="AutoNxt on LinkedIn" className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors" data-testid="link-social-1">
                <Linkedin className="w-3.5 h-3.5 text-white" />
              </a>
              <a href="https://www.youtube.com/@autonxtautomation8368" target="_blank" rel="noopener noreferrer" aria-label="AutoNxt on YouTube" className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors" data-testid="link-social-2">
                <Youtube className="w-3.5 h-3.5 text-white" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="AutoNxt on Instagram" className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors" data-testid="link-social-3">
                <Instagram className="w-3.5 h-3.5 text-white" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-widest">{t.nav.product}</h3>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/product">Autonxt X45H2</FooterLink>
              <FooterLink href="/product">Autonxt X25H4</FooterLink>
              <FooterLink href="/product">{t.common.batterySystems}</FooterLink>
              <FooterLink href="/product">{t.common.motors}</FooterLink>
              <FooterLink href="/product">{t.common.fleetSolutions}</FooterLink>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-widest">{t.nav.about}</h3>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/about">{t.nav.about}</FooterLink>
              <FooterLink href="/industry">{t.nav.industry}</FooterLink>
              <FooterLink href="/contribution">{t.nav.contribution}</FooterLink>
              <FooterLink href="/gallery">{t.nav.gallery}</FooterLink>
              <FooterLink href="/news">{t.nav.news}</FooterLink>
              <FooterLink href="/careers">{t.common.careers}</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-widest">{t.common.getInTouch}</h3>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>{t.bookPage.contactInfo.visitVal}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+919067404606" className="hover:text-primary transition-colors">+91 9067404606</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:sales@autonxt.in" className="hover:text-primary transition-colors">sales@autonxt.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <p>{t.common.copyright}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">{t.common.privacyPolicy}</Link>
            <Link href="/terms" className="text-white/70 hover:text-white transition-colors">{t.common.termsConditions}</Link>
            <Link href="/careers" className="text-white/70 hover:text-white transition-colors">{t.common.careers}</Link>
          </div>
          <p>{t.common.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}

