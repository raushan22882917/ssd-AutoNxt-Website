import { useState } from "react";
import { useResourceFilter } from "@/hooks/use-resource-filter";
import { CustomSelect } from "@/components/ui/custom-select";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Calendar, ExternalLink, Tag, FileText, Globe, Award, Search, Clock, Eye, User, Sparkles, ChevronDown, X
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { ArticleSlider } from "@/components/ui/article-slider";
import { BlurDivider } from "@/components/ui/blur-divider";

export default function News() {
  const { t } = useLang();

  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

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
    return post.image || "/unnamed.webp";
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
      image: `/News/News_daily/${(i % 8) + 1}.webp`,
      externalUrl: post.externalUrl || "https://www.autonxt.in",
      featured: i < 2, // The first 2 items are featured!
      tags: [post.tag, "AutoNxt", "Electric Tractor", "Innovation"]
    };
  });

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

  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    isTransitioning,
    categories,
    categoryCounts,
    filteredItems: filteredPosts,
    isFilteringOrSearching,
  } = useResourceFilter({
    items: ARTICLES,
    getCategory: (post: any) => post.cat,
    searchFields: (post: any) => [post.title, post.summary, post.tags],
  });

  const featuredPosts = filteredPosts.filter((post: any) => post.featured);
  const regularPosts = filteredPosts.filter((post: any) => !post.featured);

  const selectOptions = categories.map((category) => ({
    value: category as string,
    label: category === "all" ? t.news.allCategories : (category as string),
  }));

  const [showAll, setShowAll] = useState(false);

  return (
    <div className="w-full min-h-screen bg-background">
      <SEO title={t.nav.news} description={t.news.desc} />

      {/* ── HERO ── */}
      <section className="bg-background relative overflow-hidden pt-10 pb-0 md:pt-14 lg:h-[93.75vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(var(--primary)/0.1),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--foreground)) 1px,transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[0.5cm] lg:gap-9 items-end">
            {/* Left: text */}
            <div className="pt-8 md:pt-16 pb-0 md:pb-10">
              <motion.div
                className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-5 py-2 mb-6 backdrop-blur-md"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              >
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-primary text-xs font-bold uppercase tracking-widest">{t.news.tag}</span>
              </motion.div>
              <motion.h1
                className="font-display text-[1.55rem] sm:text-[2.1rem] md:text-[2.5rem] lg:text-[2.9rem] xl:text-[3.2rem] font-bold text-foreground mb-6 leading-[1.08] tracking-tight"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              >
                {t.news.title} <br />
                <span className="text-primary">
                  {t.news.titleHighlight}
                </span>
              </motion.h1>
              <motion.p
                className="text-muted-foreground text-[12px] sm:text-sm md:text-base font-bold max-w-lg leading-relaxed mb-0"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
              >
                {t.news.desc}
              </motion.p>
            </div>
            {/* Right: photo collage */}
            <motion.div
              className="relative pb-0 w-full z-10"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            >
              {/* Collage grid with merge gradients */}
              <div className="relative w-full aspect-[1675/939] lg:aspect-auto lg:h-[450px]">
                <div className="grid grid-cols-3 gap-3 h-full lg:h-[450px] w-full">
                  <div className="col-span-2 row-span-2 rounded-xl lg:rounded-tl-3xl overflow-hidden relative group">
                    <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80" alt="AutoNxt press event"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="eager" decoding="async" />
                    <div className="absolute bottom-6 left-6 z-20 bg-background/85 backdrop-blur-sm rounded-xl px-4 py-3 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-muted-foreground text-xs font-bold uppercase tracking-wider">{t.news.liveCovers}</span>
                      </div>
                      <h3 className="text-foreground font-bold text-xl leading-tight">{t.news.pressMedia}</h3>
                    </div>
                  </div>
                  <div className="rounded-tr-xl lg:rounded-tr-3xl overflow-hidden relative group">
                    <img src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=500&q=80" alt="Media coverage"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="eager" decoding="async" />
                  </div>
                  <div className="overflow-hidden relative group rounded-br-xl lg:rounded-none">
                    <img src="https://images.unsplash.com/photo-1495020689067-958852a7765e?w=500&q=80" alt="News headlines"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="eager" decoding="async" />
                  </div>
                </div>
                {/* Top gradient — blends image top edge into background */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
              </div>
              {/* Fact cards — horizontal row below image */}
              <div className="flex flex-row gap-2 mt-3 w-full">
                {[
                  { icon: FileText, label: t.newsPage.storiesLabel, value: `${newsPosts.length}` },
                  { icon: Globe, label: t.newsPage.coverageLabel, value: `${new Set(newsPosts.map((p: any) => { try { return new URL(p.externalUrl).hostname.replace('www.', '') } catch { return p.externalUrl } })).size}` },
                  { icon: Award, label: t.newsPage.milestonesLabel, value: `${categories.length - 1}` },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 flex-1 rounded-lg border border-border bg-card shadow-sm px-3 py-2">
                    <f.icon className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} />
                    <div className="min-w-0">
                      <p className="text-[9px] font-bold text-foreground leading-tight truncate">{f.value}</p>
                      <p className="text-[8px] text-muted-foreground leading-none truncate">{f.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <BlurDivider />

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

      <BlurDivider />

      {/* ── SEARCH & FILTER SECTION ── */}
      <section className="pt-4 pb-8 bg-muted/10 border-b border-border relative z-20 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-6 items-center w-full">
            {/* Search Input */}
            <div className="relative w-full flex-1">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
              <input
                type="text"
                placeholder={t.news.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-12 py-3.5 bg-background border-2 border-primary/20 hover:border-primary/40 focus:border-primary rounded-full outline-none transition-all text-base text-foreground placeholder-muted-foreground shadow-md font-medium"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  aria-label={t.common.cancel}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Categories Dropdown Filter */}
            <CustomSelect
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={selectOptions}
              className="w-full md:w-[240px] shrink-0"
            />
          </div>
        </div>
      </section>

      <BlurDivider />

      {/* ── SINGLE ARTICLE SLIDER ── */}
      <section className="pt-5 pb-6 bg-muted/5">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <ArticleSlider
            items={filteredPosts}
            noItemsMessage={t.news.noArticlesFound}
            noItemsDesc={t.news.noArticlesDesc}
            showAll={showAll}
            setShowAll={setShowAll}
            renderCard={(post: any) => (
              <div className="bg-card border border-border rounded-2xl overflow-hidden group flex flex-col md:flex-row shadow-md relative">
                <div
                  className="relative md:w-5/12 h-60 md:h-[300px] overflow-hidden cursor-pointer shrink-0"
                  onClick={() => handleReadArticle(post.externalUrl)}
                >
                  <img
                    src={getImageSrc(post)}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-contain bg-muted/40 group-hover:scale-105 transition-transform duration-700"
                    onError={() => handleImageError(post.id)}
                    loading="eager"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md backdrop-blur-md ${post.accent}`}>
                      {post.cat}
                    </span>
                  </div>
                </div>

                <div className="p-4 md:p-6 md:w-7/12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1.5 text-primary/85"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                  </div>
                  <h3
                    className="font-display text-lg md:text-xl font-bold text-foreground mb-3 hover:text-primary transition-colors cursor-pointer leading-tight line-clamp-2"
                    onClick={() => handleReadArticle(post.externalUrl)}
                  >
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.summary}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50 text-muted-foreground text-xs font-medium">
                    <span className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                        <User className="w-3 h-3 text-muted-foreground" />
                      </div>
                      <span className="font-medium text-foreground/70">{post.author}</span>
                    </span>
                    <button
                      onClick={() => handleReadArticle(post.externalUrl)}
                      className="flex items-center gap-1 text-primary hover:text-primary/80 font-semibold transition-colors"
                    >
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </section>

      {/* ── ARTICLES GRID (shown when Explore All is clicked) ── */}
      {showAll && (
        <>
          <BlurDivider />
          {/* ── LATEST UPDATES GRID — all posts, no featured split ── */}
          <section className="pt-2 pb-16 bg-muted/5 border-t border-border/50">
            <div className="container mx-auto px-4 md:px-8 max-w-6xl">
              <div className="mb-10">
                <h2 className="text-xl font-display font-bold text-foreground">
                  {isFilteringOrSearching ? `${t.news.allCategories} (${filteredPosts.length})` : t.news.latestUpdates}
                </h2>
              </div>

              {isTransitioning ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-card border border-border/60 rounded-3xl overflow-hidden flex flex-col h-full">
                      <div className="h-56 bg-muted/60 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent shimmer-line" />
                      </div>
                      <div className="p-4 flex flex-col flex-1 space-y-4">
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
                        title={t.news.readArticle}
                      >
                        <img
                          src={getImageSrc(post)}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-contain bg-muted/40 group-hover:scale-110 transition-transform duration-700"
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
                      <div className="p-4 flex flex-col flex-1">
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
                              <User className="w-3.5 h-3.5 text-muted-foreground" />
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
                  <h3 className="text-xl font-bold mb-2 text-foreground">{t.news.noArticlesFound}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.news.noArticlesDesc}
                  </p>
                </motion.div>
              )}
            </div>
          </section>
        </>
      )}

      <BlurDivider />

      <section className="pt-7 pb-14 relative overflow-hidden bg-gradient-to-r from-red-700 via-primary to-red-950">
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
            {t.news.pressInquiries}
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/90 mb-8 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed"
          >
            {t.news.pressDesc}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a href="mailto:press@autonxt.in">
              <Button size="lg" className="bg-white text-red-700 hover:bg-red-50 font-bold px-10 py-6 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:-translate-y-1 transition-all text-base group">
                {t.news.contactPr}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
