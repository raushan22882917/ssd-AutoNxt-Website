import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { OptimizedImg } from "@/components/ui/optimized-img";

const VIDEO_IDS = [
  "3PVEHTybb_o",
  "9Px1KnfeBdY",
  "kia8cxkaUJc",
  "u2a1EoXayrk",
  "UHtiUSmO27I",
  "Z6107d2ygF0",
];

function VideoShowcase() {
  const { t } = useLang();

  return (
    <section className="pt-5 pb-10 md:pt-8 md:pb-16 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
              {t.home.videoActionTag}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t.home.videoHeading}
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">{t.home.videoSub}</p>
          </div>
          <a
            href="https://www.youtube.com/@autonxtautomation8368"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
          >
            <Button
              variant="outline"
              className="border-border hover:border-primary hover:text-primary gap-2 font-semibold"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#FF0000]">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              {t.home.viewChannel}
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.home.videos.map((title, i) => {
            const id = VIDEO_IDS[i];
            return (
              <motion.a
                key={id}
                href={`https://www.youtube.com/watch?v=${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl overflow-hidden border border-border hover:border-primary/40 hover:shadow-lg transition-all block bg-black"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08 }}
              >
                <div className="relative aspect-video">
                  <OptimizedImg
                    src={`/images/videos/${id}.jpg`}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary/90 group-hover:bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                      <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[14px] border-transparent border-l-white ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-card">
                  <p className="text-xs font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                    {title}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/gallery">
            <Button
              variant="outline"
              className="border-border hover:border-primary hover:text-primary font-semibold gap-2"
              data-testid="btn-view-all-videos"
            >
              {t.home.viewGallery} <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default VideoShowcase;
