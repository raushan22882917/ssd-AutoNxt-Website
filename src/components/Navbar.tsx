import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Newspaper, BookOpen, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LanguageContext";
import type { Lang } from "@/i18n/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
const logoImg = "/small-logo-black.png";

const LANGUAGES: { code: Lang; label: string; native: string; flag: string }[] = [
  { code: "en", label: "English", native: "English", flag: "🇮🇳" },
  { code: "hi", label: "Hindi", native: "हिंदी", flag: "🇮🇳" },
  { code: "mr", label: "Marathi", native: "मराठी", flag: "🇮🇳" },
];

export default function Navbar() {
  const [location] = useLocation();
  const { lang, setLang, t } = useLang();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.product, href: "/product" },
    { name: t.nav.industry, href: "/industry" },
    { name: t.nav.gallery, href: "/gallery" },
    { name: t.nav.contribution, href: "/contribution" },
    { name: t.nav.about, href: "/about" },
  ];

  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-border shadow-sm py-2"
          : "bg-white py-3"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" data-testid="link-home-logo">
          <img src={logoImg} alt="Autonxt Logo" className="w-9 h-9 object-contain" />
          <div className="flex flex-col leading-tight">
            <span className="font-display font-bold text-lg tracking-widest uppercase text-foreground">
              Auto<span className="text-primary">nxt</span>
            </span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground font-medium">Automation</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-0.5 lg:space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary",
                location === link.href ? "text-primary font-semibold" : "text-foreground/70"
              )}
              data-testid={`link-nav-${link.href.replace("/", "") || "home"}`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/book" data-testid="link-nav-book">
            <Button className={cn("ml-3 bg-primary text-white hover:bg-primary/90 font-semibold tracking-wide", location === "/book" && "opacity-90")}>
              {t.nav.bookNow}
            </Button>
          </Link>
        </div>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-1">
          {/* Resources dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-primary gap-1 text-sm" data-testid="btn-resources">
                {t.nav.resources} <ChevronDown className="w-3.5 h-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 bg-popover border-border shadow-md p-1">
              <Link href="/news">
                <DropdownMenuItem className="cursor-pointer hover:text-primary rounded-lg px-3 py-2.5 flex items-center gap-2.5">
                  <Newspaper className="w-4 h-4 text-primary flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm">{t.nav.news}</div>
                    <div className="text-[11px] text-muted-foreground">{t.nav.newsDesc}</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/blog">
                <DropdownMenuItem className="cursor-pointer hover:text-primary rounded-lg px-3 py-2.5 flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-accent flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm">{t.nav.blog}</div>
                    <div className="text-[11px] text-muted-foreground">{t.nav.blogDesc}</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/ev-blog">
                <DropdownMenuItem className="cursor-pointer hover:text-primary rounded-lg px-3 py-2.5 flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm">{t.nav.evBlog}</div>
                    <div className="text-[11px] text-muted-foreground">{t.nav.evBlogDesc}</div>
                  </div>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Language switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-primary gap-1.5 text-sm border-l border-border ml-1 pl-3 rounded-none" data-testid="btn-language">
                <span className="text-base">{currentLang.flag}</span>
                <span className="font-semibold text-xs tracking-wider">{currentLang.code.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 bg-popover border-border shadow-md p-1">
              {LANGUAGES.map((l) => (
                <DropdownMenuItem
                  key={l.code}
                  className={cn(
                    "cursor-pointer rounded-lg px-3 py-2 flex items-center gap-2.5",
                    lang === l.code ? "bg-primary/10 text-primary" : "hover:text-primary"
                  )}
                  onClick={() => setLang(l.code)}
                  data-testid={`lang-${l.code}`}
                >
                  <span className="text-base">{l.flag}</span>
                  <div>
                    <div className="font-semibold text-sm">{l.native}</div>
                    <div className="text-[10px] text-muted-foreground">{l.label}</div>
                  </div>
                  {lang === l.code && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="btn-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border p-4 flex flex-col space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "block px-4 py-2.5 rounded-md text-base font-medium",
                location === link.href ? "bg-primary/10 text-primary" : "text-foreground hover:text-primary"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/news" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-md text-base font-medium text-foreground hover:text-primary">
            {t.nav.news}
          </Link>
          <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-md text-base font-medium text-foreground hover:text-primary">
            {t.nav.blog}
          </Link>
          <Link href="/ev-blog" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-md text-base font-medium text-foreground hover:text-primary">
            {t.nav.evBlog}
          </Link>
          <Link href="/book" onClick={() => setMobileMenuOpen(false)}>
            <Button className="w-full mt-2 bg-primary text-white hover:bg-primary/90">{t.nav.bookNow}</Button>
          </Link>

          {/* Mobile Language switcher */}
          <div className="flex items-center justify-between pt-3 border-t border-border mt-2">
            <div className="flex gap-1">
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold transition-colors",
                    lang === l.code
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground hover:text-primary"
                  )}
                >
                  {l.native}
                </button>
              ))}
            </div>
            <span className="text-muted-foreground text-xs">🇮🇳</span>
          </div>
        </div>
      )}
    </nav>
  );
}
