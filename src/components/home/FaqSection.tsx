import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

function FaqSection() {
  const { t } = useLang();
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const FAQ_CATEGORIES = [
    { id: "all",        label: t.home.faqCategories.all },
    { id: "technical",  label: t.home.faqCategories.technical },
    { id: "charging",   label: t.home.faqCategories.charging },
    { id: "apps",       label: t.home.faqCategories.apps },
    { id: "cost",       label: t.home.faqCategories.cost },
    { id: "perf",       label: t.home.faqCategories.perf },
  ];

  const catMapping = [
    "technical",  // 0
    "perf",       // 1
    "charging",   // 2
    "apps",       // 3
    "charging",   // 4
    "perf",       // 5
    "charging",   // 6
    "cost",       // 7
    "technical",  // 8
    "cost",       // 9
  ];

  const FAQS = t.home.faqs.map((faq, index) => ({
    cat: catMapping[index] || "technical",
    q: faq.q,
    a: faq.a,
  }));

  const filtered = FAQS.filter(
    (f) => activeCategory === "all" || f.cat === activeCategory
  );

  return (
    <section className="pt-6 pb-12 md:pt-8 md:pb-16 bg-gradient-to-b from-neutral-100 via-red-50/45 to-neutral-200/60 border-y border-neutral-200" id="faq">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            {t.home.faqTitle}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.home.faqSub}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.home.faqDesc}
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-1.5 min-[400px]:gap-2 mb-10 max-w-4xl mx-auto px-2">
          {FAQ_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setOpenIndex(null); }}
                whileHover={!isActive ? { scale: 1.06, y: -2 } : {}}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                className={`relative px-[clamp(10px,2.5vw,14px)] pt-[clamp(4px,1vw,6px)] pb-[clamp(5px,1.2vw,8px)] text-[clamp(10px,2.2vw,13px)] md:text-sm font-semibold border cursor-pointer group transition-colors duration-200 whitespace-nowrap shrink-0 rounded-xl ${
                  isActive
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-red-50 text-primary border-primary/30"
                }`}
              >
                {/* Red glow background on hover */}
                {!isActive && (
                  <span className="absolute inset-0 rounded-xl bg-primary/0 group-hover:bg-primary/8 transition-colors duration-200" />
                )}

                {/* Label — turns red on hover */}
                <span className={`relative z-10 transition-colors duration-200 ${
                  !isActive ? "group-hover:text-primary" : ""
                }`}>
                  {cat.label}
                </span>

                {/* Border highlight on hover */}
                {!isActive && (
                  <span className="absolute inset-0 rounded-xl border border-primary/0 group-hover:border-primary/50 transition-colors duration-200 pointer-events-none" />
                )}

                {/* Sliding red underline on hover */}
                {!isActive && (
                  <span className="absolute bottom-1 left-4 right-4 h-[2px] rounded-full bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-250" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* FAQ list */}
        <div className="max-w-3xl mx-auto space-y-3">
          <AnimatePresence>
            {filtered.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={`${activeCategory}-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                  className={`bg-card rounded-xl border transition-all duration-200 overflow-hidden ${
                    isOpen ? "border-primary/50 shadow-md" : "border-border hover:border-primary/30"
                  }`}
                  data-testid={`faq-item-${i}`}
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                  >
                    <span className="font-semibold text-foreground text-base leading-snug">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed border-t border-border/60 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
export default FaqSection;