import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, MapPin, Clock, Briefcase, Zap, Users, Rocket, Heart } from "lucide-react";

const OPEN_ROLES = [
  {
    title: "Senior Embedded Systems Engineer",
    dept: "Engineering",
    location: "Thane, Maharashtra",
    type: "Full-time",
    desc: "Design and develop firmware for AutoNxt's electric powertrain, BMS, and CAN bus communication systems. Strong experience in C/C++ and real-time OS required.",
  },
  {
    title: "Mechanical Design Engineer – Drivetrain",
    dept: "Engineering",
    location: "Thane, Maharashtra",
    type: "Full-time",
    desc: "Lead the mechanical design of tractor drivetrains, gearboxes, and implement coupling systems. Proficiency in SolidWorks and hands-on fabrication experience preferred.",
  },
  {
    title: "Agricultural Field Engineer",
    dept: "Operations",
    location: "Pan-India (Travel)",
    type: "Full-time",
    desc: "Work directly with farmers and agri-industrial clients to deploy AutoNxt tractors, collect field performance data, and provide technical support across India.",
  },
  {
    title: "Business Development Manager – Agri Sector",
    dept: "Sales",
    location: "Pune / Nashik",
    type: "Full-time",
    desc: "Build and manage relationships with large farms, sugar mills, and agri-industrial clients. Drive tractor sales, leasing partnerships, and government procurement tenders.",
  },
  {
    title: "IoT & Telematics Engineer",
    dept: "Engineering",
    location: "Thane, Maharashtra",
    type: "Full-time",
    desc: "Develop the AutoNxt fleet telematics platform — GPS tracking, remote diagnostics, OTA updates, and data pipelines from in-field sensors to cloud dashboards.",
  },
  {
    title: "Marketing & Content Strategist",
    dept: "Marketing",
    location: "Mumbai / Remote",
    type: "Full-time",
    desc: "Own AutoNxt's digital presence — content marketing, social media, case studies, and SEO. Experience in agri-tech or sustainability sectors is a strong plus.",
  },
];

const PERKS = [
  { icon: Zap, title: "Mission-Driven Work", desc: "Help decarbonise Indian agriculture — every product you build has real environmental impact.", color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
  { icon: Rocket, title: "Startup Velocity", desc: "Flat structure, fast decisions, and the opportunity to own significant technical and business challenges from day one.", color: "text-accent", bg: "bg-accent/10", border: "border-accent/20" },
  { icon: Users, title: "Deep Field Exposure", desc: "Our engineers regularly visit farms across Maharashtra, Punjab, and Andhra Pradesh — you'll understand the problem you're solving.", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  { icon: Heart, title: "Equity & Growth", desc: "Competitive compensation, ESOPs for key roles, and a clear growth path as AutoNxt scales nationally.", color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200" },
];

const DEPT_COLORS: Record<string, string> = {
  Engineering: "bg-blue-50 text-blue-700 border border-blue-200",
  Operations: "bg-amber-50 text-amber-700 border border-amber-200",
  Sales: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Marketing: "bg-purple-50 text-purple-700 border border-purple-200",
};

export default function Careers() {
  return (
    <div className="w-full min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="bg-surface-dark relative overflow-hidden pt-28 pb-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,hsl(0,72%,40%,0.12),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,hsl(214,65%,32%,0.09),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(hsl(0,0%,100%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,0%,100%) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div className="pb-16">
              <motion.div
                className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-4 py-1.5 mb-6"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-xs font-bold uppercase tracking-widest">Careers at AutoNxt</span>
              </motion.div>
              <motion.h1
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.06]"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              >
                Build the <span className="text-primary">Future</span><br />of Farming.
              </motion.h1>
              <motion.p
                className="text-white/55 text-lg max-w-lg leading-relaxed mb-10"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
              >
                Join a team of engineers, agronomists, and business builders who are electrifying Indian agriculture — one tractor at a time.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}
              >
                {[
                  { icon: Briefcase, label: "Open Roles", value: `${OPEN_ROLES.length} Positions` },
                  { icon: MapPin, label: "Locations", value: "Thane · Mumbai" },
                  { icon: Users, label: "Team Size", value: "30+ People" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center">
                      <f.icon className="w-4 h-4 text-white/60" />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest font-medium">{f.label}</p>
                      <p className="text-white font-bold text-sm">{f.value}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div
              className="relative pb-0 hidden lg:block"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            >
              <div className="grid grid-cols-3 gap-2 h-[420px]">
                <div className="col-span-2 row-span-2 rounded-tl-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80"
                    alt="Engineers at work"
                    className="w-full h-full object-cover"
                    loading="eager" decoding="async"
                  />
                </div>
                <div className="rounded-tr-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80"
                    alt="Team collaboration"
                    className="w-full h-full object-cover"
                    loading="eager" decoding="async"
                  />
                </div>
                <div className="overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=500&q=80"
                    alt="Field work"
                    className="w-full h-full object-cover"
                    loading="eager" decoding="async"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface-dark to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY AUTONXT ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <motion.div className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">Why Join Us</p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
            <motion.h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Work on Problems That Matter.
            </motion.h2>
            <motion.p className="text-muted-foreground"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              AutoNxt is tackling one of India's most pressing challenges — making agriculture sustainable and economically viable for millions of farmers.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PERKS.map((p, i) => (
              <motion.div
                key={i}
                className={`bg-card border ${p.border} rounded-2xl p-7 hover:shadow-lg transition-all`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              >
                <div className={`w-10 h-10 rounded-xl ${p.bg} flex items-center justify-center mb-4`}>
                  <p.icon className={`w-5 h-5 ${p.color}`} />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN ROLES ── */}
      <section className="py-24 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <motion.div className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">Open Positions</p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
            <motion.h2 className="font-display text-3xl md:text-4xl font-bold text-foreground"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              {OPEN_ROLES.length} Roles Available Now
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {OPEN_ROLES.map((role, i) => (
              <motion.div
                key={i}
                className="bg-card border border-border rounded-2xl p-7 hover:border-primary/30 hover:shadow-lg transition-all group"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 2) * 0.07 }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${DEPT_COLORS[role.dept] ?? "bg-muted text-muted-foreground"}`}>
                    {role.dept}
                  </span>
                </div>
                <h3 className="font-display font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors leading-snug">
                  {role.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{role.desc}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" />{role.location}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary" />{role.type}</span>
                </div>
                <div className="mt-5 pt-5 border-t border-border">
                  <a
                    href="mailto:sales@autonxt.in?subject=Application: ${role.title}"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    Apply via Email <ArrowRight className="w-3.5 h-3.5" />
                  </a>
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
          <motion.div
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Don't See Your Role?</h2>
            <p className="text-white/75 text-lg mb-10">
              We're always looking for exceptional talent. Send us your CV and tell us how you'd contribute to AutoNxt's mission.
            </p>
            <a href="mailto:sales@autonxt.in?subject=Open Application - AutoNxt">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 h-12">
                Send Open Application <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
