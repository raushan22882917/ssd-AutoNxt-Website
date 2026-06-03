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
    <section className="py-24 bg-muted/30" id="faq">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
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
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setOpenIndex(null); }}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-card text-foreground border-border hover:border-primary/50 hover:text-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
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