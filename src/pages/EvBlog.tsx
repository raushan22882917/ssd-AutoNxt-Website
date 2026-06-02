import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Calendar, Clock, Zap, BatteryCharging, Globe, Cpu, 
  TrendingUp, Leaf, IndianRupee, Search, Filter, ExternalLink 
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export default function EvBlog() {
  const { t } = useLang();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  const handleReadArticle = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleImageError = (postId: number) => {
    setImageErrors(prev => ({ ...prev, [postId]: true }));
  };

  const getImageSrc = (post: any) => {
    if (imageErrors[post.id]) {
      return "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=900&q=80";
    }
    return post.image || "/unnamed.jpg";
  };

  const STATS = t.evBlogPage.stats;

  const localizedArticles = t.evBlogPage.articles || [];

  const externalUrls = [
    "https://www.theautomonitor.com/the-rise-of-eco-friendly-tractors-in-indias-push-for-green-growth/",
    "https://emobilityplus.com/2025/11/17/opinion-bridging-sustainability-and-productivity-with-electric-tractor-technology/",
    "https://republicnewsindia.com/how-electric-tractors-are-powering-a-sustainable-revolution-in-indian-agriculture/",
    "https://www.google.com/amp/s/www.thehindubusinessline.com/economy/agri-business/farming-without-fumes-why-electric-tractors-are-the-future-of-indian-agriculture/article70202273.ece/amp/",
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
      image: "/unnamed.jpg",
      externalUrl: externalUrls[i] || "https://www.autonxt.in"
    };
  });

  const categories = ["all", ...Array.from(new Set(evBlogPosts.map((p: any) => p.cat)))];

  const icons = [BatteryCharging, Globe, Zap, Cpu, BatteryCharging, Globe];
  const accents = [
    "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
    "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400",
    "bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400",
    "bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400",
    "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400",
    "bg-teal-50 text-teal-700 dark:bg-teal-950/30 dark:text-teal-400",
  ];

  const ARTICLES = evBlogPosts.map((article, i) => ({
    ...article,
    icon: icons[i] || Globe,
    accent: accents[i] || "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  }));

  const filteredPosts = ARTICLES.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.cat.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full min-h-screen bg-background pb-16">

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

      {/* ── STATS BAR ── */}
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

      {/* ── SEARCH & FILTER SECTION ── */}
      <section className="py-8 bg-muted/20 border-y border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 w-full max-w-md">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm text-foreground placeholder-muted-foreground"
              />
            </div>

            {/* Category Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3.5 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm text-foreground cursor-pointer"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTICLES GRID ── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  className="bg-card border border-border rounded-2xl hover:border-primary/45 hover:shadow-lg transition-all group flex flex-col overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.07 }}
                >
                  {/* Card Image Container */}
                  <div 
                    className="relative h-48 w-full overflow-hidden cursor-pointer"
                    onClick={() => handleReadArticle(post.externalUrl)}
                    title="Click to read full article"
                  >
                    <img
                      src={getImageSrc(post)}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={() => handleImageError(post.id)}
                    />
                    
                    {/* Category tag */}
                    <div className="absolute top-3 left-3" onClick={(e) => e.stopPropagation()}>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${post.accent}`}>
                        {post.cat}
                      </span>
                    </div>

                    {/* Top Right External Link Icon */}
                    <div className="absolute top-3 right-3">
                      <div className="bg-black/60 backdrop-blur-sm rounded-full p-1.5 transition-transform group-hover:scale-110">
                        <ExternalLink className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>

                    {/* Center "Read Article" Button on Hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 text-black px-4 py-2 rounded-xl text-xs font-semibold shadow-md tracking-wider">
                        Read Article
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 
                      className="font-bold text-foreground text-sm leading-snug mb-2 hover:text-primary transition-colors cursor-pointer line-clamp-2"
                      onClick={() => handleReadArticle(post.externalUrl)}
                    >
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-3">
                      {post.summary}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/80 text-muted-foreground text-[10px]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 max-w-md mx-auto">
              <Search className="w-12 h-12 text-muted-foreground/60 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-1 text-foreground">No articles found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search query or choosing another category filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER CTA ── */}
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
