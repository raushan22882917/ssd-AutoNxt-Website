import { Link } from "wouter";
import { Linkedin, Twitter, Youtube, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                <div className="w-3 h-3 bg-background rounded-full" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight uppercase text-foreground">
                Autonxt
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Stepping into the future of mobility. The Tesla of India meets the reliability of Tata Motors. Forward-looking automotive innovation.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-social-x">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-social-linkedin">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-social-youtube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-social-instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Products</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/product" className="hover:text-primary transition-colors">EV Platforms</Link></li>
              <li><Link href="/product" className="hover:text-primary transition-colors">Autonomous Systems</Link></li>
              <li><Link href="/product" className="hover:text-primary transition-colors">Battery Tech</Link></li>
              <li><Link href="/product" className="hover:text-primary transition-colors">Fleet Solutions</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/industry" className="hover:text-primary transition-colors">Industries</Link></li>
              <li><Link href="/contribution" className="hover:text-primary transition-colors">Sustainability</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Accessibility</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Autonxt Mobility. All rights reserved.</p>
          <p>Designed and engineered in India</p>
        </div>
      </div>
    </footer>
  );
}