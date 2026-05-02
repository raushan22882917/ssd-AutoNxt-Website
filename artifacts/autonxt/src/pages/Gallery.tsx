import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { X, ZoomIn, Images, PlayCircle, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

import tractor1 from "@assets/1_1777731255751.png";
import tractor2 from "@assets/2_1777731255751.png";
import trailerImg from "@assets/7.LeftSideGateWall_1777731255752.jpg";
import fieldImg from "@assets/8.RightSideGateWall_1777731255752.jpg";
import batteryImg from "@assets/battery_1777731255752.png";
import motorImg from "@assets/motor_1777731255752.png";
import logoImg from "@assets/adaptive-icon_1777731255752.png";

type Tab = "photos" | "videos";

const PHOTOS = [
  {
    src: fieldImg,
    alt: "Autonxt X45C2 at Golden Hour",
    label: "X45C2 — Field Edition",
    tag: "In the Field",
    wide: true,
  },
  {
    src: tractor1,
    alt: "Autonxt X45H2 Electric Tractor",
    label: "X45H2 — 45HP Flagship",
    tag: "Product",
    wide: false,
  },
  {
    src: tractor2,
    alt: "Autonxt X25H4 Electric Tractor",
    label: "X25H4 — Compact Series",
    tag: "Product",
    wide: false,
  },
  {
    src: trailerImg,
    alt: "Autonxt X45C2 with Commercial Trailer",
    label: "X45C2 — Commercial Hauling",
    tag: "Industrial",
    wide: true,
  },
  {
    src: batteryImg,
    alt: "Autonxt LFP Battery Pack",
    label: "Lithium Iron Phosphate Battery System",
    tag: "Technology",
    wide: false,
  },
  {
    src: motorImg,
    alt: "Autonxt NXT-Drive Motor",
    label: "NXT-Drive Axial Flux Motor",
    tag: "Technology",
    wide: false,
  },
  {
    src: logoImg,
    alt: "Autonxt Automation Logo",
    label: "Autonxt Automation",
    tag: "Brand",
    wide: false,
  },
];

const VIDEOS = [
  {
    id: "3PVEHTybb_o",
    title: "AutoNxt X45H2 Electric Tractor — Product Description (English)",
    desc: "Full product walkthrough of AutoNxt's flagship 45HP electric tractor — the X45H2 — covering specs, features, and capabilities.",
  },
  {
    id: "9Px1KnfeBdY",
    title: "X45H2 — Rotavator Puddling in Heavy Rains & Flooded Farms",
    desc: "Watch the X45H2 tackle rotavator puddling operations in heavy rainy season and completely flooded farm conditions.",
  },
  {
    id: "kia8cxkaUJc",
    title: "First Electric Tractor of Maharashtra Delivered to Jaywant Sugar Mill",
    desc: "Historic delivery of the first AutoNxt electric tractor to Jaywant Sugar Mill, Karad, Satara — a landmark for Indian agri-EV.",
  },
  {
    id: "u2a1EoXayrk",
    title: "AutoNxt 45HP Electric Tractor — Full Power Demo",
    desc: "See the X45H2 demonstrating its full torque and performance capabilities across multiple field operations.",
  },
  {
    id: "UHtiUSmO27I",
    title: "X45H2 — Haulage, Tiller, Reaper & Water Jet Wash",
    desc: "Comprehensive field demonstration of the X45H2 performing haulage, tilling, reaping operations and a thorough water jet wash.",
  },
  {
    id: "Z6107d2ygF0",
    title: "AutoNxt X45H2 इलेक्ट्रिक ट्रैक्टर — उत्पाद विवरण (हिंदी में)",
    desc: "हिंदी में AutoNxt X45H2 इलेक्ट्रिक ट्रैक्टर का पूरा उत्पाद विवरण — भारतीय किसानों के लिए।",
  },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<Tab>("photos");
  const [lightbox, setLightbox] = useState<{ index: number } | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const openLightbox = (index: number) => setLightbox({ index });
  const closeLightbox = () => setLightbox(null);
  const prevPhoto = () => {
    if (!lightbox) return;
    setLightbox({ index: (lightbox.index - 1 + PHOTOS.length) % PHOTOS.length });
  };
  const nextPhoto = () => {
    if (!lightbox) return;
    setLightbox({ index: (lightbox.index + 1) % PHOTOS.length });
  };

  return (
    <div className="w-full min-h-screen pt-20 pb-20 bg-background">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-12">
          <motion.p
            className="text-primary font-semibold text-sm uppercase tracking-widest mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Gallery
          </motion.p>
          <motion.h1
            className="font-display text-4xl md:text-6xl font-bold mb-4 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            See AutoNxt in <span className="text-primary">Action.</span>
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Explore our full photo gallery and watch real-world videos of AutoNxt electric tractors across farms, industries, and events.
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-muted/50 rounded-xl w-fit mb-12 border border-border">
          {([
            { id: "photos" as Tab, label: "Photos", icon: Images },
            { id: "videos" as Tab, label: "Videos", icon: PlayCircle },
          ]).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === id
                  ? "bg-white text-primary shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid={`tab-${id}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ── PHOTOS TAB ── */}
          {activeTab === "photos" && (
            <motion.div
              key="photos"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[240px] gap-4 md:gap-5">
                {PHOTOS.map((photo, i) => (
                  <motion.div
                    key={i}
                    className={`relative rounded-2xl overflow-hidden border border-border group cursor-zoom-in bg-muted/20 ${
                      photo.wide ? "sm:col-span-2" : ""
                    }`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    onClick={() => openLightbox(i)}
                    data-testid={`gallery-photo-${i}`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 p-3"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 rounded-2xl" />
                    {/* Tag */}
                    <div className="absolute top-3 left-3 bg-primary/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {photo.tag}
                    </div>
                    {/* Zoom icon */}
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm font-semibold leading-tight">{photo.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.p
                className="text-center text-muted-foreground text-sm mt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Click any photo to view full size
              </motion.p>
            </motion.div>
          )}

          {/* ── VIDEOS TAB ── */}
          {activeTab === "videos" && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {VIDEOS.map((video, i) => (
                  <motion.div
                    key={video.id}
                    className="bg-white border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    data-testid={`gallery-video-${i}`}
                  >
                    {activeVideo === video.id ? (
                      <div className="relative w-full aspect-video bg-black">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                        <button
                          onClick={() => setActiveVideo(null)}
                          className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-colors z-10"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        className="relative w-full aspect-video bg-foreground cursor-pointer group overflow-hidden"
                        onClick={() => setActiveVideo(video.id)}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                          }}
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <div className="w-0 h-0 border-t-[10px] border-b-[10px] border-l-[18px] border-transparent border-l-white ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-mono px-2 py-0.5 rounded flex items-center gap-1">
                          <PlayCircle className="w-3 h-3" /> YouTube
                        </div>
                      </div>
                    )}

                    <div className="p-5">
                      <h3 className="font-display font-bold text-foreground text-base mb-1.5 leading-snug">{video.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{video.desc}</p>
                      <a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                      >
                        Watch on YouTube <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* YouTube channel link */}
              <motion.div
                className="mt-12 bg-foreground rounded-2xl p-8 text-center relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-[#FF0000] rounded-full flex items-center justify-center mx-auto mb-4">
                    <PlayCircle className="w-7 h-7 text-white fill-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">More on YouTube</h3>
                  <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
                    Subscribe to the AutoNxt YouTube channel for product videos, farm demos, industry applications, and company updates.
                  </p>
                  <a
                    href="https://www.youtube.com/@AutoNxtAutomation"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-[#FF0000] hover:bg-[#cc0000] text-white font-semibold px-8" size="lg">
                      View All Videos on YouTube <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-display font-bold text-foreground mb-3">Want to see it in person?</h3>
          <p className="text-muted-foreground mb-6">Schedule a live demo at your farm or our nearest experience centre.</p>
          <Link href="/book">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold" data-testid="btn-schedule-viewing">
              Schedule a Demo
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/25 rounded-full p-2.5 transition-colors z-10"
              onClick={closeLightbox}
              data-testid="btn-close-lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/25 rounded-full p-2.5 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox.index}
              className="flex flex-col items-center gap-4 max-w-4xl w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={PHOTOS[lightbox.index].src}
                alt={PHOTOS[lightbox.index].alt}
                className="max-w-full max-h-[78vh] object-contain rounded-xl"
              />
              <div className="text-center">
                <span className="text-primary text-xs font-bold uppercase tracking-widest">{PHOTOS[lightbox.index].tag}</span>
                <p className="text-white font-semibold mt-1">{PHOTOS[lightbox.index].label}</p>
                <p className="text-white/50 text-xs mt-0.5">{lightbox.index + 1} / {PHOTOS.length}</p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/25 rounded-full p-2.5 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
