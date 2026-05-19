import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowRight, ArrowLeft, CheckCircle2, Zap, BatteryCharging,
  Gauge, Shield, Wifi, Sun, Wrench, Clock, Weight, Thermometer,
  Settings, Activity,
} from "lucide-react";
const tractor1 = "/3dmodel/x45.glb";
const tractor2 = "/3dmodel/x45.glb";
const tractor3 = "/3dmodel/x45.glb";
const batteryImg = "/images/product-battery.png";
const motorImg = "/images/product-autonomous.png";

const TractorViewer3D = lazy(() => import("@/components/TractorViewer3D"));

const TRACTORS: Record<string, {
  name: string; type: string; badge: string; badgeColor: string;
  tagline: string; desc: string; image: typeof tractor1; glbSrc: string;
  status: "available" | "upcoming";
  specs: { label: string; value: string; icon: React.ElementType }[];
  features: { icon: React.ElementType; title: string; desc: string }[];
  battery: { label: string; value: string }[];
  motor: { label: string; value: string }[];
  applications: string[];
  highlights: string[];
}> = {
  x45h2: {
    name: "AutoNxt X45H2",
    type: "45HP Electric Tractor",
    badge: "Flagship",
    badgeColor: "bg-primary",
    tagline: "India's Most Powerful Electric Tractor",
    desc: "The X45H2 is AutoNxt's flagship agricultural and industrial electric tractor. Built for heavy-duty operations across large farms, sugar mills, cement plants, and construction sites — it delivers 45HP of instant electric torque, an 8+ hour runtime, and zero direct emissions. The world's first iCAT-certified electric tractor, now commercially available across India.",
    image: tractor1,
    glbSrc: "/3dmodel/x45.glb",
    status: "available",
    specs: [
      { label: "Motor Power", value: "45 HP (32 kW)", icon: Zap },
      { label: "Battery Capacity", value: "38.4 kWh LFP", icon: BatteryCharging },
      { label: "Runtime", value: "8–10 hrs", icon: Clock },
      { label: "Charge Time", value: "3–4 hrs (AC)", icon: Activity },
      { label: "Max Torque", value: "280 Nm", icon: Gauge },
      { label: "Weight", value: "2,200 kg", icon: Weight },
      { label: "Top Speed", value: "25 km/h", icon: Settings },
      { label: "PTO Power", value: "540 RPM", icon: Wrench },
      { label: "Hitch Type", value: "3-Point Cat II", icon: Settings },
      { label: "Cooling", value: "Liquid-Cooled Battery", icon: Thermometer },
      { label: "IP Rating", value: "IP67 (Battery Pack)", icon: Shield },
      { label: "Warranty", value: "5 Years", icon: Shield },
    ],
    features: [
      { icon: Wifi, title: "Remote Fleet Telematics", desc: "Real-time GPS tracking, battery status, motor health, and geo-fencing via the AutoNxt cloud platform — accessible from any device." },
      { icon: Zap, title: "AI-Assisted Load Management", desc: "Intelligent power distribution system automatically optimises torque output and regen braking based on load and terrain." },
      { icon: Sun, title: "Solar Charging Compatible", desc: "Full compatibility with solar charging systems — reducing grid dependency and running cost to near-zero on sun-rich farms." },
      { icon: Settings, title: "OTA Software Updates", desc: "Over-the-air firmware updates ensure your tractor always runs the latest performance and safety software, no service visit needed." },
      { icon: Shield, title: "iCAT Certified", desc: "The only electric tractor in India certified by the International Centre for Automotive Technology for all three HP variants." },
      { icon: Wrench, title: "Low Maintenance", desc: "No engine oil, air filters, fuel injectors, or clutch discs. Periodic servicing is reduced to brake inspection and tyre rotation." },
    ],
    battery: [
      { label: "Chemistry", value: "Lithium Iron Phosphate (LFP)" },
      { label: "Capacity", value: "38.4 kWh" },
      { label: "Cell Cycle Life", value: "2,000+ charge cycles" },
      { label: "IP Rating", value: "IP67 (waterproof)" },
      { label: "Cooling", value: "Active liquid cooling" },
      { label: "BMS", value: "Multi-layer Battery Management System" },
      { label: "Charge Port", value: "IEC Type 2 (AC)" },
      { label: "Charge Time", value: "3–4 hours at 7.4 kW AC" },
    ],
    motor: [
      { label: "Type", value: "Permanent Magnet Synchronous Motor" },
      { label: "Peak Power", value: "32 kW (45 HP)" },
      { label: "Peak Torque", value: "280 Nm" },
      { label: "Peak Efficiency", value: "96%" },
      { label: "Cooling", value: "Oil-cooled" },
      { label: "Controller", value: "AutoNxt NXT-Drive VCU" },
      { label: "Drive Mode", value: "Single-speed reduction gearbox" },
      { label: "Regen Braking", value: "Adjustable 3-level regenerative braking" },
    ],
    applications: [
      "Large-scale paddy and wheat farming",
      "Sugarcane haulage and crushing operations",
      "Biomass baling and transportation",
      "Cement plant material handling",
      "Construction site earth preparation",
      "Airport ground support operations",
      "Metal plant internal logistics",
    ],
    highlights: [
      "India's first iCAT-certified electric tractor",
      "First commercial delivery: Jaywant Sugars Ltd., Karad (March 2024)",
      "Available now — production units ready to deliver",
      "Eligible for FAME-III and state EV subsidies",
      "5-year comprehensive warranty",
      "Made in India — Thane, Maharashtra",
    ],
  },
  x25h2: {
    name: "AutoNxt X25H2",
    type: "25HP Electric Tractor",
    badge: "Compact",
    badgeColor: "bg-accent",
    tagline: "Precision Electric Power for Small & Medium Farms",
    desc: "The X25H2 brings AutoNxt's zero-emission electric drivetrain to small and medium-scale agriculture. Lighter, more manoeuvrable, and more affordable than the X45H2, it's designed for precision farming, orchard operations, and mixed-crop farms where a compact, highly efficient tractor is the right tool.",
    image: tractor2,
    glbSrc: "/3dmodel/x45.glb",
    status: "upcoming",
    specs: [
      { label: "Motor Power", value: "25 HP (18 kW)", icon: Zap },
      { label: "Battery Capacity", value: "24 kWh LFP", icon: BatteryCharging },
      { label: "Runtime", value: "8+ hrs", icon: Clock },
      { label: "Charge Time", value: "3 hrs (AC)", icon: Activity },
      { label: "Max Torque", value: "160 Nm", icon: Gauge },
      { label: "Weight", value: "1,400 kg", icon: Weight },
      { label: "Top Speed", value: "22 km/h", icon: Settings },
      { label: "PTO Power", value: "540 RPM", icon: Wrench },
      { label: "Hitch Type", value: "3-Point Cat I/II", icon: Settings },
      { label: "Cooling", value: "Liquid-Cooled Battery", icon: Thermometer },
      { label: "IP Rating", value: "IP67 (Battery Pack)", icon: Shield },
      { label: "Warranty", value: "5 Years", icon: Shield },
    ],
    features: [
      { icon: Gauge, title: "Lightweight Chassis", desc: "At just 1,400 kg, the X25H2 causes minimal soil compaction — critical for precision farming and horticulture operations." },
      { icon: Settings, title: "Precision Agriculture Ready", desc: "ISOBUS compatibility and GPS-ready architecture for integration with precision seeding, spraying, and guidance systems." },
      { icon: Sun, title: "Solar Charging Compatible", desc: "Smaller battery pack charges fully in 3 hours — ideal for farm-based solar charging setups with a 10–15 panel array." },
      { icon: Wrench, title: "Easy-Service Design", desc: "Modular component layout allows battery and motor service without specialist equipment — critical for remote farm locations." },
      { icon: Wifi, title: "Fleet Telematics", desc: "Same AutoNxt telematics platform as the X45H2 — GPS, runtime tracking, and remote diagnostics included." },
      { icon: Shield, title: "IP67 Battery", desc: "Fully sealed battery pack rated for paddy field flooding conditions and monsoon season operation." },
    ],
    battery: [
      { label: "Chemistry", value: "Lithium Iron Phosphate (LFP)" },
      { label: "Capacity", value: "24 kWh" },
      { label: "Cell Cycle Life", value: "2,000+ charge cycles" },
      { label: "IP Rating", value: "IP67 (waterproof)" },
      { label: "Cooling", value: "Active liquid cooling" },
      { label: "BMS", value: "Multi-layer Battery Management System" },
      { label: "Charge Port", value: "IEC Type 2 (AC)" },
      { label: "Charge Time", value: "3 hours at 7.4 kW AC" },
    ],
    motor: [
      { label: "Type", value: "Permanent Magnet Synchronous Motor" },
      { label: "Peak Power", value: "18 kW (25 HP)" },
      { label: "Peak Torque", value: "160 Nm" },
      { label: "Peak Efficiency", value: "95%" },
      { label: "Cooling", value: "Oil-cooled" },
      { label: "Controller", value: "AutoNxt NXT-Drive VCU" },
      { label: "Drive Mode", value: "Single-speed reduction gearbox" },
      { label: "Regen Braking", value: "3-level regenerative braking" },
    ],
    applications: [
      "Mixed-crop small and medium farms (5–30 acres)",
      "Orchard and horticulture operations",
      "Paddy field transplanting and harvesting support",
      "Vegetable and cash crop farming",
      "Cooperative farm pools",
      "Precision agriculture pilot projects",
    ],
    highlights: [
      "Lightest electric tractor in AutoNxt's lineup",
      "Minimum soil compaction — ideal for precision farming",
      "Charges fully from a 10-panel farm solar setup",
      "Eligible for FAME-III and PM-KISAN linked EV subsidies",
      "5-year comprehensive warranty",
      "Coming soon — register interest now",
    ],
  },
  x25h4: {
    name: "AutoNxt X25H4",
    type: "25HP Electric Tractor",
    badge: "Best Value",
    badgeColor: "bg-accent",
    tagline: "The Ideal Entry-Level Electric Tractor",
    desc: "The X25H4 is AutoNxt's entry-level electric tractor — proven across India's diverse agricultural terrain. Compact, lightweight, and incredibly efficient, it's the right choice for small and medium farms looking to transition to electric without the upfront cost of a larger machine.",
    image: tractor2,
    glbSrc: "/3dmodel/x45.glb",
    status: "available",
    specs: [
      { label: "Motor Power", value: "25 HP (18 kW)", icon: Zap },
      { label: "Battery Capacity", value: "24 kWh LFP", icon: BatteryCharging },
      { label: "Runtime", value: "8+ hrs", icon: Clock },
      { label: "Charge Time", value: "3 hrs (AC)", icon: Activity },
      { label: "Max Torque", value: "160 Nm", icon: Gauge },
      { label: "Weight", value: "1,400 kg", icon: Weight },
      { label: "Top Speed", value: "22 km/h", icon: Settings },
      { label: "PTO Power", value: "540 RPM", icon: Wrench },
      { label: "Hitch Type", value: "3-Point Cat I/II", icon: Settings },
      { label: "Cooling", value: "Liquid-Cooled Battery", icon: Thermometer },
      { label: "IP Rating", value: "IP67 (Battery Pack)", icon: Shield },
      { label: "Warranty", value: "5 Years", icon: Shield },
    ],
    features: [
      { icon: Gauge, title: "Lightweight Chassis", desc: "At just 1,400 kg, minimal soil compaction — ideal for precision farming and horticulture." },
      { icon: Settings, title: "Precision Agriculture Ready", desc: "ISOBUS compatible and GPS-ready for integration with precision seeding and guidance systems." },
      { icon: Sun, title: "Solar Charging Compatible", desc: "3-hour full charge — ideal for farm-based solar setups." },
      { icon: Wrench, title: "Easy-Service Design", desc: "Modular layout allows battery and motor service without specialist equipment at remote farm locations." },
      { icon: Wifi, title: "Fleet Telematics", desc: "GPS, runtime tracking, and remote diagnostics via the AutoNxt cloud platform." },
      { icon: Shield, title: "IP67 Battery", desc: "Fully sealed for paddy field flooding and monsoon operation." },
    ],
    battery: [
      { label: "Chemistry", value: "Lithium Iron Phosphate (LFP)" },
      { label: "Capacity", value: "24 kWh" },
      { label: "Cell Cycle Life", value: "2,000+ charge cycles" },
      { label: "IP Rating", value: "IP67" },
      { label: "Cooling", value: "Active liquid cooling" },
      { label: "BMS", value: "Multi-layer Battery Management System" },
      { label: "Charge Port", value: "IEC Type 2 (AC)" },
      { label: "Charge Time", value: "3 hours at 7.4 kW AC" },
    ],
    motor: [
      { label: "Type", value: "Permanent Magnet Synchronous Motor" },
      { label: "Peak Power", value: "18 kW (25 HP)" },
      { label: "Peak Torque", value: "160 Nm" },
      { label: "Peak Efficiency", value: "95%" },
      { label: "Cooling", value: "Oil-cooled" },
      { label: "Controller", value: "AutoNxt NXT-Drive VCU" },
      { label: "Drive Mode", value: "Single-speed reduction gearbox" },
      { label: "Regen Braking", value: "3-level regenerative braking" },
    ],
    applications: [
      "Small and medium farms (5–30 acres)",
      "Orchard and horticulture",
      "Paddy transplanting and harvesting support",
      "Vegetable and cash crop operations",
      "Cooperative farm pools",
    ],
    highlights: [
      "Lightest in AutoNxt lineup — minimal soil compaction",
      "Charges fully from a 10-panel farm solar setup",
      "Eligible for FAME-III and PM-KISAN EV subsidies",
      "5-year warranty",
      "Available now",
      "Made in India — Thane, Maharashtra",
    ],
  },
  x60h2: {
    name: "AutoNxt X60H2",
    type: "60HP Electric Tractor",
    badge: "Heavy Duty",
    badgeColor: "bg-amber-600",
    tagline: "Maximum Power. Zero Emissions.",
    desc: "The X60H2 is AutoNxt's most powerful tractor — designed for large-scale industrial and agricultural operations that demand the highest torque and longest runtime. With a 52 kWh LFP battery and 60HP peak output, it can handle the heaviest hauling, tilling, and implement-driving tasks across India's largest farms and industrial sites.",
    image: tractor1,
    glbSrc: "/3dmodel/x45.glb",
    status: "upcoming",
    specs: [
      { label: "Motor Power", value: "60 HP (45 kW)", icon: Zap },
      { label: "Battery Capacity", value: "52 kWh LFP", icon: BatteryCharging },
      { label: "Runtime", value: "10+ hrs", icon: Clock },
      { label: "Charge Time", value: "4–5 hrs (AC)", icon: Activity },
      { label: "Max Torque", value: "360 Nm", icon: Gauge },
      { label: "Weight", value: "2,800 kg", icon: Weight },
      { label: "Top Speed", value: "28 km/h", icon: Settings },
      { label: "PTO Power", value: "540/1000 RPM", icon: Wrench },
      { label: "Hitch Type", value: "3-Point Cat III", icon: Settings },
      { label: "Cooling", value: "Dual Liquid-Cooled System", icon: Thermometer },
      { label: "IP Rating", value: "IP68 (Battery Pack)", icon: Shield },
      { label: "Warranty", value: "5 Years", icon: Shield },
    ],
    features: [
      { icon: Zap, title: "60HP Peak Electric Output", desc: "The highest-power tractor in AutoNxt's range — capable of driving heavy balers, subsoilers, and large disc harrows at full depth." },
      { icon: BatteryCharging, title: "52 kWh LFP Battery", desc: "The largest battery pack in AutoNxt's lineup delivers 10+ hours of continuous operation at rated load — enough for a full working day plus buffer." },
      { icon: Wifi, title: "Advanced Telematics", desc: "Real-time multi-parameter monitoring including individual cell voltage, coolant temperature, torque demand, and geo-fencing alerts." },
      { icon: Shield, title: "IP68 Battery", desc: "Enhanced sealing rated for sustained water submersion — for deep paddy and waterlogged terrain operations." },
      { icon: Settings, title: "Dual PTO Speeds", desc: "540 and 1000 RPM PTO — compatible with the full range of large-scale agricultural implements." },
      { icon: Sun, title: "DC Fast Charge Ready", desc: "Optional DC fast charging port for 2-hour top-up during shift breaks at equipped industrial sites." },
    ],
    battery: [
      { label: "Chemistry", value: "Lithium Iron Phosphate (LFP)" },
      { label: "Capacity", value: "52 kWh" },
      { label: "Cell Cycle Life", value: "2,500+ charge cycles" },
      { label: "IP Rating", value: "IP68" },
      { label: "Cooling", value: "Dual active liquid cooling" },
      { label: "BMS", value: "Advanced multi-layer BMS with cell balancing" },
      { label: "Charge Port", value: "IEC Type 2 (AC) + CCS2 DC (optional)" },
      { label: "Charge Time", value: "4–5 hrs AC / 2 hrs DC fast charge" },
    ],
    motor: [
      { label: "Type", value: "Permanent Magnet Synchronous Motor" },
      { label: "Peak Power", value: "45 kW (60 HP)" },
      { label: "Peak Torque", value: "360 Nm" },
      { label: "Peak Efficiency", value: "97%" },
      { label: "Cooling", value: "Liquid-cooled" },
      { label: "Controller", value: "AutoNxt NXT-Drive Pro VCU" },
      { label: "Drive Mode", value: "2-speed reduction gearbox" },
      { label: "Regen Braking", value: "Variable regenerative braking" },
    ],
    applications: [
      "Large-scale wheat, paddy, and sugarcane farms (100+ acres)",
      "Industrial biomass haulage",
      "Heavy construction site earth preparation",
      "Steel and metal plant logistics",
      "Port and logistics yard operations",
      "Government and institutional agriculture",
    ],
    highlights: [
      "Highest-power electric tractor in India",
      "10+ hour runtime — entire working day on one charge",
      "CCS2 DC fast charge option for industrial sites",
      "Dual PTO speeds for heavy implement compatibility",
      "Coming soon — register interest for priority delivery",
      "Eligible for FAME-III and state heavy EV incentives",
    ],
  },
  h55c2: {
    name: "AutoNxt H55C2",
    type: "60HP Premium Tractor",
    badge: "Most Powerful",
    badgeColor: "bg-emerald-600",
    tagline: "Liquid-Cooled Power for Commercial Agriculture",
    desc: "The H55C2 is AutoNxt's premium 60HP tractor featuring a 66 kWh liquid-cooled battery pack — the largest in the lineup. Engineered for all-day commercial operation with the industry's fastest charge time of just 1.5 hours DC, it is purpose-built for sugar mills, large paddy farms, and industrial sites that need maximum uptime.",
    image: tractor3,
    glbSrc: "/hitem3d-1.glb",
    status: "available",
    specs: [
      { label: "Motor Power",      value: "60 HP (45 kW)",             icon: Zap            },
      { label: "Battery Capacity", value: "66 kWh Liquid-Cooled",      icon: BatteryCharging },
      { label: "Runtime",          value: "10–12 hrs",                 icon: Clock          },
      { label: "Charge Time",      value: "1.5 hrs DC / 7 hrs AC",     icon: Activity       },
      { label: "Max Torque",       value: "360 Nm",                    icon: Gauge          },
      { label: "Weight",           value: "2,900 kg",                  icon: Weight         },
      { label: "Top Speed",        value: "28 km/h",                   icon: Settings       },
      { label: "PTO Power",        value: "540/1000 RPM",              icon: Wrench         },
      { label: "Hitch Type",       value: "3-Point Cat III",           icon: Settings       },
      { label: "Cooling",          value: "Active Liquid Cooling",     icon: Thermometer    },
      { label: "IP Rating",        value: "IP68 (Battery Pack)",       icon: Shield         },
      { label: "Warranty",         value: "5 Years",                   icon: Shield         },
    ],
    features: [
      { icon: BatteryCharging, title: "66 kWh Liquid-Cooled Battery", desc: "The largest battery in AutoNxt's lineup with active liquid cooling — sustains rated output for a full 10–12 hour working day regardless of ambient temperature." },
      { icon: Zap,             title: "1.5 hr DC Fast Charge",        desc: "CCS2 DC fast charging port delivers a full charge in just 90 minutes — the fastest of any electric tractor in India, ideal for shift-change quick top-ups." },
      { icon: Wifi,            title: "Advanced Fleet Telematics",    desc: "Real-time cell-level battery monitoring, coolant temperature, torque demand, geo-fencing, and remote diagnostics via the AutoNxt cloud platform." },
      { icon: Shield,          title: "IP68 Battery",                 desc: "Enhanced sealing rated for sustained submersion — operates reliably through deep paddy flooding and the harshest Indian monsoon conditions." },
      { icon: Settings,        title: "Dual PTO Speeds",              desc: "540 and 1000 RPM PTO — compatible with the full range of large agricultural and industrial implements including balers and heavy disc harrows." },
      { icon: Sun,             title: "Solar-DC Hybrid Charging",     desc: "Compatible with on-farm solar DC charging arrays — combine rooftop solar with the DC fast charge port for near-zero running costs." },
    ],
    battery: [
      { label: "Chemistry",     value: "Lithium Iron Phosphate (LFP)"            },
      { label: "Capacity",      value: "66 kWh"                                  },
      { label: "Cell Cycle Life", value: "2,500+ charge cycles"                  },
      { label: "IP Rating",     value: "IP68 (waterproof — submersion rated)"    },
      { label: "Cooling",       value: "Active liquid cooling"                   },
      { label: "BMS",           value: "Advanced cell-level BMS with balancing"  },
      { label: "Charge Port",   value: "IEC Type 2 (AC) + CCS2 DC"              },
      { label: "Charge Time",   value: "1.5 hrs DC fast / 7 hrs AC"             },
    ],
    motor: [
      { label: "Type",          value: "Permanent Magnet Synchronous Motor"  },
      { label: "Peak Power",    value: "45 kW (60 HP)"                       },
      { label: "Peak Torque",   value: "360 Nm"                              },
      { label: "Peak Efficiency", value: "97%"                               },
      { label: "Cooling",       value: "Liquid-cooled"                       },
      { label: "Controller",    value: "AutoNxt NXT-Drive Pro VCU"           },
      { label: "Drive Mode",    value: "2-speed reduction gearbox"           },
      { label: "Regen Braking", value: "Variable regenerative braking"       },
    ],
    applications: [
      "Sugarcane haulage and mill operations (100+ acre farms)",
      "Commercial paddy and wheat farms",
      "Industrial biomass processing and haulage",
      "Steel and metal plant internal logistics",
      "Construction site heavy earth preparation",
      "Government and institutional agriculture",
      "Airport and port ground operations",
    ],
    highlights: [
      "66 kWh liquid-cooled battery — longest runtime in India",
      "1.5 hr DC fast charge — fastest electric tractor charge",
      "Dual PTO (540/1000 RPM) for all heavy implements",
      "IP68 battery — monsoon & flood-terrain rated",
      "Available now — production units ready",
      "Eligible for FAME-III and state commercial EV incentives",
    ],
  },
};

