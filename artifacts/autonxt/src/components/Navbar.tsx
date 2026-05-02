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
import { SiIndia } from "react-icons/si";

export default function Navbar() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
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
          ? "bg-background/80 backdrop-blur-md border-border shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" data-testid="link-home-logo">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <div className="w-3 h-3 bg-background rounded-full" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight uppercase text-foreground">
            Autonxt
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                location === link.href ? "text-primary font-semibold" : "text-muted-foreground"
              )}
              data-testid={`link-nav-${link.name.toLowerCase()}`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/book" data-testid="link-nav-book">
            <Button
              variant="outline"
              className={cn(
                "ml-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
                location === "/book" && "bg-primary text-primary-foreground"
              )}
            >
              Book Now
            </Button>
          </Link>
        </div>

        {/* Right side controls */}
        <div className="hidden md:flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1" data-testid="btn-resources">
                Resources <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-card border-border">
              <DropdownMenuItem className="cursor-pointer">Documentation</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Investor Relations</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Press Kit</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-2 text-muted-foreground text-sm border-l border-border pl-4">
            <span>🇮🇳</span>
            <span className="font-medium">EN</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground hover:text-foreground rounded-full"
            data-testid="btn-theme-toggle"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-4 flex flex-col space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium",
                location === link.href ? "bg-muted text-primary" : "text-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/book" onClick={() => setMobileMenuOpen(false)}>
            <Button className="w-full mt-2 bg-primary text-primary-foreground">Book Now</Button>
          </Link>
          <div className="flex items-center justify-between pt-4 border-t border-border mt-2">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>🇮🇳</span>
              <span className="font-medium">EN</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}