import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, Zap, Cpu, BatteryCharging, ShieldCheck, Globe, Activity } from "lucide-react";

import tractor1 from "@assets/1_1777731255751.png";
import tractor2 from "@assets/2_1777731255751.png";
import fieldImg from "@assets/8.RightSideGateWall_1777731255752.jpg";
import trailerImg from "@assets/7.LeftSideGateWall_1777731255752.jpg";
import batteryImg from "@assets/battery_1777731255752.png";
import motorImg from "@assets/motor_1777731255752.png";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function Home() {
  return (
    <div className="w-full flex flex-col min-h-screen pt-16">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[92vh] flex items-center overflow-hidden bg-white">
        {/* Red diagonal accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary/8 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary/30" />

        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-16">
          {/* Left: Text */}
          <div className="order-2 lg:order-1">
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-1.5 text-sm font-semibold text-primary mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              India's Electric Tractor Pioneer
            </motion.span>

            <motion.h1
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.05]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Power the <br />
              <span className="text-primary">Fields</span> of <br />
              <span className="text-accent">Tomorrow.</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              Autonxt builds India's most advanced electric tractors — zero-emission, high-performance, built for every Indian farmer and every kind of land.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Link href="/product">
                <Button size="lg" className="h-13 px-8 text-base bg-primary text-white hover:bg-primary/90 font-semibold shadow-md" data-testid="btn-explore-products">
                  Explore Products <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/book">
                <Button size="lg" variant="outline" className="h-13 px-8 text-base border-accent text-accent hover:bg-accent hover:text-white font-semibold" data-testid="btn-book-now-hero">
                  Book Now
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right: Hero Image */}
          <motion.div
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-2xl" />
              <img
                src={tractor1}
                alt="Autonxt X45H2 Electric Tractor"
                className="relative w-full max-w-xl mx-auto drop-shadow-2xl"
              />
            </div>
            {/* Floating badge */}
            <motion.div
              className="absolute top-8 right-4 bg-white border border-border rounded-xl px-4 py-2.5 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              <p className="text-xs text-muted-foreground font-medium">Flagship Model</p>
              <p className="text-sm font-bold text-foreground">X45H2 — 45HP</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-14 bg-foreground text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-white/10">
            {[
              { label: "Electric Tractors Deployed", value: "5,000+" },
              { label: "States Covered", value: "18+" },
              { label: "Hours Saved / Farmer / Year", value: "300+" },
              { label: "CO₂ Offset (Tons)", value: "50K+" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center justify-center text-center px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</h3>
                <p className="text-xs uppercase tracking-widest text-white/60 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT TEASER ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14">
            <div className="max-w-2xl">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Our Lineup</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Built for Every Field.
              </h2>
            </div>
            <Link href="/product">
              <Button variant="outline" className="mt-4 md:mt-0 border-foreground/20 text-foreground hover:border-primary hover:text-primary">
                View All Models <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                img: tractor1,
                name: "Autonxt X45H2",
                type: "45HP Electric Tractor",
                tag: "Best Seller",
                tagColor: "bg-primary",
                desc: "Powerful 45HP motor for heavy fieldwork. Extended range battery for full-day operations.",
              },
              {
                img: tractor2,
                name: "Autonxt X25H4",
                type: "25HP Electric Tractor",
                tag: "Compact",
                tagColor: "bg-accent",
                desc: "Agile and efficient for small-to-medium farms. Perfect for precision agriculture.",
              },
            ].map((p, i) => (
              <motion.div
                key={i}
                className="group bg-white border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-testid={`card-product-${i}`}
              >
                <div className="relative bg-muted/40 p-8 flex items-center justify-center h-56">
                  <span className={`absolute top-4 left-4 text-xs font-bold text-white px-3 py-1 rounded-full ${p.tagColor}`}>{p.tag}</span>
                  <img src={p.img} alt={p.name} className="h-40 object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">{p.type}</p>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{p.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{p.desc}</p>
                  <Link href="/product">
                    <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                      Learn More <ArrowRight className="ml-1 w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 bg-muted/40">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Technology</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Precision Engineering.</h2>
            <p className="text-muted-foreground mt-4">Every component engineered for maximum efficiency, safety, and performance in Indian field conditions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "High-Torque Motor", desc: "Instant torque from zero RPM. Outperforms diesel in pulling power and response." },
              { icon: BatteryCharging, title: "Extended Range Battery", desc: "Full-day farm operations on a single charge. Solar-compatible charging." },
              { icon: Cpu, title: "Smart Control System", desc: "NXT-OS platform for real-time diagnostics, fleet tracking, and OTA updates." },
              { icon: ShieldCheck, title: "Rugged Build", desc: "IP67 rated electronics. Tested across India's harshest terrain and weather." },
              { icon: Activity, title: "Telemetry & Analytics", desc: "Real-time performance data and predictive maintenance alerts for fleets." },
              { icon: Globe, title: "Zero Emissions", desc: "100% electric. No diesel, no exhaust, no noise — clean air for villages." },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Card className="bg-white border-border hover:border-primary/40 hover:shadow-md transition-all h-full">
                  <CardContent className="p-7">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                      <f.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2">{f.title}</h3>
                    <p className="text-muted-foreground text-sm">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH SHOWCASE: Battery + Motor ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Proprietary Technology</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Built from the Ground Up.</h2>
                <p className="text-muted-foreground text-lg">
                  Unlike competitors who retrofit diesel tractors, Autonxt designs every component — motor, battery, controller — specifically for Indian agricultural conditions.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="bg-muted/40 rounded-xl p-5 border border-border hover:border-primary/30 transition-colors">
                  <img src={batteryImg} alt="Autonxt Battery Pack" className="w-full h-28 object-contain mb-4" />
                  <h4 className="font-bold text-foreground mb-1">Lithium Battery Pack</h4>
                  <p className="text-xs text-muted-foreground">High-density LFP cells. 10-year lifespan. IP67 sealed.</p>
                </div>
                <div className="bg-muted/40 rounded-xl p-5 border border-border hover:border-primary/30 transition-colors">
                  <img src={motorImg} alt="Autonxt Motor" className="w-full h-28 object-contain mb-4" />
                  <h4 className="font-bold text-foreground mb-1">NXT-Drive Motor</h4>
                  <p className="text-xs text-muted-foreground">Axial flux design. Peak efficiency 96%. India-made.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden border border-border"
            >
              <img src={trailerImg} alt="Autonxt X45C2 in field" className="w-full h-[420px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">AUTONXT X45C2</p>
                <p className="text-white font-display text-xl font-semibold">Heavy-Duty Commercial Tractor</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FIELD PHOTO BANNER ── */}
      <section className="relative h-[420px] overflow-hidden">
        <img src={fieldImg} alt="Autonxt in the Fields of India" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-8 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary font-bold text-sm uppercase tracking-widest mb-3">In the Field</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">From Sunrise to Sunset.</h2>
              <p className="text-white/80 text-lg mb-6">One charge. All day. Every season. Autonxt is built for the rhythm of Indian farming.</p>
              <Link href="/gallery">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90" data-testid="btn-view-gallery">
                  View Gallery <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-foreground text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Ready to Go Electric?</h2>
            <p className="text-white/70 text-xl mb-10">
              Join 5,000+ Indian farmers who have switched to Autonxt. Reserve your tractor today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/book">
                <Button size="lg" className="h-13 px-10 text-base bg-primary text-white hover:bg-primary/90 font-semibold" data-testid="btn-cta-book">
                  Book Now
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="h-13 px-10 text-base border-white/30 text-white hover:bg-white/10 font-semibold" data-testid="btn-cta-story">
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
