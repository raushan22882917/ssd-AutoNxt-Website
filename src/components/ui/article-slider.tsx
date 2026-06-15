import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useArticleSlider } from "@/hooks/use-article-slider";
import { ReactNode, useRef } from "react";
import { useLang } from "@/contexts/LanguageContext";

interface ArticleSliderProps<T> {
  items: T[];
  noItemsMessage: string;
  noItemsDesc: string;
  renderCard: (item: T) => ReactNode;
  showAll: boolean;
  setShowAll: (val: boolean) => void;
}

export function ArticleSlider<T>({
  items,
  noItemsMessage,
  noItemsDesc,
  renderCard,
  showAll,
  setShowAll,
}: ArticleSliderProps<T>) {
  const { t } = useLang();
  const { currentIndex, setCurrentIndex, handleNext, handlePrev } = useArticleSlider(items.length);
  const sliderRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/20 rounded-3xl border border-border border-dashed">
        <Search className="w-8 h-8 text-muted-foreground/60 mx-auto mb-3" />
        <h3 className="text-lg font-bold mb-1 text-foreground">{noItemsMessage}</h3>
        <p className="text-sm text-muted-foreground">{noItemsDesc}</p>
      </div>
    );
  }

  const handleToggleShowAll = () => {
    const nextShowAll = !showAll;
    setShowAll(nextShowAll);
    if (nextShowAll) {
      // Allow list state rendering to complete, then slide down smoothly
      setTimeout(() => {
        if (sliderRef.current) {
          const rect = sliderRef.current.getBoundingClientRect();
          const targetY = window.scrollY + rect.bottom;
          window.scrollTo({
            top: targetY - 40, // subtract minor padding so that the start of the grid is beautifully aligned
            behavior: "smooth",
          });
        }
      }, 150);
    }
  };

  return (
    <div ref={sliderRef} className="relative">
      <div className="relative flex items-center justify-between gap-4">
        {/* Arrow Left */}
        {items.length > 1 && (
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-background border border-border shadow-lg hover:bg-primary hover:text-white transition-all text-foreground shrink-0 cursor-pointer"
            aria-label="Previous article"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Slide Container */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {renderCard(items[currentIndex])}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Arrow Right */}
        {items.length > 1 && (
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-background border border-border shadow-lg hover:bg-primary hover:text-white transition-all text-foreground shrink-0 cursor-pointer"
            aria-label="Next article"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Indicator Dots */}
      {items.length > 1 && (
        <div className="flex justify-center gap-2 mt-5">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                idx === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <Button
          onClick={handleToggleShowAll}
          className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-5 shadow-md font-bold transition-all cursor-pointer"
        >
          {showAll ? t.common.collapseList : t.common.exploreAll}
        </Button>
      </div>
    </div>
  );
}
