import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Calendar, ExternalLink, Tag, FileText, Globe, Award, Search, Clock, Eye, User, Sparkles
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export default function News() {
  const { t } = useLang();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory]);

  const handleReadArticle = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleImageError = (postId: number) => {
    setImageErrors(prev => ({ ...prev, [postId]: true }));
  };

  const getImageSrc = (post: any) => {
    if (imageErrors[post.id]) {
      return "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80";
    }
    return post.image || "/unnamed.jpg";
  };

  const localizedNews = t.newsPage.news || [];

  const newsPosts = localizedNews.map((post: any, i: number) => {
    return {
      id: i + 1,
      title: post.title,
      summary: post.summary,
      date: post.date,
      readTime: post.readTime || (i % 2 === 0 ? "5 min read" : "3 min read"),
      cat: post.tag,
      author: post.author || "AutoNxt Team",
      views: 750 + i * 150,
      image: `/News/News_daily/${(i % 8) + 1}.png`,
      externalUrl: post.externalUrl || "https://www.autonxt.in",
      featured: i < 2, // The first 2 items are featured!
      tags: [post.tag, "AutoNxt", "Electric Tractor", "Innovation"]
    };
  });

  const categories = ["all", ...Array.from(new Set(newsPosts.map((p: any) => p.cat)))];

  const accents = [
    "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border-red-200",
    "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-blue-200",
    "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200",
    "bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400 border-purple-200",
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-200",
  ];

  const ARTICLES = newsPosts.map((article: any, i: number) => ({
    ...article,
    accent: accents[i % accents.length]
  }));

  const filteredPosts = ARTICLES.filter((post: any) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || post.cat.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter((post: any) => post.featured);
  const regularPosts = filteredPosts.filter((post: any) => !post.featured);

  const isFilteringOrSearching = searchTerm !== "" || selectedCategory !== "all";

  return (
    <div className="w-full min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="bg-surface-dark relative overflow-hidden pt-20 md:pt-28 pb-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(0,72%,45%,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(214,65%,40%,0.1),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(hsl(0,0%,100%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,0%,100%) 1px,transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            {/* Left: text */}
            <div className="pb-8 md:pb-10">
              <motion.div
                className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-5 py-2 mb-6 backdrop-blur-md"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              >
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-primary text-xs font-bold uppercase tracking-widest">{t.news.tag}</span>
              </motion.div>
              <motion.h1
                className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              >
                {t.news.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-rose-500">
                  {t.news.titleHighlight}
                </span>
              </motion.h1>
              <motion.p
                className="text-white/60 text-lg md:text-xl max-w-lg leading-relaxed mb-10"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
              >
                {t.news.desc}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-8"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}
              >
                {[
                  { icon: FileText, label: t.newsPage.storiesLabel, value: `${newsPosts.length}` },
                  { icon: Globe, label: t.newsPage.coverageLabel, value: `${new Set(newsPosts.map((p: any) => { try { return new URL(p.externalUrl).hostname.replace('www.', '') } catch { return p.externalUrl } })).size}` },
                  { icon: Award, label: t.newsPage.milestonesLabel, value: `${categories.length - 1}` },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-colors">
                      <f.icon className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest font-medium">{f.label}</p>
                      <p className="text-white font-bold text-base group-hover:text-primary-50 transition-colors">{f.value}</p>
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
              <div className="grid grid-cols-3 gap-3 h-[450px]">
                <div className="col-span-2 row-span-2 rounded-tl-3xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity z-10" />
                  <img
                    src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80"
                    alt="AutoNxt press event"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="eager" decoding="async"
                  />
                  <div className="absolute bottom-6 left-6 z-20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-white/80 text-xs font-bold uppercase tracking-wider">Live Coverage</span>
                    </div>
                    <h3 className="text-white font-bold text-xl leading-tight">Press & Media</h3>
                  </div>
                </div>
                <div className="rounded-tr-3xl overflow-hidden relative group">
                  <img
                    src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=500&q=80"
                    alt="Media coverage"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="eager" decoding="async"
                  />
                </div>
                <div className="overflow-hidden relative group">
                  <img
                    src="https://images.unsplash.com/photo-1495020689067-958852a7765e?w=500&q=80"
                    alt="News headlines"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="eager" decoding="async"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface-dark to-transparent pointer-events-none z-30" />
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
            {t.news.tag}
          </span>
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="flex whitespace-nowrap marquee-track gap-12 w-max">
            <div className="flex shrink-0 items-center gap-12">
              {newsPosts.map((post: any, idx: number) => (
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
              {newsPosts.map((post: any, idx: number) => (
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

      {/* ── SEARCH & FILTER SECTION ── */}
      <section className="py-8 bg-muted/10 border-b border-border relative z-20 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:w-[350px] shrink-0">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
              <input
                type="text"
                placeholder={t.news.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-3.5 bg-background border-2 border-primary/20 hover:border-primary/40 focus:border-primary rounded-full outline-none transition-all text-base text-foreground placeholder-muted-foreground shadow-md font-medium"
              />
            </div>

            {/* Horizontal Filter Pills */}
            <div className="flex flex-nowrap items-center gap-2.5 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
              {categories.map((category) => (
                <button
                  key={category as string}
                  onClick={() => setSelectedCategory(category as string)}
                  className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-background border border-border text-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
                    }`}
                >
                  {category === "all" ? t.news.allCategories : (category as string)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED STORIES ── */}
      {featuredPosts.length > 0 && (
        <section className="pt-12 pb-4 bg-background relative">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold">{t.news.featured}</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {featuredPosts.map((post: any, i: number) => (
                <motion.article
                  key={post.id}
                  className="bg-card border border-border/50 rounded-3xl hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group flex flex-col overflow-hidden relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 2) * 0.1, duration: 0.6 }}
                >
                  {/* Card Image Container */}
                  <div
                    className="relative h-72 w-full overflow-hidden cursor-pointer"
                    onClick={() => handleReadArticle(post.externalUrl)}
                    title="Click to read full article"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <img
                      src={getImageSrc(post)}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={() => handleImageError(post.id)}
                    />

                    {/* Category tag */}
                    <div className="absolute top-5 left-5 z-20" onClick={(e) => e.stopPropagation()}>
                      <span className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg backdrop-blur-md ${post.accent}`}>
                        {post.cat}
                      </span>
                    </div>

                    {/* Date/Time overlay */}
                    <div className="absolute bottom-5 left-5 z-20 flex gap-4 text-white/90 text-sm font-medium">
                      <span className="flex items-center gap-1.5 backdrop-blur-md bg-black/30 px-3 py-1.5 rounded-lg"><Calendar className="w-4 h-4" />{post.date}</span>
                      <span className="flex items-center gap-1.5 backdrop-blur-md bg-black/30 px-3 py-1.5 rounded-lg"><Clock className="w-4 h-4" />{post.readTime}</span>
                    </div>

                    {/* Top Right External Link Icon */}
                    <div className="absolute top-5 right-5 z-20">
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2.5 transition-transform group-hover:scale-110 group-hover:bg-primary group-hover:border-primary">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-8 flex flex-col flex-1 bg-gradient-to-b from-transparent to-muted/10">
                    <h3
                      className="font-display text-2xl font-bold text-foreground mb-4 hover:text-primary transition-colors cursor-pointer leading-tight line-clamp-2"
                      onClick={() => handleReadArticle(post.externalUrl)}
                    >
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground text-base leading-relaxed mb-6 flex-1 line-clamp-3">
                      {post.summary}
                    </p>

                    <div className="flex flex-wrap items-center justify-between pt-5 border-t border-border/50 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Author</p>
                          <p className="text-sm font-bold">{post.author}</p>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        className="group/btn hover:bg-primary/10 hover:text-primary"
                        onClick={() => handleReadArticle(post.externalUrl)}
                      >
                        Read Article <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── REGULAR POSTS GRID ── */}
      <section className="pt-4 pb-16 bg-muted/5 border-t border-border/50">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="mb-10">
            <h2 className="text-xl font-display font-bold text-foreground">
              {isFilteringOrSearching ? `Search Results (${filteredPosts.length})` : "Latest Updates"}
            </h2>
          </div>

          {isTransitioning ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-card border border-border/60 rounded-3xl overflow-hidden flex flex-col h-full">
                  <div className="h-56 bg-muted/60 relative overflow-hidden">
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
          ) : regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post: any, i: number) => (
                <motion.article
                  key={post.id}
                  className="bg-card border border-border/60 rounded-3xl hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group flex flex-col overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
                >
                  {/* Card Image Container */}
                  <div
                    className="relative h-56 w-full overflow-hidden cursor-pointer"
                    onClick={() => handleReadArticle(post.externalUrl)}
                    title="Click to read full article"
                  >
                    <img
                      src={getImageSrc(post)}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={() => handleImageError(post.id)}
                    />

                    {/* Category tag */}
                    <div className="absolute top-4 left-4" onClick={(e) => e.stopPropagation()}>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md backdrop-blur-md ${post.accent}`}>
                        {post.cat}
                      </span>
                    </div>

                    {/* External Link Icon */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-primary backdrop-blur-md rounded-full p-2 shadow-lg">
                        <ExternalLink className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 mb-4 text-xs font-medium text-muted-foreground">
                      <span className="flex items-center gap-1.5 text-primary/80"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                    </div>

                    <h3
                      className="font-bold text-foreground text-lg leading-snug mb-3 hover:text-primary transition-colors cursor-pointer line-clamp-2"
                      onClick={() => handleReadArticle(post.externalUrl)}
                    >
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                      {post.summary}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50 text-muted-foreground text-xs font-medium">
                      <span className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                          <User className="w-3 h-3 text-muted-foreground" />
                        </div>
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-md">
                        <Eye className="w-3.5 h-3.5" /> {post.views}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-20 max-w-md mx-auto bg-card rounded-3xl border border-border border-dashed shadow-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground/60" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">No articles found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search query or category filter.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-14 relative overflow-hidden bg-gradient-to-r from-red-700 via-primary to-red-950">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[150%] bg-white/10 transform rotate-12 blur-3xl"></div>
          <div className="absolute top-[20%] -left-[10%] w-[30%] h-[100%] bg-black/10 transform -rotate-12 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <Globe className="w-8 h-8 text-white" />
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
          >
            Press & Media Inquiries
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/90 mb-8 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed"
          >
            For press releases, high-res images, and media interviews, please contact our PR team.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a href="mailto:press@autonxt.in">
              <Button size="lg" className="bg-white text-red-700 hover:bg-red-50 font-bold px-10 py-6 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:-translate-y-1 transition-all text-base group">
                Contact PR Team
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
