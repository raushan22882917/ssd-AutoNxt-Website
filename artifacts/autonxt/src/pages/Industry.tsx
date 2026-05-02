import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Truck, Bus, Zap, Building2, Leaf, Cpu } from "lucide-react";

const industries = [
  {
    icon: Zap,
    title: "Electric Passenger Vehicles",
    subtitle: "Personal Mobility",
    description:
      "Transforming how India commutes. Our passenger EV platforms deliver uncompromising range, safety, and tech — making electric the natural choice for every Indian family.",
    stats: [{ label: "Range", value: "650km" }, { label: "Models", value: "3+" }, { label: "States", value: "20+" }],
    color: "from-cyan-500/10 to-transparent",
  },
  {
    icon: Truck,
    title: "Commercial & Logistics",
    subtitle: "Fleet Solutions",
    description:
      "Powering the backbone of India's supply chain. Autonxt commercial platforms cut operational costs by 60% while eliminating emissions across last-mile and long-haul delivery.",
    stats: [{ label: "Payload", value: "5T" }, { label: "Uptime", value: "99.9%" }, { label: "Cost Savings", value: "60%" }],
    color: "from-orange-500/10 to-transparent",
  },
  {
    icon: Bus,
    title: "Public Transport",
    subtitle: "Urban Mobility",
    description:
      "Working with state transport corporations to deploy clean, comfortable, connected electric buses that redefine public transit for millions of daily commuters.",
    stats: [{ label: "Buses Deployed", value: "500+" }, { label: "Cities", value: "12" }, { label: "Passengers/Day", value: "2M+" }],
    color: "from-green-500/10 to-transparent",
  },
  {
    icon: Building2,
    title: "Smart Infrastructure",
    subtitle: "City & Government",
    description:
      "Partnering with municipal governments to build V2X-connected smart city infrastructure — charging networks, traffic optimization, and integrated energy management systems.",
    stats: [{ label: "Chargers", value: "1,200+" }, { label: "Uptime", value: "98%" }, { label: "City Partners", value: "8" }],
    color: "from-purple-500/10 to-transparent",
  },
  {
    icon: Leaf,
    title: "Agricultural & Rural",
    subtitle: "Bharat Mobility",
    description:
      "Bringing electric mobility to rural India with ruggedized EV platforms designed for agricultural work, rural last-mile connectivity, and off-grid solar charging.",
    stats: [{ label: "Villages Covered", value: "300+" }, { label: "Solar Chargers", value: "200+" }, { label: "States", value: "8" }],
    color: "from-lime-500/10 to-transparent",
  },
  {
    icon: Cpu,
    title: "Defense & Para-Military",
    subtitle: "Sovereign Mobility",
    description:
      "Developing specialized electric vehicles for India's defense and para-military forces — silent, zero-emission, built to handle India's most demanding terrain.",
    stats: [{ label: "Prototype Fleets", value: "3" }, { label: "Partners", value: "MoD" }, { label: "Classification", value: "Strategic" }],
    color: "from-red-500/10 to-transparent",
  },
];

export default function Industry() {
  return (
    <div className="w-full min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <motion.p
            className="text-primary font-semibold tracking-widest uppercase text-sm mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Sectors We Serve
          </motion.p>
          <motion.h1
            className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Every <span className="text-primary">Industry.</span> One Platform.
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Autonxt's modular technology stack is engineered to serve the full spectrum of India's mobility needs — from personal transport to national infrastructure.
          </motion.p>
        </div>

        {/* Industry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {industries.map((industry, i) => (
            <motion.div
              key={i}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10 p-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <industry.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs font-semibold text-primary/70 uppercase tracking-widest mb-2">{industry.subtitle}</p>
                <h3 className="font-display text-xl font-bold text-foreground mb-4">{industry.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">{industry.description}</p>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/50">
                  {industry.stats.map((stat, j) => (
                    <div key={j} className="text-center">
                      <p className="font-bold text-foreground text-lg">{stat.value}</p>
                      <p className="text-muted-foreground text-xs mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          className="rounded-3xl bg-primary/10 border border-primary/20 p-10 md:p-16 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">Don't see your sector?</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Our platform is infinitely adaptable. Talk to our solutions team to explore a custom partnership.
            </p>
            <Link href="/book">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-10 text-lg">
                Talk to Us <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
