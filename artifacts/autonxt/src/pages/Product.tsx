import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Battery, Gauge, Zap } from "lucide-react";
import { Link } from "wouter";

import tractor1 from "@assets/1_1777731255751.png";
import tractor2 from "@assets/2_1777731255751.png";
import batteryImg from "@assets/battery_1777731255752.png";
import motorImg from "@assets/motor_1777731255752.png";
import fieldImg from "@assets/8.RightSideGateWall_1777731255752.jpg";

const products = [
  {
    name: "Autonxt X45H2",
    type: "45HP Electric Tractor",
    badge: "Flagship",
    badgeColor: "bg-primary",
    image: tractor1,
    description:
      "Our premium 45HP electric tractor built for heavy-duty agricultural work. Designed for large farms and commercial operations — zero diesel, maximum output.",
    specs: [
      { label: "Motor Power", value: "45 HP" },
      { label: "Range / Charge", value: "10+ hrs" },
      { label: "Charge Time", value: "4 hrs" },
      { label: "Max Torque", value: "280 Nm" },
      { label: "Implement Rating", value: "3-Point", },
      { label: "Warranty", value: "5 Years" },
    ],
    features: ["AI-assisted load management", "Remote fleet tracking", "Solar charging compatible", "OTA software updates"],
  },
  {
    name: "Autonxt X25H4",
    type: "25HP Electric Tractor",
    badge: "Best Value",
    badgeColor: "bg-accent",
    image: tractor2,
    description:
      "The ideal entry-level electric tractor for small and medium farms. Compact, lightweight, and incredibly efficient — proven across India's diverse agricultural terrain.",
    specs: [
      { label: "Motor Power", value: "25 HP" },
      { label: "Range / Charge", value: "8+ hrs" },
      { label: "Charge Time", value: "3 hrs" },
      { label: "Max Torque", value: "160 Nm" },
      { label: "Weight", value: "1,400 kg" },
      { label: "Warranty", value: "5 Years" },
    ],
    features: ["Lightweight chassis", "Precision agriculture ready", "Solar charging compatible", "Easy-service design"],
  },
];

export default function Product() {
  return (
    <div className="w-full min-h-screen pt-20 pb-20 bg-background">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <motion.p
            className="text-primary font-semibold text-sm uppercase tracking-widest mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Our Electric Lineup
          </motion.p>
          <motion.h1
            className="font-display text-4xl md:text-6xl font-bold mb-6 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            The <span className="text-primary">Lineup.</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            India's most advanced electric tractors — engineered for every farm size, every terrain, every season.
          </motion.p>
        </div>

        {/* Product List */}
        <div className="space-y-24 mb-24">
          {products.map((product, index) => (
            <motion.div
              key={index}
              className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              data-testid={`product-card-${index}`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative bg-muted/30 rounded-2xl border border-border p-10 flex items-center justify-center group hover:border-primary/40 transition-colors">
                  <span className={`absolute top-5 left-5 text-xs font-bold text-white px-3 py-1.5 rounded-full ${product.badgeColor}`}>{product.badge}</span>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full max-w-sm object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-7">
                <div>
                  <span className="text-primary font-semibold tracking-widest uppercase text-xs block mb-2">{product.type}</span>
                  <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">{product.name}</h2>
                  <p className="text-muted-foreground text-lg">{product.description}</p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="bg-white border border-border rounded-xl p-3 text-center hover:border-primary/30 transition-colors">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{spec.label}</p>
                      <p className="text-base font-bold text-foreground">{spec.value}</p>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <ul className="space-y-2.5">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-3 pt-2">
                  <Link href="/book">
                    <Button className="bg-primary text-white hover:bg-primary/90 font-semibold" data-testid={`btn-reserve-${index}`}>
                      Reserve Now
                    </Button>
                  </Link>
                  <Link href="/book">
                    <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white font-semibold">
                      Book Test Drive
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {[
            { img: batteryImg, title: "LFP Battery Pack", desc: "High-density Lithium Iron Phosphate cells. 2,000+ charge cycles. IP67 waterproofed. Designed for decade-long farm life.", icon: Battery },
            { img: motorImg, title: "NXT-Drive Motor", desc: "Axial flux permanent magnet motor. 96% peak efficiency. Instant torque delivery. India-manufactured with local service network.", icon: Zap },
          ].map((tech, i) => (
            <motion.div
              key={i}
              className="bg-white border border-border rounded-2xl p-8 flex gap-6 items-start hover:border-primary/30 hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="shrink-0 w-24 h-24 rounded-xl bg-muted/40 flex items-center justify-center border border-border p-3">
                <img src={tech.img} alt={tech.title} className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <tech.icon className="w-4 h-4 text-primary" />
                  <h3 className="font-display text-lg font-bold text-foreground">{tech.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{tech.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Field CTA */}
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <img src={fieldImg} alt="Autonxt in the Field" className="w-full h-72 object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          <div className="absolute inset-0 flex items-center px-10 md:px-16">
            <div className="max-w-lg">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Ready to experience it?</h2>
              <Link href="/book">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold">
                  Schedule a Test Drive <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
