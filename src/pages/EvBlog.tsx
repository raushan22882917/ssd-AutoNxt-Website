import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Calendar, Clock, Zap, BatteryCharging, Globe, Cpu, 
  TrendingUp, Leaf, IndianRupee, Search, ExternalLink 
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export default function EvBlog() {
  const { t } = useLang();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleReadArticle = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getGradient = (id: number) => {
    const gradients = [
      "bg-gradient-to-br from-green-400 to-emerald-700",
      "bg-gradient-to-br from-teal-400 to-cyan-700",
      "bg-gradient-to-br from-blue-400 to-indigo-700",
      "bg-gradient-to-br from-emerald-400 to-teal-800",
      "bg-gradient-to-br from-cyan-400 to-blue-700",
    ];
    return gradients[id % gradients.length];
  };

  const STATS = t.evBlogPage.stats;
  const localizedArticles = t.evBlogPage.articles || [];

  const externalUrls = [
    "https://www.theautomonitor.com/the-rise-of-eco-friendly-tractors-in-indias-push-for-green-growth/",
    "https://emobilityplus.com/2025/11/17/opinion-bridging-sustainability-and-productivity-with-electric-tractor-technology/",
    "https://republicnewsindia.com/how-electric-tractors-are-powering-a-sustainable-revolution-in-indian-agriculture/",
    "https://www.thehindubusinessline.com/economy/agri-business/farming-without-fumes-why-electric-tractors-are-the-future-of-indian-agriculture/article70202273.ece",
    "https://www.autonxt.in",
    "https://www.autonxt.in"
  ];

  const evBlogPosts = localizedArticles.map((article: any, i: number) => {
    return {
      id: i + 1,
      title: article.title,
      summary: article.summary,
      date: article.date,
      readTime: article.readTime,
      cat: article.cat,
      externalUrl: externalUrls[i] || "https://www.autonxt.in"
    };
  });

  const categories = ["all", ...Array.from(new Set(evBlogPosts.map((p: any) => p.cat)))];
  const icons = [BatteryCharging, Globe, Zap, Cpu, BatteryCharging, Globe];
  const accents = [
    "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400",
    "bg-teal-50 text-teal-700 dark:bg-teal-950/30 dark:text-teal-400",
    "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
    "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/30 dark:text-cyan-400",
  ];

  const ARTICLES = evBlogPosts.map((article: any, i: number) => ({
    ...article,
    icon: icons[i] || Globe,
    accent: accents[i % accents.length]
  }));

  const filteredPosts = ARTICLES.filter((post: any) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.cat.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="bg-surface-dark relative overflow-hidden pt-28 pb-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,hsl(142,70%,35%,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,hsl(214,65%,32%,0.08),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: "linear-gradient(hsl(142,70%,50%) 1px,transparent 1px),linear-gradient(90deg,hsl(142,70%,50%) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            {/* Left: text */}
            <div className="pb-16">
              <motion.div
                className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">{t.evBlog.tag}</span>
              </motion.div>
              <motion.h1
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.06]"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              >
                {t.evBlog.title}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{t.evBlog.titleHighlight}</span>
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
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-colors">
                      <f.icon className="w-4 h-4 text-emerald-400/80 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest font-medium">{f.label}</p>
                      <p className="text-white font-bold text-sm group-hover:text-emerald-50 transition-colors">{f.value}</p>
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
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/60 to-cyan-500/60 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700 z-10" />
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
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                    loading="eager" decoding="async"
                  />
                </div>
                <div className="overflow-hidden relative group">
                  <img
                    src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&q=80"
                    alt="Electric power technology"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                    loading="eager" decoding="async"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface-dark to-transparent pointer-events-none z-30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-emerald-600/10 border-y border-emerald-500/10 py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-cyan-500/5" />
        <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div 
                key={i} 
                className="text-center group" 
                initial={{ opacity: 0, y: 10 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="font-display text-3xl md:text-4xl font-black text-foreground group-hover:text-emerald-500 transition-colors">{s.value}</div>
                <div className="text-muted-foreground text-[10px] md:text-xs mt-2 uppercase tracking-[0.2em] font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEARCH & FILTER SECTION ── */}
      <section className="py-8 bg-muted/10 border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:w-[350px] shrink-0">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-emerald-500 w-5 h-5" />
              <input
                type="text"
                placeholder={t.evBlog.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-3.5 bg-background border-2 border-emerald-500/20 hover:border-emerald-500/40 focus:border-emerald-500 rounded-full outline-none transition-all text-base text-foreground placeholder-muted-foreground shadow-md font-medium"
              />
            </div>

            {/* Horizontal Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              {categories.map((category) => (
                <button
                  key={category as string}
                  onClick={() => setSelectedCategory(category as string)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20 scale-105"
                      : "bg-background border border-border text-foreground hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:scale-105"
                  }`}
                >
                  {category === "all" ? t.evBlog.allCategories : (category as string)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTICLES GRID ── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post: any, i: number) => {
                const Icon = post.icon;
                return (
                  <motion.div
                    key={post.id}
                    className="bg-card border border-border/60 rounded-3xl hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 group flex flex-col overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: (i % 3) * 0.1, duration: 0.5, ease: "easeOut" }}
                  >
                    {/* Card Image Container (Gradient) */}
                    <div 
                      className="relative h-48 w-full overflow-hidden cursor-pointer"
                      onClick={() => handleReadArticle(post.externalUrl)}
                      title="Click to read full article"
                    >
                      <div className={`absolute inset-0 w-full h-full ${getGradient(post.id)} group-hover:scale-110 transition-transform duration-700`} />
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay pointer-events-none" />
                      
                      {/* Large Center Icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-40 transition-opacity">
                        <Icon className="w-20 h-20 text-white" />
                      </div>

                      {/* Category tag */}
                      <div className="absolute top-4 left-4" onClick={(e) => e.stopPropagation()}>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md backdrop-blur-md bg-white/95 text-black`}>
                          {post.cat}
                        </span>
                      </div>

                      {/* Top Right External Link Icon */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-black/30 backdrop-blur-md rounded-full p-2 transition-transform group-hover:scale-110">
                          <ExternalLink className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>

                      {/* Center "Read Article" Button on Hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-white/95 text-black px-5 py-2.5 rounded-full text-xs font-bold shadow-lg tracking-wider">
                          {t.evBlog.readArticle}
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-transparent to-emerald-500/5">
                      <h3 
                        className="font-bold text-foreground text-lg leading-snug mb-3 hover:text-emerald-500 transition-colors cursor-pointer line-clamp-2"
                        onClick={() => handleReadArticle(post.externalUrl)}
                      >
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                        {post.summary}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50 text-muted-foreground text-xs font-medium">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-emerald-500/70" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-emerald-500/70" />
                          {post.readTime}
                        </span>
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
              <p className="text-sm text-muted-foreground">
                {t.evBlog.noArticlesDesc}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER CTA ── */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-900">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[150%] bg-white/10 transform rotate-12 blur-3xl"></div>
          <div className="absolute top-[20%] -left-[10%] w-[30%] h-[100%] bg-black/10 transform -rotate-12 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center relative z-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <Leaf className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            {t.evBlog.ctaTitle}
          </motion.h2>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/90 mb-10 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed"
          >
            {t.evBlog.ctaDesc}
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a href="mailto:info@autonxt.in?subject=Subscribe to EV Blog">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold px-10 py-7 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:-translate-y-1 transition-all text-lg group">
                {t.common.subscribe} 
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
