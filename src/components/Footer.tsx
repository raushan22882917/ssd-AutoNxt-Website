import { Link } from "wouter";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Youtube, Instagram, Mail, Phone, MapPin } from "lucide-react";
const logoImg = "/small-logo-white-sm.webp";
import { useLang } from "@/contexts/LanguageContext";

/* ── Reusable animated footer link ── */
function FooterLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.li
      className={className}
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

  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=704+%26+705+Amfotech+IT+Park,+Thane,+Maharashtra";

  const companyLinksDesktop = [
    { href: "/about", label: t.nav.about },
    { href: "/industry", label: t.nav.industry },
    { href: "/contribution", label: t.nav.contribution },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/news", label: t.nav.news },
    { href: "/careers", label: t.common.careers },
  ];

  const companyLinksMobile = [
    { href: "/industry", label: t.nav.industry },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/contribution", label: t.nav.contribution },
    { href: "/about", label: t.nav.about },
    { href: "/news", label: t.nav.news },
    { href: "/careers", label: t.common.careers },
  ];

  return (
    <footer className="bg-surface-dark text-white">
      <div className="container mx-auto px-4 md:px-8 pt-10 md:pt-14 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">

          {/* Brand — full width on mobile, compact */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <img src={logoImg} alt="Autonxt Logo" width={32} height={32} className="w-8 h-8 object-contain" />
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-lg tracking-widest uppercase text-white">
                  Auton<span className="text-red-400">xt</span>
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-white/80 font-medium">Automation</span>
              </div>
            </div>
            <p className="text-white/75 text-sm leading-relaxed max-w-xs">
              {t.common.slogan}
            </p>
            <div className="flex gap-2.5">
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

          {/* Links — 2-column grid on mobile; company column first on phone */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2 grid grid-cols-2 gap-6">
            {/* Company — shown first on mobile */}
            <div className="order-1 md:order-2">
              <h3 className="font-semibold text-white mb-4 text-xs uppercase tracking-widest">{t.nav.about}</h3>
              <ul className="space-y-2.5 text-sm md:hidden">
                {companyLinksMobile.map((link) => (
                  <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
                ))}
              </ul>
              <ul className="space-y-2.5 text-sm hidden md:block">
                {companyLinksDesktop.map((link) => (
                  <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
                ))}
              </ul>
            </div>

            {/* Products — shown second on mobile */}
            <div className="order-2 md:order-1">
              <h3 className="font-semibold text-white mb-4 text-xs uppercase tracking-widest">{t.nav.product}</h3>
              <ul className="space-y-2.5 text-sm">
                <FooterLink href="/product/x45h2">{t.home.products[0].name}</FooterLink>
                <FooterLink href="/product/x25h2">{t.home.products[2].name}</FooterLink>
                <FooterLink href="/product/x30c2">{t.home.products[1].name}</FooterLink>
                <FooterLink href="/product/attachment/bucket">{t.productPage.implementsList.bucket.name}</FooterLink>
                <FooterLink href="/product/attachment/catcher">{t.productPage.implementsList.catcher.name}</FooterLink>
                <FooterLink href="/product/attachment/loader">{t.productPage.implementsList.loader.name}</FooterLink>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-xs uppercase tracking-widest">{t.common.getInTouch}</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-snug hover:text-primary transition-colors"
                >
                  {t.bookPage.contactInfo.visitVal}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+919067404606" className="hover:text-primary transition-colors">+91 9067404606</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:sales@autonxt.in" className="hover:text-primary transition-colors break-all">sales@autonxt.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-5 flex flex-col lg:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p className="text-center lg:text-left">{t.common.copyright}</p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/privacy" className="hover:text-white transition-colors">{t.common.privacyPolicy}</Link>
            <Link href="/terms" className="hover:text-white transition-colors">{t.common.termsConditions}</Link>
            <Link href="/account-deletion" className="hover:text-white transition-colors">{t.common.accountDeletion}</Link>
            <Link href="/careers" className="hover:text-white transition-colors">{t.common.careers}</Link>
          </div>
          <p className="text-center lg:text-right">{t.common.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}

