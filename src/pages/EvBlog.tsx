import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Calendar, Clock, Zap, BatteryCharging, Globe, Cpu,
  TrendingUp, Leaf, IndianRupee, Search, ExternalLink, X
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

// Animated counter hook
function useCountUp(target: string, duration = 1800) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const numericStr = target.replace(/[^0-9.]/g, "");
          const suffix = target.replace(/[0-9.]/g, "");
          const num = parseFloat(numericStr);
          if (isNaN(num)) { setDisplay(target); return; }
          const steps = 40;
          const increment = num / steps;
          let current = 0;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            current = Math.min(current + increment, num);
            const formatted = Number.isInteger(num)
              ? Math.round(current).toString()
              : current.toFixed(1);
            setDisplay(formatted + suffix);
            if (step >= steps) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { display, ref };
}

// Stat item using the hook
function AnimatedStat({ value, label }: { value: string; label: string }) {
  const { display, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center group">
      <div className="font-display text-3xl md:text-4xl font-black text-foreground group-hover:text-primary transition-colors tabular-nums">
        {display}
      </div>
      <div className="text-muted-foreground text-[10px] md:text-xs mt-2 uppercase tracking-[0.2em] font-medium">
        {label}
      </div>
    </div>
  );
}

const topAccents = [
  "from-primary via-red-500 to-rose-400",
  "from-blue-500 via-cyan-400 to-sky-400",
  "from-cyan-400 via-blue-400 to-indigo-400",
  "from-blue-600 via-primary to-sky-400",
  "from-primary via-orange-400 to-red-400",
];

