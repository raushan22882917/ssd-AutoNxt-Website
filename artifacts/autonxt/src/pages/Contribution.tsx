import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Leaf, Wind, Sun, TreePine, ArrowRight, Award, Handshake, Target } from "lucide-react";

const impacts = [
  { icon: Leaf, value: "500K+", label: "Tons CO₂ Offset", desc: "Lifetime carbon emissions prevented by Autonxt EVs on Indian roads." },
  { icon: Wind, value: "10,000+", label: "Vehicles Electrified", desc: "Petrol and diesel vehicles replaced by clean Autonxt electric alternatives." },
  { icon: Sun, value: "1,200+", label: "Solar Chargers Deployed", desc: "Renewable energy charging stations installed across India." },
  { icon: TreePine, value: "2M+", label: "Trees Equivalent", desc: "Environmental benefit equivalent in carbon sequestration per year." },
];

const initiatives = [
  {
    icon: Target,
    title: "Project Swachh Gati",
    desc: "Our flagship initiative to electrify 50,000 public transit vehicles by 2028 in partnership with 15 state governments.",
    badge: "Active",
  },
  {
    icon: Handshake,
    title: "FAME India Partnerships",
    desc: "Aligned with India's FAME II scheme, providing subsidised EV solutions to municipalities, aggregators, and individual buyers.",
    badge: "Govt. Backed",
  },
  {
    icon: Award,
    title: "Atmanirbhar Mobility",
    desc: "100% indigenously designed and manufactured — from motors to battery management systems — creating 5,000+ skilled jobs across India.",
    badge: "Make in India",
  },
];

const timeline = [
  { year: "2019", event: "Autonxt founded in Pune, Maharashtra. First R&D lab opened." },
  { year: "2020", event: "First EV prototype completed. Seed funding secured from SIDBI." },
  { year: "2021", event: "FAME II certification achieved. Partnership with 3 state governments signed." },
  { year: "2022", event: "Commercial production begins. 500 vehicles delivered to fleet operators." },
  { year: "2023", event: "Series B funding raised. Expanded to 12 cities. 5,000 vehicles on road." },
  { year: "2024", event: "Launched solar charging network. Defense contract signed. 10,000+ vehicles milestone." },
  { year: "2025+", event: "International expansion begins. Solid-state battery pilot launched." },
];

export default function Contribution() {
  return (
    <div className="w-full min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <motion.p
            className="text-primary font-semibold tracking-widest uppercase text-sm mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Our Impact
          </motion.p>
          <motion.h1
            className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Built for <span className="text-primary">Bharat.</span> Built for the Planet.
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Autonxt is more than an automaker. We are India's commitment to cleaner air, greener cities, and a sovereign electric future.
          </motion.p>
        </div>

        {/* Impact Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {impacts.map((impact, i) => (
            <motion.div
              key={i}
              className="bg-card border border-border rounded-2xl p-8 text-center hover:border-primary/40 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <impact.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="font-display text-4xl font-bold text-foreground mb-2">{impact.value}</p>
              <p className="font-semibold text-foreground mb-3 text-sm">{impact.label}</p>
              <p className="text-muted-foreground text-xs leading-relaxed">{impact.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Key Initiatives */}
        <div className="mb-24">
          <motion.h2
            className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Key Initiatives
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initiatives.map((item, i) => (
              <motion.div
                key={i}
                className="bg-card border border-border rounded-2xl p-8 hover:border-primary/40 transition-colors group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">{item.badge}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-24">
          <motion.h2
            className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Journey
          </motion.h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border/60 md:-translate-x-1/2" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  className={`flex gap-8 md:gap-0 items-start md:items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <div className={`w-full md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"} pl-12 md:pl-0`}>
                    <span className="inline-block text-primary font-bold text-2xl font-display mb-2">{item.year}</span>
                    <p className="text-foreground">{item.event}</p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background mt-1 md:mt-0 shrink-0" />
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="rounded-3xl bg-primary/5 border border-primary/20 p-10 md:p-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">Join the Movement</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Partner with Autonxt to accelerate India's clean energy transition. Together, we drive change.
          </p>
          <Link href="/book">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-10 text-lg">
              Partner With Us <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
