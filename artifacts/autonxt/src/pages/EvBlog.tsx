import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, Zap, BatteryCharging, Globe, Cpu } from "lucide-react";

const CATEGORIES = ["All", "Battery Tech", "Policy & Incentives", "Market Trends", "Future Tech"];

const ARTICLES = [
  {
    icon: BatteryCharging,
    cat: "Battery Tech",
    title: "Solid-State Batteries: What They Mean for Electric Tractors by 2030",
    date: "April 2025",
    readTime: "7 min",
    summary: "Solid-state batteries promise 2x the energy density of today's LFP cells, near-zero degradation over 10+ years, and complete elimination of fire risk. Here's how that technology roadmap intersects with agricultural EV design challenges.",
    accent: "bg-blue-50 text-blue-700",
  },
  {
    icon: Globe,
    cat: "Policy & Incentives",
    title: "How India's PM-KUSUM and FAME Schemes Are Powering Agricultural EV Adoption",
    date: "March 2025",
    readTime: "6 min",
    summary: "India's subsidy architecture for agricultural EVs is evolving rapidly. PM-KUSUM provides solar charging infrastructure while FAME-III targets agri-EV acquisition cost parity. We map out every available incentive for Indian farmers going electric.",
    accent: "bg-green-50 text-green-700",
  },
  {
    icon: Zap,
    cat: "Market Trends",
    title: "Electric Tractor Market in India: ₹4,000 Cr Opportunity by 2027",
    date: "February 2025",
    readTime: "5 min",
    summary: "India's electric tractor market is expected to grow at 38% CAGR through 2027, driven by rising diesel prices, government policy, and increasing farmer awareness. AutoNxt is positioned at the leading edge of this transformation.",
    accent: "bg-orange-50 text-orange-700",
  },
  {
    icon: Cpu,
    cat: "Future Tech",
    title: "Level 4 Autonomy in Agriculture: AutoNxt's Roadmap to Driverless Farming",
    date: "January 2025",
    readTime: "9 min",
    summary: "While the automotive world targets level 4 autonomy for roads, we are targeting fields. The constraints are different — GPS precision, soil variability, implement compatibility. This is our engineering roadmap to fully autonomous electric tractors.",
    accent: "bg-purple-50 text-purple-700",
  },
  {
    icon: BatteryCharging,
    cat: "Battery Tech",
    title: "Fast Charging for Farms: How AutoNxt Is Building India's Agri-EV Charging Grid",
    date: "December 2024",
    readTime: "6 min",
    summary: "Urban EV charging is solved. Rural agricultural charging is not. AutoNxt is pioneering a solar-powered mobile charging network designed for Indian farms, from 5-acre holdings to 500-acre industrial operations.",
    accent: "bg-yellow-50 text-yellow-700",
  },
  {
    icon: Globe,
    cat: "Market Trends",
    title: "Why Indian Electric Tractors Are Winning Export Markets in Africa and Southeast Asia",
    date: "November 2024",
    readTime: "7 min",
    summary: "The same challenges that shaped AutoNxt for India — rough terrain, variable power supply, extreme heat, cost sensitivity — make AutoNxt tractors ideal for emerging agricultural markets globally. An overview of export demand signals.",
    accent: "bg-teal-50 text-teal-700",
  },
];

const STATS = [
  { value: "38%", label: "Market CAGR 2024–27" },
  { value: "₹4,000 Cr", label: "India EV Tractor TAM by 2027" },
  { value: "70%", label: "Lower running costs vs diesel" },
  { value: "0", label: "Direct CO₂ emissions" },
];

export default function EvBlog() {
  return (
    <div className="w-full min-h-screen pt-20 pb-0 bg-background">

      {/* Header */}
      <section className="py-16 bg-foreground">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <motion.div className="flex items-center gap-2 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Zap className="w-4 h-4 text-primary" />
            <p className="text-primary font-semibold text-sm uppercase tracking-widest">EV Knowledge Hub</p>
          </motion.div>
          <motion.h1
            className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          >
            Everything Electric. <br /><span className="text-primary">Everything Agriculture.</span>
          </motion.h1>
          <motion.p className="text-lg text-white/70 max-w-2xl" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Deep technical insights, market analysis, policy breakdowns, and future forecasts on electric vehicles in Indian and global agriculture.
          </motion.p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-8">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <div className="font-display text-2xl md:text-3xl font-black text-white">{s.value}</div>
                <div className="text-white/70 text-xs mt-1 uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTICLES.map((a, i) => (
              <motion.div
                key={i}
                className="bg-white border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-md transition-all group flex flex-col"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.07 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${a.accent}`}>{a.cat}</span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${a.accent}`}>
                    <a.icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-bold text-foreground text-sm leading-snug mb-3 group-hover:text-primary transition-colors flex-1">{a.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-3">{a.summary}</p>
                <div className="flex items-center gap-3 text-muted-foreground text-[11px] mt-auto pt-3 border-t border-border">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{a.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{a.readTime}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-2xl text-center">
          <Zap className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">Stay Charged on EV News</h2>
          <p className="text-muted-foreground mb-6">Get the latest insights on electric agriculture, battery technology, and policy updates delivered to your inbox.</p>
          <a href="mailto:info@autonxt.in?subject=Subscribe to EV Blog">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold px-8">
              Subscribe to Updates <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