export default function EvBlog() {
  const { t } = useLang();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory]);

  const handleReadArticle = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const getGradient = (id: number) => {
    const gradients = [
      "bg-gradient-to-br from-blue-500 to-primary",
      "bg-gradient-to-br from-sky-500 to-blue-700",
      "bg-gradient-to-br from-blue-400 to-indigo-700",
      "bg-gradient-to-br from-sky-400 to-blue-900",
      "bg-gradient-to-br from-cyan-400 to-blue-800",
    ];
    return gradients[id % gradients.length];
  };

  const STATS = t.evBlogPage.stats;
  const localizedArticles = t.evBlogPage.articles || [];

  const evBlogPosts = localizedArticles.map((article: any, i: number) => ({
    id: i + 1,
    title: article.title,
    summary: article.summary,
    date: article.date,
    readTime: article.readTime,
    cat: article.cat,
    externalUrl: article.externalUrl || "https://www.autonxt.in"
  }));

  const icons = [BatteryCharging, Globe, Zap, Cpu, BatteryCharging, Globe];
  const accents = [
    "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground",
    "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
    "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400",
    "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/30 dark:text-cyan-400",
    "bg-sky-50 text-sky-700 dark:bg-sky-950/30 dark:text-sky-400",
  ];

  const categories = ["all", ...Array.from(new Set(evBlogPosts.map((p: any) => p.cat)))];

  // Count per category
  const categoryCounts = categories.reduce((acc: Record<string, number>, cat) => {
    acc[cat as string] = cat === "all"
      ? evBlogPosts.length
      : evBlogPosts.filter((p: any) => p.cat === cat).length;
    return acc;
  }, {});

  const ARTICLES = evBlogPosts.map((article: any, i: number) => ({
    ...article,
    icon: icons[i] || Globe,
    accent: accents[i % accents.length],
    topAccent: topAccents[i % topAccents.length],
  }));

  const filteredPosts = ARTICLES.filter((post: any) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.cat.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="bg-surface-dark relative overflow-hidden pt-20 md:pt-28 pb-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,hsl(0,72%,40%,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,hsl(214,65%,32%,0.08),transparent_50%)] pointer-events-none" />
        {/* Floating orbs */}
        <div className="absolute top-20 right-[12%] w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 left-[8%] w-60 h-60 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: "linear-gradient(hsl(0,72%,40%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,72%,40%) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            {/* Left: text */}
            <div className="pb-8 md:pb-10">
              <motion.div
                className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-xs font-bold uppercase tracking-widest">{t.evBlog.tag}</span>
              </motion.div>
              <motion.h1
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.06]"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              >
                {t.evBlog.title}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                  {t.evBlog.titleHighlight}
                </span>
              </motion.h1>
              <motion.p
                className="text-white/60 text-lg max-w-lg leading-relaxed mb-10"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
              >
                {t.evBlog.desc}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}
              >
                {[
                  { icon: TrendingUp, label: t.evBlogPage.marketCagrLabel, value: t.evBlogPage.marketCagrValue },
                  { icon: IndianRupee, label: t.evBlogPage.marketSizeLabel, value: t.evBlogPage.marketSizeValue },
                  { icon: Leaf, label: t.evBlogPage.directCo2Label, value: t.evBlogPage.directCo2Value },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
                      <f.icon className="w-4 h-4 text-primary/80 group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest font-medium">{f.label}</p>
                      <p className="text-white font-bold text-sm group-hover:text-blue-50 transition-colors">{f.value}</p>
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
                <div className="col-span-2 row-span-2 rounded-tl-3xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none z-10" />
                  <img
                    src="https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?w=900&q=80"
                    alt="Electric vehicle charging"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="eager" decoding="async"
                  />
                  <div className="absolute bottom-6 left-6 z-20">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl">
                      <BatteryCharging className="w-8 h-8 text-white mb-2" />
                      <div className="text-white font-bold">EV Revolution</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-tr-3xl overflow-hidden relative group">
                  <img
                    src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=500&q=80"
                    alt="Solar energy farm"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="eager" decoding="async"
                  />
                </div>
                <div className="overflow-hidden relative group">
                  <img
                    src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&q=80"
                    alt="Electric power technology"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="eager" decoding="async"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface-dark to-transparent pointer-events-none z-30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="w-full bg-primary/10 border-b border-primary/20 py-3 relative z-20 flex items-center overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-background to-transparent w-12 z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-background to-transparent w-12 z-20 pointer-events-none" />
        <div className="flex items-center gap-2 pl-2 shrink-0 z-30">
          <span className="flex items-center gap-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            {t.evBlog.tag}
          </span>
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="flex whitespace-nowrap marquee-track gap-12 w-max">
            <div className="flex shrink-0 items-center gap-12">
              {ARTICLES.map((post: any, idx: number) => (
                <a
                  key={`c1-${idx}`}
                  href={post.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-xs md:text-sm font-semibold hover:text-primary transition-colors text-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                  <span>{post.title}</span>
                </a>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-12">
              {ARTICLES.map((post: any, idx: number) => (
                <a
                  key={`c2-${idx}`}
                  href={post.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-xs md:text-sm font-semibold hover:text-primary transition-colors text-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                  <span>{post.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── ANIMATED STATS BAR ── */}
      <section className="bg-primary/10 border-y border-primary/15 py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-cyan-500/5" />
        {/* Decorative blobs */}
        <div className="absolute top-0 left-[20%] w-40 h-40 rounded-full bg-sky-400/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-[20%] w-40 h-40 rounded-full bg-cyan-400/10 blur-2xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s: { value: string; label: string }, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <AnimatedStat value={s.value} label={s.label} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEARCH & FILTER SECTION ── */}
      <section className="py-6 bg-muted/10 border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-5 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-[380px] shrink-0">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary w-4.5 h-4.5" />
              <input
                type="text"
                placeholder={t.evBlog.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-12 py-3.5 bg-background border-2 border-primary/20 hover:border-primary/40 focus:border-primary rounded-full outline-none transition-all text-base text-foreground placeholder-muted-foreground shadow-md font-medium"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Category pills with count badges */}
            <div className="flex flex-nowrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                const count = categoryCounts[category as string] ?? 0;
                return (
                  <button
                    key={category as string}
                    onClick={() => setSelectedCategory(category as string)}
                    className={`whitespace-nowrap flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${isActive
                        ? "bg-primary text-white shadow-md shadow-primary/25"
                        : "bg-background border border-border text-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
                      }`}
                  >
                    {category === "all" ? t.evBlog.allCategories : (category as string)}
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                      }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTICLES GRID ── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-10">
            <span className="font-display text-5xl font-black text-primary/10 leading-none select-none">01</span>
            <p className="text-xs font-bold text-primary uppercase tracking-widest">
              {filteredPosts.length} Article{filteredPosts.length !== 1 ? "s" : ""}
            </p>
          </div>

          {isTransitioning ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-card border border-border/60 rounded-3xl overflow-hidden flex flex-col h-full">
                  <div className="h-48 bg-muted/60 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent shimmer-line" />
                  </div>
                  <div className="p-6 flex flex-col flex-1 space-y-4">
                    <div className="h-4 bg-muted/60 rounded w-1/3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent shimmer-line" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3.5 bg-muted/60 rounded w-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent shimmer-line" />
                      </div>
                      <div className="h-3.5 bg-muted/60 rounded w-5/6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent shimmer-line" />
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border/50 flex justify-between items-center mt-auto">
                      <div className="h-5 bg-muted/60 rounded w-1/2 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent shimmer-line" />
                      </div>
                      <div className="h-5 bg-muted/60 rounded w-1/4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent shimmer-line" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post: any, i: number) => {
                const Icon = post.icon;
                return (
                  <motion.div
                    key={post.id}
                    className="bg-card border border-border/60 rounded-3xl transition-all duration-300 group flex flex-col overflow-hidden relative card-lift"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: (i % 3) * 0.08, duration: 0.5, ease: "easeOut" }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(180,30,30,0.12)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(180,30,30,0.35)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "";
                      (e.currentTarget as HTMLElement).style.borderColor = "";
                    }}
                  >
                    {/* Top gradient accent line */}
                    <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${post.topAccent} rounded-t-3xl z-10`} />

                    {/* Card gradient image */}
                    <div
                      className="relative h-48 w-full overflow-hidden cursor-pointer"
                      onClick={() => handleReadArticle(post.externalUrl)}
                      title="Click to read full article"
                    >
                      <div className={`absolute inset-0 w-full h-full ${getGradient(post.id)} group-hover:scale-110 transition-transform duration-700`} />
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay pointer-events-none" />

                      {/* Large center icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-25 group-hover:opacity-40 transition-opacity">
                        <Icon className="w-20 h-20 text-white" />
                      </div>

                      {/* Category tag */}
                      <div className="absolute top-4 left-4" onClick={(e) => e.stopPropagation()}>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md backdrop-blur-md bg-white/95 text-black">
                          {post.cat}
                        </span>
                      </div>

                      {/* External link */}
                      <div className="absolute top-4 right-4">
                          <div className="bg-black/30 backdrop-blur-md rounded-full p-2 transition-all group-hover:scale-110 group-hover:bg-primary/80">
                            <ExternalLink className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>

                      {/* Hover CTA */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-white/95 text-black px-5 py-2.5 rounded-full text-xs font-bold shadow-lg tracking-wider">
                          {t.evBlog.readArticle}
                        </div>
                      </div>
                    </div>

                    {/* Card content */}
                    <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-transparent to-primary/5">
                      <h3
                        className="font-bold text-foreground text-lg leading-snug mb-3 hover:text-primary transition-colors cursor-pointer line-clamp-2"
                        onClick={() => handleReadArticle(post.externalUrl)}
                      >
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                        {post.summary}
                      </p>

                      <div className="mt-auto space-y-4">
                        {/* Meta row */}
                        <div className="flex items-center gap-4 text-muted-foreground text-xs font-medium">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-primary/70" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-primary/70" />
                            {post.readTime}
                          </span>
                        </div>

                        {/* CTA button — full width */}
                        <button
                          onClick={() => handleReadArticle(post.externalUrl)}
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white text-sm font-semibold border border-primary/20 hover:border-primary transition-all duration-200 group/cta"
                        >
                          Read Article
                          <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              className="text-center py-20 max-w-md mx-auto bg-muted/20 rounded-3xl border border-border border-dashed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground/60" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{t.evBlog.noArticlesFound}</h3>
              <p className="text-sm text-muted-foreground">{t.evBlog.noArticlesDesc}</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER CTA ── */}
      <section className="py-14 relative overflow-hidden bg-gradient-to-r from-primary to-blue-800">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[150%] bg-white/10 transform rotate-12 blur-3xl" />
          <div className="absolute top-[20%] -left-[10%] w-[30%] h-[100%] bg-black/10 transform -rotate-12 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <Leaf className="w-8 h-8 text-white" />
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
          >
            {t.evBlog.ctaTitle}
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/90 mb-8 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed"
          >
            {t.evBlog.ctaDesc}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a href="mailto:info@autonxt.in?subject=Subscribe to EV Blog">
              <Button size="lg" className="bg-white text-primary hover:bg-red-50/80 font-bold px-10 py-6 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:-translate-y-1 transition-all text-base group">
                {t.common.subscribe}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
