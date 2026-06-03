import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Images, PlayCircle, CalendarDays } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import MediaLightbox, { MediaItem } from "@/components/MediaLightbox";
import { buildItems } from "@/components/mediaHelpers";

// Organized public image paths
const tractor1   = "/images/products/x45h2.png";
const event1     = "/images/events/event-1.jpg";
const event3     = "/images/events/event-3.jpg";
const event6     = "/images/events/event-6.jpg";

export default function Gallery() {
  const { t } = useLang();
  
  // State for controlling the reusable fullscreen lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxItems, setLightboxItems] = useState<MediaItem[]>([]);
  const [initialIndex, setInitialIndex] = useState(0);

  // Click handler built at runtime inside the click trigger
  const handleOpen = (section: "photos" | "videos" | "events") => {
    const items = buildItems(section, t);
    setLightboxItems(items);
    setInitialIndex(0);
    setLightboxOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="bg-surface-dark relative overflow-hidden pt-28 pb-16 lg:h-[87.5vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,hsl(0,72%,40%,0.12),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,hsl(214,65%,32%,0.09),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(hsl(0,0%,100%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,0%,100%) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch h-full">
            <div className="h-full flex flex-col justify-between">
              <div>
                <motion.div
                  className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-4 py-1.5 mb-6"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary text-xs font-bold uppercase tracking-widest">AutoNxt Gallery</span>
                </motion.div>
                <motion.h1
                  className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.06]"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
                >
                  {t.gallery.title} <span className="text-primary">{t.gallery.titleHighlight}</span>
                </motion.h1>
                <motion.p
                  className="text-white/55 text-lg max-w-lg leading-relaxed mb-10"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
                >
                  {t.gallery.desc}
                </motion.p>
              </div>
              <motion.div
                className="flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}
              >
                {[
                  { icon: Images, label: t.galleryPage.galleryPhotos, value: "40+" },
                  { icon: PlayCircle, label: t.galleryPage.galleryVideos, value: "6" },
                  { icon: CalendarDays, label: t.galleryPage.galleryEvents, value: "5+" },
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
              className="relative pb-0 hidden lg:block h-full"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            >
              <div className="grid grid-cols-3 grid-rows-2 gap-2 h-full min-h-[420px]">
                <div className="col-span-2 row-span-2 rounded-tl-2xl overflow-hidden">
                  <img src={event6} alt="AutoNxt launch event" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-tr-2xl overflow-hidden">
                  <img src={event1} alt="AutoNxt field" className="w-full h-full object-cover" />
                </div>
                <div className="overflow-hidden">
                  <img src={event3} alt="AutoNxt ceremony" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface-dark to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── GALLERY CATEGORIES SECTION ── */}
      <div className="pb-20">
        <div className="container mx-auto px-4 md:px-8 pt-12">

          {/* Category Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              {t.gallery.sectionHeading}
            </h2>
            <div className="h-1 w-12 bg-primary rounded-full mx-auto" />
          </div>

          {/* Asymmetric Pinterest Grid */}
          <div className="flex flex-col md:flex-row md:items-center justify-center gap-6 mb-16 w-full max-w-5xl mx-auto">
            {([
              {
                id: "videos" as const,
                label: t.gallery.videos,
                img: "https://img.youtube.com/vi/3PVEHTybb_o/maxresdefault.jpg",
                className: "w-full md:w-[28%] h-[220px] md:h-[300px]",
              },
              {
                id: "photos" as const,
                label: t.gallery.photos,
                img: tractor1,
                className: "w-full md:w-[44%] h-[260px] md:h-[400px]",
              },
              {
                id: "events" as const,
                label: t.gallery.events,
                img: event1,
                className: "w-full md:w-[28%] h-[220px] md:h-[300px]",
              },
            ]).map(({ id, label, img, className }) => (
              <motion.div
                key={id}
                onClick={() => handleOpen(id)}
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 group border-2 border-border hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 scale-100 hover:scale-[1.02] ${className} hover:z-10`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                data-testid={`tab-${id}`}
              >
                <img
                  src={img}
                  alt={label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-primary/20 to-transparent transition-opacity duration-300" />
                
                {/* Bottom Left Info */}
                <div className="absolute bottom-5 left-5 z-10 flex flex-col items-start text-left">
                  {id === "videos" && (
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2.5 shadow-lg group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-5 h-5 text-white fill-white" />
                    </div>
                  )}
                  <span className="text-white font-display font-bold text-lg md:text-xl tracking-wide">{label}</span>
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
            <h3 className="text-2xl font-display font-bold text-foreground mb-3">{t.gallery.seeInPerson}</h3>
            <p className="text-muted-foreground mb-6">{t.gallery.seeInPersonDesc}</p>
            <Link href="/book">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold" data-testid="btn-schedule-viewing">
                {t.gallery.scheduleDemo}
              </Button>
            </Link>
          </motion.div>

        </div>
      </div>

      {/* ── REUSABLE FULLSCREEN PORTAL LIGHTBOX ── */}
      {lightboxOpen && (
        <MediaLightbox
          items={lightboxItems}
          initialIndex={initialIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

    </div>
  );
}
