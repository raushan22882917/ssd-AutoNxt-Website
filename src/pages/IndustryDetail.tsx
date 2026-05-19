import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowRight, ArrowLeft, CheckCircle2, Leaf, Building2, Hammer,
  Shield, PlaneTakeoff, Factory, Zap, BatteryCharging, Clock,
  Truck, Settings, Globe, Users,
} from "lucide-react";
const tractor1 = "/images/product-ev-platform.png";
const tractor2 = "/images/product-autonomous.png";

const INDUSTRIES: Record<string, {
  title: string; badge: string; tagline: string; desc: string;
  icon: React.ElementType; bg: string; image: string;
  applications: { icon: React.ElementType; title: string; desc: string }[];
  benefits: string[];
  challenges: string; solution: string;
  models: { name: string; hp: string; img: typeof tractor1; note: string; slug: string }[];
}> = {
  biomass: {
    title: "Biomass",
    badge: "BIOMASS",
    tagline: "Zero-Emission Biomass Collection & Processing",
    desc: "India generates over 500 million tonnes of agricultural biomass annually. AutoNxt electric tractors are purpose-engineered for the unique demands of biomass collection, baling, transportation, and processing — delivering higher uptime, lower per-tonne cost, and zero exhaust emissions inside storage and processing facilities.",
    icon: Leaf, bg: "bg-lime-700",
    image: "/images/industry/biomass.png",
    applications: [
      { icon: Truck, title: "Biomass Haulage", desc: "Tow loaded biomass trailers across large collection areas with sustained high torque — no heat soak, no diesel exhaust in enclosed biomass bays." },
      { icon: Settings, title: "Baling Operations", desc: "Drive round and square balers with consistent PTO output. Electric torque curve is ideal for baler demand spikes without engine stalling." },
      { icon: Factory, title: "In-Plant Transportation", desc: "Move biomass bales inside processing plants where diesel fumes are a health hazard. AutoNxt's zero-emission operation is safe for enclosed environments." },
      { icon: Globe, title: "Field Collection", desc: "Multiple-pass field collection with 8+ hours of runtime per charge. Smart telematics tracks field coverage and optimises collection routes." },
    ],
    benefits: [
      "70% lower operating cost vs diesel over 5 years",
      "Zero fumes — safe for indoor biomass storage and processing",
      "8–10 hrs continuous operation per charge",
      "iCAT certified for commercial agricultural use",
      "Solar charging integration reduces grid dependency",
      "Remote fleet monitoring via AutoNxt telematics portal",
    ],
    challenges: "Biomass operations run long shifts, often inside sheds where diesel fumes create serious air quality and fire risks. High fuel costs erode margins, and unplanned maintenance during harvest season disrupts the entire supply chain.",
    solution: "AutoNxt X45H2 delivers 45HP of instant electric torque with zero exhaust emissions, making it safe inside biomass processing facilities. With 8+ hours of runtime and a 4-hour charge cycle, facilities can run two shifts with a single tractor using overnight charging.",
    models: [
      { name: "AutoNxt X45H2", hp: "45 HP", img: tractor1, note: "Primary choice for biomass haulage and baling", slug: "x45h2" },
      { name: "AutoNxt X25H2", hp: "25 HP", img: tractor2, note: "Ideal for small to medium biomass collection operations", slug: "x25h2" },
    ],
  },
  cement: {
    title: "Cement Manufacturing",
    badge: "CEMENT",
    tagline: "Cleaner, Quieter Cement Plant Operations",
    desc: "Cement plants are dust-heavy, noise-intensive, and fuel-dependent environments. AutoNxt electric tractors transform internal logistics — from raw material handling to clinker transportation — reducing operational emissions and dramatically cutting fuel costs at scale.",
    icon: Building2, bg: "bg-orange-700",
    image: "/images/industry/cement.png",
    applications: [
      { icon: Truck, title: "Raw Material Logistics", desc: "Haul limestone, clay, and additives across plant corridors. Electric operation reduces dust re-suspension compared to diesel turbulence." },
      { icon: Factory, title: "Clinker Transportation", desc: "Move clinker between kilns, coolers, and silos with sustained high-torque capability and no overheating concerns in high-temperature zones." },
      { icon: Settings, title: "Bag Handling", desc: "Efficiently move palletised cement bags in dispatch yards. Quiet electric operation improves working conditions for yard staff." },
      { icon: Globe, title: "Site Maintenance", desc: "Ground levelling, compaction assist, and utility towing across the plant perimeter with a single versatile electric tractor." },
    ],
    benefits: [
      "Eliminates diesel exhaust in enclosed plant corridors",
      "Lower noise reduces worker fatigue in 24/7 plant environments",
      "No hydraulic oil spills — critical near cement storage areas",
      "iCAT certified for heavy industrial deployment",
      "OTA software updates keep performance optimal",
      "Fleet telematics integrates with plant management systems",
    ],
    challenges: "Cement plants consume thousands of litres of diesel per month in internal logistics alone. High ambient temperatures cause diesel engines to overheat. Emissions regulations are tightening, and plants need to demonstrate ESG progress to investors.",
    solution: "AutoNxt electric tractors generate no exhaust and run cooler in high-ambient environments. With modular battery architecture, battery packs can be serviced without taking the entire tractor offline, minimising disruption to 24/7 plant operations.",
    models: [
      { name: "AutoNxt X45H2", hp: "45 HP", img: tractor1, note: "Recommended for clinker transport and heavy haulage", slug: "x45h2" },
      { name: "AutoNxt X60H2", hp: "60 HP", img: tractor1, note: "Coming soon — ideal for large-scale cement plants", slug: "x60h2" },
    ],
  },
  construction: {
    title: "Construction Industry",
    badge: "CONSTRUCTION",
    tagline: "Sustainable Power for India's Building Boom",
    desc: "India's construction sector adds millions of square metres of floor space every year. AutoNxt electric tractors bring zero-emission, high-torque performance to site preparation, material transport, and equipment positioning — reducing a site's carbon footprint while cutting fuel costs.",
    icon: Hammer, bg: "bg-yellow-700",
    image: "/images/industry/construction.png",
    applications: [
      { icon: Truck, title: "Material Haulage", desc: "Transport sand, aggregate, bricks, and steel reinforcement across active construction sites with a stable, high-torque electric drivetrain." },
      { icon: Settings, title: "Site Preparation", desc: "Ground levelling, compaction, and sub-base preparation with implement compatibility across the full 3-point hitch spec." },
      { icon: Factory, title: "Equipment Positioning", desc: "Tow and position construction equipment including compactors, generators, and lighting towers across uneven terrain." },
      { icon: Globe, title: "Green Building Compliance", desc: "Reduce site-level diesel emissions to meet GRIHA and IGBC green building certification requirements." },
    ],
    benefits: [
      "Meets green building site emission standards (GRIHA / IGBC)",
      "Lower noise — complies with residential site work hour restrictions",
      "Rugged chassis rated for uneven and gravel surfaces",
      "Instant torque ideal for loaded hauls on inclines",
      "No fuel storage risk on-site — reduces fire hazard",
      "Eligible for FAME-III and state EV subsidies",
    ],
    challenges: "Construction sites face increasing regulatory pressure on diesel emissions, particularly near urban residential zones. Fuel logistics are complex and theft-prone. Diesel engines struggle with dusty air filters and temperature extremes on exposed sites.",
    solution: "AutoNxt X45H2's sealed electric drivetrain is unaffected by dust ingress. It requires no fuel delivery and the battery can be charged overnight from the site's temporary power supply or a portable solar charging unit.",
    models: [
      { name: "AutoNxt X45H2", hp: "45 HP", img: tractor1, note: "Primary choice for construction site haulage and earth prep", slug: "x45h2" },
      { name: "AutoNxt X60H2", hp: "60 HP", img: tractor1, note: "Coming soon — for large-scale infrastructure projects", slug: "x60h2" },
    ],
  },
  defence: {
    title: "Defence",
    badge: "DEFENCE",
    tagline: "Silent. Rugged. Mission-Ready.",
    desc: "Defence and paramilitary operations demand equipment that is reliable under pressure, operable in austere environments, and increasingly — low acoustic and thermal signature. AutoNxt electric tractors are engineered for base logistics, airfield support, and all-terrain utility with remote operation capability on the roadmap.",
    icon: Shield, bg: "bg-slate-700",
    image: "/images/industry/defence.png",
    applications: [
      { icon: Truck, title: "Base Logistics", desc: "Move supplies, ammunition storage units, and equipment between base facilities with zero acoustic signature that could compromise security perimeters." },
      { icon: Settings, title: "Airfield Maintenance", desc: "Runway sweeping, ground support equipment towing, and perimeter maintenance — all with zero exhaust fumes near aircraft and fuel stores." },
      { icon: Factory, title: "Field Training Support", desc: "Support field training operations with reliable tractor utility that doesn't require fuel convoys — critical in remote or forward locations." },
      { icon: Globe, title: "Emergency Response", desc: "Rapid-deployment base utility for disaster response operations where refuelling logistics are unavailable or impractical." },
    ],
    benefits: [
      "Near-silent electric operation reduces acoustic signature",
      "No thermal signature from exhaust — improved situational security",
      "Elimates fuel dependency for short-range base logistics",
      "Rugged chassis rated for unpaved and off-road terrain",
      "Remote monitoring and future autonomous operation capability",
      "Lower maintenance burden — no engine oil, filters, or injectors",
    ],
    challenges: "Defence logistics require equipment that can operate quietly, in diverse terrain, without complex fuel logistics. Diesel generators and tractors create acoustic and thermal signatures that compromise operational security.",
    solution: "AutoNxt's electric powertrain operates near-silently and generates no exhaust heat signature, making it ideal for base perimeter operations. The modular battery pack can be charged via a field generator or vehicle-mounted solar system.",
    models: [
      { name: "AutoNxt X45H2", hp: "45 HP", img: tractor1, note: "Primary recommendation for defence base logistics", slug: "x45h2" },
    ],
  },
  airport: {
    title: "Airport Operations",
    badge: "AIRPORT",
    tagline: "Greener Ground Operations for Indian Airports",
    desc: "Airports are under intense pressure to reduce ground-level emissions. AutoNxt electric tractors are ideal for airside baggage handling, runway maintenance, cargo movement, and perimeter operations — replacing diesel vehicles that contribute to poor air quality in sensitive terminal environments.",
    icon: PlaneTakeoff, bg: "bg-sky-700",
    image: "/images/industry/airport.png",
    applications: [
      { icon: Truck, title: "Baggage & Cargo Towing", desc: "Tow loaded baggage trailers and cargo dollies between terminals, aircraft, and cargo bays with zero exhaust fumes near passengers and crew." },
      { icon: Settings, title: "Runway & Taxiway Maintenance", desc: "FOD (Foreign Object Debris) removal, grass cutting, and surface marking maintenance on active airside areas with near-silent operation." },
      { icon: Factory, title: "Ground Support Equipment", desc: "Tow GPU (Ground Power Units), aircraft steps, and catering trucks on the apron, reducing the diesel fleet within DGCA emission compliance zones." },
      { icon: Globe, title: "Perimeter Security Patrols", desc: "Electric tractors equipped with trailers support security patrol logistics with low noise and zero exhaust — critical near fuel farms." },
    ],
    benefits: [
      "Meets DGCA and ICAO ground emissions standards",
      "Near-silent operation improves ATC communication environment",
      "Zero fumes — critical near aviation fuel stores",
      "Eligible for UDAN green ground operations grants",
      "OTA updates allow remote configuration for airside protocols",
      "Fleet telematics integrates with airport operations centres",
    ],
    challenges: "Airports face strict DGCA and ICAO guidelines on ground-level emissions. Diesel ground vehicles near fuel farms create fire risks. Noise from diesel equipment disrupts ATC and passenger communications in terminal-adjacent areas.",
    solution: "AutoNxt's zero-emission, near-silent electric tractors are ideal for airside environments. They can be charged overnight in ground equipment hangars and monitored via AutoNxt's telematics platform, which can integrate with airport AODB systems.",
    models: [
      { name: "AutoNxt X45H2", hp: "45 HP", img: tractor1, note: "Recommended for baggage towing and runway maintenance", slug: "x45h2" },
      { name: "AutoNxt X25H2", hp: "25 HP", img: tractor2, note: "Suitable for smaller regional airports and apron logistics", slug: "x25h2" },
    ],
  },
  metal: {
    title: "Metal Manufacturing",
    badge: "METAL",
    tagline: "Heavy-Duty Electric Logistics for Metal Plants",
    desc: "Metal manufacturing facilities — from steel mills to aluminium smelters and metal fabrication plants — require intensive internal logistics. AutoNxt electric tractors handle heavy material haulage with high sustained torque, while eliminating diesel exhaust fumes in enclosed factory environments where worker health is paramount.",
    icon: Factory, bg: "bg-slate-600",
    image: "/images/industry/metal.png",
    applications: [
      { icon: Truck, title: "Coil & Sheet Haulage", desc: "Transport steel coils, aluminium sheets, and metal billets across plant logistics corridors with the sustained high torque required for heavy trailer loads." },
      { icon: Settings, title: "Scrap Material Handling", desc: "Move scrap bins and material to processing or collection areas with precise, controllable traction — minimising risk in tight plant aisles." },
      { icon: Factory, title: "Furnace Charge Transport", desc: "Support charge material transport to electric arc furnaces and induction furnaces in areas where diesel exhaust would degrade furnace atmosphere control." },
      { icon: Globe, title: "Finished Goods Dispatch", desc: "Move palletised finished metal products from production to dispatch bays efficiently, with telematics tracking every material movement." },
    ],
    benefits: [
      "Eliminates diesel exhaust in enclosed smelting and rolling environments",
      "Sustained high torque for heavy metal trailer loads",
      "IP-rated battery protection for high-dust environments",
      "Reduces fire risk near flammable metal processing agents",
      "Compatible with plant-level power management systems",
      "ESG reporting-ready: real-time CO₂ savings data via telematics",
    ],
    challenges: "Metal plants face extreme ambient heat, dust from grinding and cutting, and strict air quality requirements near furnaces. Diesel exhaust in enclosed rolling and smelting areas creates both health hazards and interference with process atmosphere control.",
    solution: "AutoNxt X45H2's sealed electric powertrain is immune to dust ingress and generates no exhaust. In high-ambient-temperature metal plant environments, the liquid-cooled battery pack maintains optimal temperature without the overheating issues that plague diesel engines.",
    models: [
      { name: "AutoNxt X45H2", hp: "45 HP", img: tractor1, note: "Primary choice for metal plant haulage and logistics", slug: "x45h2" },
      { name: "AutoNxt X60H2", hp: "60 HP", img: tractor1, note: "Coming soon — for heavy steel mill applications", slug: "x60h2" },
    ],
  },
};

