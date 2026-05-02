import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, Zap, Cpu, BatteryCharging, ShieldCheck, Globe, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-primary/20 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
          <img 
            src="/images/gallery-1.png" 
            alt="Autonxt Dashboard" 
            className="w-full h-full object-cover object-center opacity-30 mix-blend-overlay"
          />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              The Future of Indian Mobility
            </span>
          </motion.div>
          
          <motion.h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground mb-6 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Tomorrow</span> Today.
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Autonxt builds high-performance, intelligent electric vehicles and platforms for the next generation of transportation.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/product">
              <Button size="lg" className="h-14 px-8 text-lg group bg-primary text-primary-foreground hover:bg-primary/90">
                Explore Products
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/book">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-primary/50 text-foreground hover:bg-primary/10">
                Book Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-border bg-card/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border/50 text-center">
            {[
              { label: "Vehicles Electrified", value: "10,000+" },
              { label: "Cities Covered", value: "45+" },
              { label: "Carbon Offset (Tons)", value: "500K+" },
              { label: "Uptime Reliability", value: "99.9%" }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                className="flex flex-col items-center justify-center p-4"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.value}</h3>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">Precision Engineering.</h2>
              <p className="text-lg text-muted-foreground">Every component designed from the ground up for maximum efficiency, safety, and performance.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Hyper-Drive Powertrain", desc: "Our proprietary motor technology delivers instant torque and unprecedented range." },
              { icon: Cpu, title: "NXT-OS Architecture", desc: "A unified software platform controlling everything from battery management to infotainment." },
              { icon: BatteryCharging, title: "Solid-State Energy", desc: "Next-gen battery packs that charge faster, last longer, and are infinitely safer." },
              { icon: ShieldCheck, title: "Aegis Safety Suite", desc: "Military-grade active safety systems with predictive crash avoidance." },
              { icon: Activity, title: "Telemetry & Analytics", desc: "Real-time fleet monitoring with predictive maintenance AI." },
              { icon: Globe, title: "V2X Connectivity", desc: "Seamless vehicle-to-everything integration for smart city infrastructure." },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="bg-card border-border/50 hover:border-primary/50 transition-colors h-full">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Teaser */}
      <section className="py-24 bg-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
              className="relative aspect-video rounded-xl overflow-hidden border border-border"
            >
              <img src="/images/product-ev-platform.png" alt="EV Platform" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-sm font-bold text-primary mb-1">SKATEBOARD CHASSIS</p>
                <p className="font-display text-2xl text-foreground font-semibold">The Foundation of Autonxt</p>
              </div>
            </motion.div>
            
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
              className="space-y-6"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">A Modular Platform for Every Need.</h2>
              <p className="text-lg text-muted-foreground">
                Our scalable skateboard platform serves as the foundation for our entire lineup — from sleek sedans to heavy-duty commercial vehicles.
              </p>
              <ul className="space-y-4">
                {[
                  "Adaptable wheelbase and track width",
                  "Integrated structural battery pack",
                  "Drive-by-wire steering and braking",
                  "Over-the-air update capability"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-foreground">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 shrink-0">
                      <ChevronRight className="w-4 h-4 text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link href="/product">
                  <Button variant="outline" className="border-primary/50 text-foreground group">
                    View Full Lineup
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-background/50 via-background to-background z-0" />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">Ready for the Next Generation?</h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join the electric revolution. Reserve your Autonxt vehicle today or partner with us for fleet solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/book">
                <Button size="lg" className="h-14 px-10 text-lg w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                  Book Now
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg w-full sm:w-auto border-border bg-background hover:bg-muted text-foreground">
                  Our Story
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}