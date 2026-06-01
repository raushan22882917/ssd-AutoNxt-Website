import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, Zap, BatteryCharging, Globe, Cpu, TrendingUp, Leaf, IndianRupee } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export default function EvBlog() {
  const { t } = useLang();

  const CATEGORIES = t.evBlogPage.categories;
  const articlesFromT = t.evBlogPage.articles;
  const statsFromT = t.evBlogPage.stats;

  const icons = [BatteryCharging, Globe, Zap, Cpu, BatteryCharging, Globe];
  const accents = [
    "bg-blue-50 text-blue-700",
    "bg-green-50 text-green-700",
    "bg-orange-50 text-orange-700",
    "bg-purple-50 text-purple-700",
    "bg-yellow-50 text-yellow-700",
    "bg-teal-50 text-teal-700",
  ];

  const ARTICLES = articlesFromT.map((article, i) => ({
    ...article,
    icon: icons[i] || Globe,
    accent: accents[i] || "bg-gray-50 text-gray-700",
  }));

  const STATS = statsFromT;
  return (
    <div className="w-full min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="bg-surface-dark relative overflow-hidden pt-28 pb-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,hsl(214,65%,32%,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,hsl(0,72%,40%,0.08),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(hsl(0,0%,100%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,0%,100%) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            {/* Left: text */}
            <div className="pb-16">
              <motion.div
                className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-6"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-accent text-xs font-bold uppercase tracking-widest">{t.evBlog.tag}</span>
              </motion.div>
              <motion.h1
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.06]"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              >
                {t.evBlog.title}<br /><span className="text-primary">{t.evBlog.titleHighlight}</span>
              </motion.h1>
              <motion.p
                className="text-white/55 text-lg max-w-lg leading-relaxed mb-10"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
              >
                {t.evBlog.desc}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}
              >
                {[
                  { icon: TrendingUp, label: t.evBlogPage.marketCagrLabel, value: "38%" },
                  { icon: IndianRupee, label: t.evBlogPage.marketSizeLabel, value: "₹4K Cr" },
                  { icon: Leaf, label: t.evBlogPage.directCo2Label, value: t.evBlogPage.directCo2Value },
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
            {/* Right: photo collage */}
            <motion.div
              className="relative pb-0 hidden lg:block"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            >
              <div className="grid grid-cols-3 gap-2 h-[420px]">
                <div className="col-span-2 row-span-2 rounded-tl-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?w=900&q=80"
                    alt="Electric vehicle charging"
                    className="w-full h-full object-cover"
                    loading="eager" decoding="async"
                  />
                </div>
                <div className="rounded-tr-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=500&q=80"
                    alt="Solar energy farm"
                    className="w-full h-full object-cover"
                    loading="eager" decoding="async"
                  />
                </div>
                <div className="overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&q=80"
                    alt="Electric power technology"
                    className="w-full h-full object-cover"
                    loading="eager" decoding="async"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface-dark to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-8">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <div className="font-display text-2xl md:text-3xl font-black text-white">{s.value}</div>
                <div className="text-white/70 text-xs mt-1 uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTICLES.map((a, i) => (
              <motion.div
                key={i}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-md transition-all group flex flex-col"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.07 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${a.accent}`}>{a.cat}</span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${a.accent}`}>
                    <a.icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-bold text-foreground text-sm leading-snug mb-3 group-hover:text-primary transition-colors flex-1">{a.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-3">{a.summary}</p>
                <div className="flex items-center gap-3 text-muted-foreground text-[11px] mt-auto pt-3 border-t border-border">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{a.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{a.readTime}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-2xl text-center">
          <Zap className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">{t.evBlog.ctaTitle}</h2>
          <p className="text-muted-foreground mb-6">{t.evBlog.ctaDesc}</p>
          <a href="mailto:info@autonxt.in?subject=Subscribe to EV Blog">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold px-8">
              {t.common.subscribe} <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