export default function IndustryDetail({ params }: { params: { slug: string } }) {
  const industry = INDUSTRIES[params?.slug ?? ""];

  if (!industry) {
    return (
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Industry not found</h1>
          <Link href="/industry"><Button>← Back to Industries</Button></Link>
        </div>
      </div>
    );
  }

  const Icon = industry.icon;

  return (
    <div className="w-full min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden h-[520px] flex items-end pb-0">
        <img src={industry.image} alt={industry.title} className="absolute inset-0 w-full h-full object-cover" loading="eager" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,hsl(0,72%,40%,0.20),transparent_50%)]" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/industry" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Industries
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl ${industry.bg} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-white/60 text-xs font-bold uppercase tracking-widest">{industry.badge}</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {industry.title}
            </h1>
            <p className="text-primary font-semibold text-lg">{industry.tagline}</p>
          </motion.div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <motion.div className="flex items-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <div className="h-px w-10 bg-primary rounded-full" />
                <p className="text-primary font-bold text-sm uppercase tracking-widest">Overview</p>
              </motion.div>
              <motion.p className="text-muted-foreground text-lg leading-relaxed" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                {industry.desc}
              </motion.p>
            </div>
            <div className="lg:col-span-2 space-y-5">
              <motion.div className="bg-muted/40 border border-border rounded-2xl p-6" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h3 className="font-bold text-foreground text-sm uppercase tracking-widest mb-3 text-primary">The Challenge</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{industry.challenges}</p>
              </motion.div>
              <motion.div className="bg-primary/5 border border-primary/20 rounded-2xl p-6" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <h3 className="font-bold text-primary text-sm uppercase tracking-widest mb-3">The AutoNxt Solution</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{industry.solution}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── APPLICATIONS ── */}
      <section className="py-20 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <motion.div className="flex items-center justify-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">Key Applications</p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
            <motion.h2 className="font-display text-3xl md:text-4xl font-bold text-foreground" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              What AutoNxt Does Here
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {industry.applications.map((app, i) => (
              <motion.div key={i} className="bg-card border border-border rounded-2xl p-7 hover:border-primary/30 hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <app.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">{app.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{app.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <motion.div className="flex items-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <div className="h-px w-10 bg-primary rounded-full" />
                <p className="text-primary font-bold text-sm uppercase tracking-widest">Why AutoNxt</p>
              </motion.div>
              <motion.h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                Built for {industry.title}.
              </motion.h2>
              <ul className="space-y-4">
                {industry.benefits.map((b, i) => (
                  <motion.li key={i} className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm leading-relaxed">{b}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              {[
                { icon: Zap, label: "Electric Motor", value: "32–45 kW", desc: "Instant full torque from 0 RPM" },
                { icon: BatteryCharging, label: "Battery Range", value: "8–10 hrs", desc: "Per charge in continuous duty cycle" },
                { icon: Clock, label: "Charge Time", value: "3–4 hrs", desc: "AC charging from standard industrial supply" },
                { icon: Users, label: "Fleet Support", value: "24/7", desc: "Remote diagnostics and telematics" },
              ].map((stat, i) => (
                <motion.div key={i} className="flex items-center gap-4 bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                    <p className="font-display font-bold text-foreground text-lg">{stat.value}</p>
                  </div>
                  <p className="text-muted-foreground text-xs max-w-[120px] text-right">{stat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RECOMMENDED MODELS ── */}
      <section className="py-20 bg-muted/40 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <motion.div className="flex items-center justify-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">Recommended Models</p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
            <motion.h2 className="font-display text-3xl font-bold text-foreground" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              The Right Tractor for {industry.title}
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {industry.models.map((m, i) => (
              <motion.div key={i} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all group"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="bg-muted/30 p-8 flex items-center justify-center h-48">
                  <img src={m.img} alt={m.name} className="h-32 object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-lg" loading="lazy" decoding="async" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-bold text-foreground text-lg">{m.name}</h3>
                    <span className="text-xs font-black bg-foreground text-background px-2 py-1 rounded-md">{m.hp}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-5">{m.note}</p>
                  <Link href={`/product/${m.slug}`}>
                    <Button size="sm" className="w-full bg-primary text-white hover:bg-primary/90">
                      View Full Specs <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0,72%,30%,0.5),transparent_65%)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <motion.div className="max-w-xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Go Electric in {industry.title}?
            </h2>
            <p className="text-white/75 text-lg mb-10">
              Talk to our industrial solutions team. We'll help you assess fleet requirements, charging infrastructure, and TCO savings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 h-12">
                  Book a Consultation <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/industry">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold px-8 h-12">
                  All Industries
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
