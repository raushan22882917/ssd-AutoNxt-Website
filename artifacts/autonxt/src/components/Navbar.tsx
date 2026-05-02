import { Link, useLocation } from "wouter";
import { Menu, Moon, Sun, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import logoImg from "@assets/adaptive-icon_1777731255752.png";

export default function Navbar() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Product", href: "/product" },
    { name: "Industry", href: "/industry" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contribution", href: "/contribution" },
    { name: "About", href: "/about" },
  ];

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
          <img
            src={logoImg}
            alt="Autonxt Logo"
            className="w-9 h-9 object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-display font-bold text-lg tracking-widest uppercase text-foreground">
              Auton<span className="text-primary">xt</span>
            </span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground font-medium">Automation</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-0.5 lg:space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary",
                location === link.href
                  ? "text-primary font-semibold"
                  : "text-foreground/70"
              )}
              data-testid={`link-nav-${link.name.toLowerCase()}`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/book" data-testid="link-nav-book">
            <Button
              className={cn(
                "ml-3 bg-primary text-white hover:bg-primary/90 font-semibold tracking-wide",
                location === "/book" && "opacity-90"
              )}
            >
              Book Now
            </Button>
          </Link>
        </div>

        {/* Right side controls */}
        <div className="hidden md:flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-primary gap-1 text-sm" data-testid="btn-resources">
                Resources <ChevronDown className="w-3.5 h-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white border-border shadow-md">
              <DropdownMenuItem className="cursor-pointer hover:text-primary">Documentation</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:text-primary">Investor Relations</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:text-primary">Press Kit</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-1.5 text-foreground/70 text-sm border-l border-border pl-3">
            <span className="text-base">🇮🇳</span>
            <span className="font-semibold text-xs tracking-wider">EN</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-foreground/60 hover:text-primary rounded-full w-8 h-8"
            data-testid="btn-theme-toggle"
            title="Background"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border p-4 flex flex-col space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
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
          <Link href="/book" onClick={() => setMobileMenuOpen(false)}>
            <Button className="w-full mt-2 bg-primary text-white hover:bg-primary/90">Book Now</Button>
          </Link>
          <div className="flex items-center justify-between pt-3 border-t border-border mt-1">
            <div className="flex items-center gap-2 text-foreground/70 text-sm">
              <span>🇮🇳</span>
              <span className="font-semibold text-xs tracking-wider">EN</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
