import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";

export type MediaItem = {
  type: "image" | "video" | "event";
  src: string;          // image path (Vite asset) for image/event; YouTube or Vimeo URL for video
  alt: string;          // from i18n
  label: string;        // from i18n
  date?: string;        // only for events (optional)
};

export interface MediaLightboxProps {
  items: MediaItem[];
  initialIndex?: number;
  onClose: () => void;
}

// Regex to parse YouTube and Vimeo URLs
function parseVideoUrl(url: string) {
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/
  );
  if (ytMatch) {
    return { type: "youtube" as const, id: ytMatch[1] };
  }
  const vimeoMatch = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
  if (vimeoMatch) {
    return { type: "vimeo" as const, id: vimeoMatch[1] };
  }
  return null;
}

// Convert watch URL to embed URL
function getEmbedUrl(url: string) {
  const parsed = parseVideoUrl(url);
  if (!parsed) return url;
  if (parsed.type === "youtube") {
    return `https://www.youtube.com/embed/${parsed.id}?autoplay=1&rel=0`;
  }
  if (parsed.type === "vimeo") {
    return `https://player.vimeo.com/video/${parsed.id}?autoplay=1`;
  }
  return url;
}

// Get thumbnail path for strip
function getThumbnailUrl(item: MediaItem) {
  if (item.type === "image" || item.type === "event") {
    return item.src;
  }
  const parsed = parseVideoUrl(item.src);
  if (parsed && parsed.type === "youtube") {
    return `https://img.youtube.com/vi/${parsed.id}/mqdefault.jpg`;
  }
  return ""; // Returns empty string for Vimeo to show stylized play icon fallback
}

export default function MediaLightbox({ items, initialIndex = 0, onClose }: MediaLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const activeThumbRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  // Sync index if initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Navigate functions
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items.length]);

  // Auto-scroll active thumbnail to center
  useEffect(() => {
    if (activeThumbRef.current) {
      activeThumbRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);

  // Next image preloading
  useEffect(() => {
    if (items.length <= 1) return;
    const nextIndex = (currentIndex + 1) % items.length;
    const nextItem = items[nextIndex];

    if (!nextItem || nextItem.type === "video") return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = nextItem.src;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [currentIndex, items]);

  const currentItem = items[currentIndex];
  if (!currentItem) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between select-none">
      
      {/* ── TOP HEADER ── */}
      <div className="w-full flex items-center justify-between p-6 z-10">
        <div className="text-white/60 text-sm font-medium">
          {currentIndex + 1} / {items.length}
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* ── MAIN CONTENT VIEWPORT ── */}
      <div className="relative flex-1 flex items-center justify-center px-4 md:px-16">
        
        {/* Navigation Arrows */}
        {items.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-6 text-white/80 hover:text-white bg-white/5 hover:bg-white/15 p-3 rounded-full transition-all cursor-pointer z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-6 text-white/80 hover:text-white bg-white/5 hover:bg-white/15 p-3 rounded-full transition-all cursor-pointer z-10"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Viewport Content */}
        <div className="w-full max-w-4xl h-[55vh] md:h-[65vh] flex items-center justify-center">
          {currentItem.type === "video" ? (
            <div className="w-full h-full bg-black rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src={getEmbedUrl(currentItem.src)}
                title={currentItem.label}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-none"
              />
            </div>
          ) : (
            <img
              src={currentItem.src}
              alt={currentItem.alt}
              // @ts-ignore: fetchPriority matches modern browsers in React
              fetchPriority="high"
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            />
          )}
        </div>
      </div>

      {/* ── LABEL & DESCRIPTIONS ── */}
      <div className="w-full text-center px-6 py-4 z-10">
        {currentItem.type === "event" ? (
          <div className="max-w-xl mx-auto">
            <h3 className="text-white text-lg md:text-xl font-display font-bold tracking-wide">
              {currentItem.label}
            </h3>
            {currentItem.date && (
              <span className="inline-block mt-1 bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                {currentItem.date}
              </span>
            )}
            <p className="text-white/60 text-xs md:text-sm mt-1.5 line-clamp-2">{currentItem.alt}</p>
          </div>
        ) : (
          <div className="max-w-lg mx-auto">
            <h3 className="text-white/90 text-sm md:text-base font-medium tracking-wide">
              {currentItem.label}
            </h3>
            <p className="text-white/50 text-xs mt-1 line-clamp-2">{currentItem.alt}</p>
          </div>
        )}
      </div>

      {/* ── THUMBNAIL STRIP ── */}
      <div className="w-full bg-black/40 border-t border-white/5 py-4">
        <div
          ref={stripRef}
          className="flex items-center gap-3 overflow-x-auto px-[40%] md:px-[45%] py-1 snap-x snap-mandatory scrollbar-none scroll-smooth"
        >
          {items.map((item, idx) => {
            const isActive = idx === currentIndex;
            const isViewed = idx < currentIndex;
            const thumbUrl = getThumbnailUrl(item);

            return (
              <div
                key={idx}
                ref={isActive ? activeThumbRef : null}
                onClick={() => setCurrentIndex(idx)}
                className={`relative flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 snap-center border-2 bg-muted/20 ${
                  isActive
                    ? "border-primary scale-110 opacity-100 z-10 shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                    : isViewed
                    ? "border-transparent opacity-40 hover:opacity-75"
                    : "border-transparent opacity-60 hover:opacity-90"
                }`}
              >
                {thumbUrl ? (
                  <img
                    src={thumbUrl}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-surface-dark flex items-center justify-center" />
                )}

                {/* Video Play Overlay */}
                {item.type === "video" && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <Play className="w-2.5 h-2.5 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
