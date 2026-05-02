import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";
import { X } from "lucide-react";

import tractor1 from "@assets/1_1777731255751.png";
import tractor2 from "@assets/2_1777731255751.png";
import trailerImg from "@assets/7.LeftSideGateWall_1777731255752.jpg";
import fieldImg from "@assets/8.RightSideGateWall_1777731255752.jpg";
import batteryImg from "@assets/battery_1777731255752.png";
import motorImg from "@assets/motor_1777731255752.png";

const images = [
  { src: fieldImg, alt: "Autonxt X45C2 at Golden Hour", span: "md:col-span-2 md:row-span-2", label: "X45C2 — Field Edition" },
  { src: tractor1, alt: "Autonxt X45H2 Electric Tractor", span: "md:col-span-1 md:row-span-1", label: "X45H2 — 45HP Flagship" },
  { src: tractor2, alt: "Autonxt X25H4 Electric Tractor", span: "md:col-span-1 md:row-span-1", label: "X25H4 — Compact Series" },
  { src: trailerImg, alt: "Autonxt X45C2 with Trailer", span: "md:col-span-2 md:row-span-1", label: "X45C2 — Commercial Hauling" },
  { src: batteryImg, alt: "Autonxt LFP Battery Pack", span: "md:col-span-1 md:row-span-1", label: "LFP Battery System" },
  { src: motorImg, alt: "Autonxt NXT-Drive Motor", span: "md:col-span-1 md:row-span-1", label: "NXT-Drive Motor" },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <div className="w-full min-h-screen pt-20 pb-20 bg-background">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-14">
          <motion.p
            className="text-primary font-semibold text-sm uppercase tracking-widest mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Visual Showcase
          </motion.p>
          <motion.h1
            className="font-display text-4xl md:text-6xl font-bold mb-4 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Built to <span className="text-primary">Impress.</span>
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            A visual journey through Autonxt's machines, technology, and the fields they power.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[220px] md:auto-rows-[260px] gap-4 md:gap-5">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className={`relative rounded-2xl overflow-hidden border border-border group cursor-zoom-in bg-muted/30 ${img.span}`}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              onClick={() => setLightbox({ src: img.src, alt: img.alt })}
              data-testid={`gallery-item-${i}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 p-2"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-2xl" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-sm font-semibold">{img.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-display font-bold text-foreground mb-3">Want to see it in person?</h3>
          <p className="text-muted-foreground mb-6">Schedule a demo at our nearest experience center or at your farm.</p>
          <Link href="/book">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold" data-testid="btn-schedule-viewing">
              Schedule a Demo
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            onClick={() => setLightbox(null)}
            data-testid="btn-close-lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-w-full max-h-[85vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </div>
  );
}
