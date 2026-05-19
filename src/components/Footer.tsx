import { Link } from "wouter";
import { Linkedin, Twitter, Youtube, Instagram, Mail, Phone, MapPin } from "lucide-react";
const logoImg = "/small-logo-white.png";import { useLang } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-surface-dark text-white">
      <div className="container mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <img src={logoImg} alt="Autonxt Logo" className="w-8 h-8 object-contain" />
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-lg tracking-widest uppercase text-white">
                  Auton<span className="text-primary">xt</span>
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-white/50 font-medium">Automation</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              India's electric tractor pioneer. Powering the fields of tomorrow, built for Indian farmers today.
            </p>
            <div className="flex gap-3">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors" data-testid="link-social-0">
                <Twitter className="w-3.5 h-3.5 text-white" />
              </a>
              <a href="https://www.linkedin.com/company/autonxt-automation" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors" data-testid="link-social-1">
                <Linkedin className="w-3.5 h-3.5 text-white" />
              </a>
              <a href="https://www.youtube.com/@autonxtautomation8368" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors" data-testid="link-social-2">
                <Youtube className="w-3.5 h-3.5 text-white" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors" data-testid="link-social-3">
                <Instagram className="w-3.5 h-3.5 text-white" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-widest">{t.nav.product}</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link href="/product" className="hover:text-primary transition-colors">Autonxt X45H2</Link></li>
              <li><Link href="/product" className="hover:text-primary transition-colors">Autonxt X25H4</Link></li>
              <li><Link href="/product" className="hover:text-primary transition-colors">Battery Systems</Link></li>
              <li><Link href="/product" className="hover:text-primary transition-colors">NXT-Drive Motors</Link></li>
              <li><Link href="/product" className="hover:text-primary transition-colors">Fleet Solutions</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-widest">{t.nav.about}</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link href="/about" className="hover:text-primary transition-colors">{t.nav.about}</Link></li>
              <li><Link href="/industry" className="hover:text-primary transition-colors">{t.nav.industry}</Link></li>
              <li><Link href="/contribution" className="hover:text-primary transition-colors">{t.nav.contribution}</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">{t.nav.gallery}</Link></li>
              <li><Link href="/news" className="hover:text-primary transition-colors">{t.nav.news}</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-widest">{t.common.getInTouch}</h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>704 &amp; 705, Amfotech IT Park, Rd 8, Wagle Estate Rd, Padwal Nagar, Thane West, Thane, Maharashtra 400604</span>
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

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>{t.common.copyright}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
            <Link href="/careers" className="hover:text-white transition-colors">Careers</Link>
          </div>
          <p>{t.common.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}