export default function TractorDetail({ params }: { params: { slug: string } }) {
  const tractor = TRACTORS[params?.slug ?? ""];

  if (!tractor) {
    return (
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Tractor not found</h1>
          <Link href="/product"><Button>← Back to Products</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="bg-surface-dark relative overflow-hidden pt-28 pb-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,hsl(0,72%,40%,0.14),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,hsl(214,65%,32%,0.10),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(hsl(0,0%,100%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,0%,100%) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <Link href="/product" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Tractors
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-16">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 mb-5">
                <span className={`text-xs font-bold text-white px-3 py-1.5 rounded-full ${tractor.badgeColor}`}>{tractor.badge}</span>
                {tractor.status === "upcoming" && (
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/15 border border-amber-400/30 px-3 py-1.5 rounded-full">Coming Soon</span>
                )}
                {tractor.status === "available" && (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-400/15 border border-emerald-400/30 px-3 py-1.5 rounded-full">Available Now</span>
                )}
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">{tractor.name}</h1>
              <p className="text-primary font-semibold text-lg mb-5">{tractor.tagline}</p>
              <p className="text-white/55 text-base leading-relaxed mb-8 max-w-lg">{tractor.desc}</p>
              <div className="flex gap-3">
                <Link href="/book">
                  <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold h-12 px-7">
                    {tractor.status === "available" ? "Reserve Now" : "Register Interest"} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/book">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-12 px-7">
                    Book Test Drive
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="relative w-full h-[420px]"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            >
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl scale-150 pointer-events-none" />
                  <img src={tractor.image} alt={tractor.name} className="relative h-64 md:h-80 object-contain drop-shadow-2xl" loading="eager" decoding="async" />
                </div>
              }>
                <TractorViewer3D
                  src={tractor.glbSrc}
                  fallbackSrc={tractor.image}
                  className="w-full h-full"
                  rotate
                  showHint
                />
              </Suspense>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface-dark to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section className="py-12 bg-primary/5 border-b border-primary/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tractor.highlights.map((h, i) => (
              <motion.div key={i} className="flex items-start gap-2"
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground text-xs leading-snug font-medium">{h}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL SPECS ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <motion.div className="flex items-center justify-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">Technical Specifications</p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
            <motion.h2 className="font-display text-3xl md:text-4xl font-bold text-foreground" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Full Specs — {tractor.name}
            </motion.h2>
          </div>
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            {tractor.specs.map((spec, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors text-center">
                <spec.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{spec.label}</p>
                <p className="font-bold text-foreground text-sm">{spec.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <motion.div className="flex items-center justify-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">Key Features</p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
            <motion.h2 className="font-display text-3xl font-bold text-foreground" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              What Sets the {tractor.name} Apart
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tractor.features.map((f, i) => (
              <motion.div key={i} className="bg-card border border-border rounded-2xl p-7 hover:border-primary/30 hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BATTERY & MOTOR ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <motion.div className="flex items-center justify-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">Core Technology</p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "LFP Battery Pack", img: batteryImg, data: tractor.battery, icon: BatteryCharging },
              { title: "NXT-Drive Motor", img: motorImg, data: tractor.motor, icon: Zap },
            ].map((tech, ti) => (
              <motion.div key={ti} className="bg-card border border-border rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ti * 0.1 }}>
                <div className="bg-muted/40 p-6 flex items-center gap-5 border-b border-border">
                  <div className="w-16 h-16 rounded-xl bg-background border border-border flex items-center justify-center">
                    <img src={tech.img} alt={tech.title} className="w-10 h-10 object-contain" loading="lazy" />
                  </div>
                  <div>
                    <tech.icon className="w-4 h-4 text-primary mb-1" />
                    <h3 className="font-display font-bold text-foreground text-lg">{tech.title}</h3>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {tech.data.map((row, i) => (
                    <div key={i} className="flex items-center justify-between px-6 py-3">
                      <span className="text-muted-foreground text-sm">{row.label}</span>
                      <span className="font-semibold text-foreground text-sm text-right max-w-[55%]">{row.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATIONS ── */}
      <section className="py-20 bg-muted/40 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div className="flex items-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <div className="h-px w-10 bg-primary rounded-full" />
                <p className="text-primary font-bold text-sm uppercase tracking-widest">Applications</p>
              </motion.div>
              <motion.h2 className="font-display text-3xl font-bold text-foreground mb-8" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                Where the {tractor.name} Works Best
              </motion.h2>
              <ul className="space-y-3">
                {tractor.applications.map((a, i) => (
                  <motion.li key={i} className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                    <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0 w-[18px] h-[18px]" />
                    <span className="text-foreground text-sm">{a}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div className="bg-surface-dark rounded-2xl p-8 text-white"
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="font-display font-bold text-xl mb-6">5-Year Cost Comparison</h3>
              <div className="space-y-4">
                {[
                  { label: "Diesel Tractor (45HP)", fuel: "₹8–12L/year fuel", maint: "₹1.5L/year service", color: "bg-red-500/20 border-red-500/30" },
                  { label: `${tractor.name}`, fuel: "₹1.2–2L/year electricity", maint: "₹40K/year service", color: "bg-emerald-500/20 border-emerald-500/30" },
                ].map((row, i) => (
                  <div key={i} className={`rounded-xl border p-4 ${row.color}`}>
                    <p className="font-bold text-white text-sm mb-2">{row.label}</p>
                    <p className="text-white/70 text-xs">{row.fuel} · {row.maint}</p>
                  </div>
                ))}
                <div className="pt-3 border-t border-white/10">
                  <p className="text-emerald-400 font-bold text-sm">Save ₹35–50L over 5 years vs diesel</p>
                  <p className="text-white/50 text-xs mt-1">Based on 8 hrs/day, 300 days/year operation</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0,72%,30%,0.5),transparent_65%)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <motion.div className="max-w-xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              {tractor.status === "available" ? `Get the ${tractor.name}` : `Register for the ${tractor.name}`}
            </h2>
            <p className="text-white/75 text-lg mb-10">
              {tractor.status === "available"
                ? "Reserve your unit, book a test drive, or speak to our product team for a custom quote."
                : "Register your interest and get priority delivery notification when the X60H2 launches."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 h-12">
                  {tractor.status === "available" ? "Reserve Now" : "Register Interest"} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/product">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold px-8 h-12">
                  Compare All Models
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
