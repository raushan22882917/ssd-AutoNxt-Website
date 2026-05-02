import { Link } from "wouter";
import { Linkedin, Twitter, Youtube, Instagram, Mail, Phone, MapPin } from "lucide-react";
import logoImg from "@assets/adaptive-icon_1777731255752.png";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <img src={logoImg} alt="Autonxt Logo" className="w-8 h-8 object-contain brightness-0 invert" />
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
              {[Twitter, Linkedin, Youtube, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors" data-testid={`link-social-${i}`}>
                  <Icon className="w-3.5 h-3.5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-widest">Products</h3>
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
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-widest">Company</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/industry" className="hover:text-primary transition-colors">Industries</Link></li>
              <li><Link href="/contribution" className="hover:text-primary transition-colors">Sustainability</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-widest">Contact</h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>Hinjewadi Phase 2, Pune — 411057, Maharashtra</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+91 20 4567 8900</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>hello@autonxt.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Autonxt Automation Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
          <p>Designed & Engineered in India</p>
        </div>
      </div>
    </footer>
  );
}
