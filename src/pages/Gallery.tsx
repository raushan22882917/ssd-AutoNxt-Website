import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Images, PlayCircle, CalendarDays, ExternalLink } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import MediaLightbox, { MediaItem } from "@/components/MediaLightbox";
import { buildItems } from "@/components/mediaHelpers";
import { OptimizedImg } from "@/components/ui/optimized-img";
import SEO from "@/components/SEO";

const tractor1 = "/images/products/x45h2.webp";
const event1   = "/images/events/event-1.webp";
const event3   = "/images/events/event-3.webp";
const event6   = "/images/events/event-6.webp";

export default function Gallery() {
  const { t } = useLang();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxItems, setLightboxItems] = useState<MediaItem[]>([]);
  const [initialIndex, setInitialIndex] = useState(0);

  const handleOpen = (section: "photos" | "videos" | "events") => {
    const items = buildItems(section, t);
    setLightboxItems(items);
    setInitialIndex(0);
    setLightboxOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <SEO title={t.nav.gallery} description="Browse images and videos of AutoNxt electric tractors at work in agriculture, fields, and industrial operations." />

      {/* ── HERO ── */}
      <section className="bg-background relative overflow-hidden pt-24 pb-0 lg:h-[93.75vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,hsl(0,72%,40%,0.12),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,hsl(214,65%,32%,0.09),transparent_50%)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(hsl(0,0%,0%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,0%,0%) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="container mx-auto px-4 md:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch h-full">
            <div className="h-full flex flex-col justify-between pb-12 lg:pb-0">
              <div>
                <motion.div
                  className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-4 py-1.5 mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary text-xs font-bold uppercase tracking-widest">
                    {t.gallery.galleryBadge || "AutoNxt Gallery"}
                  </span>
                </motion.div>
                <motion.h1
                  className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.06]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                >
                  {t.gallery.title}{" "}
                  <span className="text-primary">{t.gallery.titleHighlight}</span>
                </motion.h1>
                <motion.p
                  className="text-muted-foreground text-lg max-w-lg leading-relaxed mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.18 }}
                >
                  {t.gallery.desc}
                </motion.p>
              </div>
              <motion.div
                className="flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26 }}
              >
                {[
                  { icon: Images, label: t.galleryPage.galleryPhotos, value: "40+" },
                  { icon: PlayCircle, label: t.galleryPage.galleryVideos, value: "6" },
                  { icon: CalendarDays, label: t.galleryPage.galleryEvents, value: "5+" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center">
                      <f.icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-[10px] uppercase tracking-widest font-medium">{f.label}</p>
                      <p className="text-foreground font-bold text-sm">{f.value}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="relative pb-0 hidden lg:block h-full"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <div className="grid grid-cols-3 grid-rows-2 gap-2 h-full min-h-[420px]">
                <div className="col-span-2 row-span-2 rounded-tl-2xl overflow-hidden border border-border">
                  <OptimizedImg src={event6} alt="AutoNxt launch event" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="rounded-tr-2xl overflow-hidden border border-border">
                  <OptimizedImg src={event1} alt="AutoNxt field" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="overflow-hidden border border-border">
                  <OptimizedImg src={event3} alt="AutoNxt ceremony" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── GALLERY CATEGORIES ── */}
      <section className="py-16 md:py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4 md:px-8">

          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">{t.gallery.galleryBadge}</p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t.gallery.sectionHeading}
            </motion.h2>
            <p className="text-muted-foreground text-sm md:text-base">{t.gallery.desc}</p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-center gap-6 mb-16 w-full max-w-5xl mx-auto">
            {([
              {
                id: "videos" as const,
                label: t.gallery.videos,
                img: "/images/gallery-videos.webp",
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
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 group border-2 border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 bg-card ${className} hover:z-10`}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                data-testid={`tab-${id}`}
              >
                <OptimizedImg
                  src={img}
                  alt={label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading={id === "videos" ? "eager" : "lazy"}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                <div className="absolute bottom-5 left-5 z-10 flex flex-col items-start text-left">
                  {id === "videos" && (
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center mb-2.5 shadow-md group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-5 h-5 text-primary fill-primary/20" />
                    </div>
                  )}
                  <span className="text-white font-display font-bold text-lg md:text-xl tracking-wide drop-shadow-sm">
                    {label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* YouTube channel link */}
          <motion.div
            className="max-w-4xl mx-auto bg-card rounded-3xl p-8 md:p-10 text-center relative overflow-hidden border border-border shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,hsl(0,72%,45%,0.08),transparent_55%)] pointer-events-none" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-[#FF0000] rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_4px_20px_rgba(255,0,0,0.25)]">
                <PlayCircle className="w-7 h-7 text-white fill-white" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">{t.gallery.moreOnYouTube}</h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
                {t.gallery.youtubeDesc}
              </p>
              <a
                href="https://www.youtube.com/@autonxtautomation8368"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#FF0000] hover:bg-[#cc0000] text-white font-semibold px-8" size="lg">
                  {t.gallery.viewAllVideos} <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-display font-bold text-foreground mb-3">{t.gallery.seeInPerson}</h3>
            <p className="text-muted-foreground mb-6">{t.gallery.seeInPersonDesc}</p>
            <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold">
              <Link href="/book" data-testid="btn-schedule-viewing">
                {t.gallery.scheduleDemo}
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

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
