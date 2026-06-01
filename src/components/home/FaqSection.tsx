import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQ_CATEGORIES = [
  { id: "all",        label: "All" },
  { id: "technical",  label: "Technical Specifications" },
  { id: "charging",   label: "Charging & Battery" },
  { id: "apps",       label: "Applications & Suitability" },
  { id: "cost",       label: "Cost & Financing" },
  { id: "perf",       label: "Performance & Efficiency" },
];

const FAQS = [
  {
    cat: "technical",
    q: "Why AutoNxt electric tractors over diesel tractors?",
    a: "AutoNxt electric tractors offer significantly lower running costs — electricity is up to 70% cheaper per hour than diesel. They produce zero direct emissions, have fewer moving parts (meaning lower maintenance costs), deliver instant full torque from startup, and operate silently. Over a 5-year period, farmers typically save ₹3–5 lakh compared to diesel equivalents.",
  },
  {
    cat: "perf",
    q: "How many hours does the tractor work on a single charge?",
    a: "Our tractors are designed for a full working day. The X45H2 delivers 8–10 hours of standard field operations on one charge. For heavy-duty tasks such as deep tilling or loaded haulage, expect 6–8 hours. Our smart battery management system gives you real-time range estimates so you're never caught off guard.",
  },
  {
    cat: "charging",
    q: "How long does the tractor take to charge from 0–100%?",
    a: "Using our standard AC charger (included), a full charge takes approximately 6–8 hours — ideal for overnight charging. With our optional DC fast charger, you can reach 80% charge in under 3 hours. A complete charge costs roughly ₹150–200 at standard Indian electricity rates.",
  },
  {
    cat: "apps",
    q: "What implements can be used with AutoNxt tractors?",
    a: "AutoNxt tractors are compatible with all standard 3-point hitch implements including rotavators, ploughs, seed drills, cultivators, harrows, and post-hole diggers. The PTO (Power Take-Off) is compatible with most standard Indian agricultural equipment. Our team can advise on compatibility for specific implements.",
  },
  {
    cat: "charging",
    q: "Can the tractor be charged at home?",
    a: "Yes. Our standard charger plugs into any 15-amp single-phase socket — the same as a regular home power point. You don't need a special charging station. For faster charging, we recommend a dedicated 32-amp circuit, which most agricultural households already have for irrigation pump connections.",
  },
  {
    cat: "perf",
    q: "Does the tractor have enough power for heavy-duty work?",
    a: "Absolutely. Electric motors deliver maximum torque from zero RPM — unlike diesel engines that need to rev up. The X45H2's motor produces the pulling equivalent of a 55HP diesel tractor in practical fieldwork. Farmers switching from diesel consistently report better performance in demanding conditions like wet paddy fields and heavy soil.",
  },
  {
    cat: "charging",
    q: "After how many years will the battery need to be replaced?",
    a: "Our lithium iron phosphate (LFP) battery packs are rated for 3,000+ charge cycles with less than 20% capacity degradation — translating to roughly 8–10 years of typical farm use. The battery comes with a 5-year / 3,000-cycle warranty. Post-warranty, the battery can be replaced as a modular unit.",
  },
  {
    cat: "cost",
    q: "How much savings will I have by using Electric Tractors?",
    a: "On average, AutoNxt owners save ₹60,000–₹90,000 per year on fuel and maintenance compared to a diesel tractor of equivalent power. Over 5 years that's ₹3–4.5 lakh in direct savings, before accounting for government subsidies and carbon credits. Our finance calculator can give you a personalised estimate.",
  },
  {
    cat: "technical",
    q: "Is the tractor remote controlled?",
    a: "Select models in our commercial range offer optional GPS-guided autonomous operation and remote monitoring via the AutoNxt NXT-OS app. The standard range includes full telematics — you can monitor location, battery health, and usage data remotely. Full autonomous driving is available for industrial and airport applications.",
  },
  {
    cat: "cost",
    q: "Are there any financing options for buying the tractor?",
    a: "Yes. We partner with leading rural banks and NBFCs to offer EMI plans starting from ₹8,000/month with as low as 10% down payment. Kisan Credit Card (KCC) holders get preferential rates. Additionally, multiple state governments offer EV subsidies of ₹50,000–₹1.5 lakh on agricultural EVs. Contact our team to explore the best option for you.",
  },
];

function FaqSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = FAQS.filter(
    (f) => activeCategory === "all" || f.cat === activeCategory
  );

  return (
    <section className="py-24 bg-muted/30" id="faq">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Have a question? Find the answer.
          </h2>
          <p className="text-muted-foreground text-lg">
            Frequently asked questions about our electric tractors.
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