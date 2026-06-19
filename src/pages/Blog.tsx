import { useState, useEffect, useRef } from "react";
import { useResourceFilter } from "@/hooks/use-resource-filter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Calendar, Clock, User, BookOpen, Users,
  Search, ExternalLink, Zap, Tag, X, ChevronDown, SlidersHorizontal
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { ArticleSlider } from "@/components/ui/article-slider";

// Simple hash → color for avatar
function authorColor(name: string) {
  const palette = [
    "from-violet-500 to-purple-600",
    "from-blue-500 to-indigo-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-pink-500 to-rose-600",
    "from-cyan-500 to-blue-600",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
}

const topAccents = [
  "from-violet-400 via-purple-400 to-pink-400",
  "from-blue-400 via-indigo-400 to-violet-400",
  "from-emerald-400 via-teal-400 to-cyan-400",
  "from-amber-400 via-orange-400 to-red-400",
  "from-pink-400 via-rose-400 to-red-400",
  "from-cyan-400 via-blue-400 to-indigo-400",
  "from-teal-400 via-emerald-400 to-green-400",
];

export default function Blog() {
  const { t } = useLang();

  const handleReadArticle = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const getGradient = (id: number) => {
    const gradients = [
      "bg-gradient-to-br from-emerald-400 to-teal-700",
      "bg-gradient-to-br from-blue-400 to-indigo-700",
      "bg-gradient-to-br from-amber-400 to-orange-700",
      "bg-gradient-to-br from-purple-400 to-pink-700",
      "bg-gradient-to-br from-pink-400 to-rose-700",
      "bg-gradient-to-br from-teal-400 to-cyan-700",
      "bg-gradient-to-br from-indigo-400 to-purple-700",
      "bg-gradient-to-br from-orange-400 to-red-700",
    ];
    return gradients[id % gradients.length];
  };

  const blogPostsFromT = t.blogPage.posts || [];

  const ARTICLES = blogPostsFromT.map((post: any, i: number) => ({
    id: i + 1,
    ...post,
    cat: post.tag,
    accent: topAccents[i % topAccents.length],
    isNew: i < 2,
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
    getCategory: (post: any) => post.tag,
    searchFields: (post: any) => [post.title, post.summary, post.author, post.tag],
  });

  const selectOptions = categories.map((category) => {
    const count = categoryCounts[category as string] ?? 0;
    return {
      value: category as string,
      label: category === "all" ? `${t.blog.allCategories} (${count})` : `${category as string} (${count})`,
    };
  });
  const [showAll, setShowAll] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full min-h-screen bg-background">
      <SEO title={t.nav.blog} description={t.blog.desc} />

      {/* ── HERO ── */}
      <section className="bg-background relative overflow-hidden pt-10 pb-0 md:pt-14 lg:pt-[18px] lg:h-[93.75vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,hsl(0,72%,40%,0.12),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,hsl(214,65%,32%,0.09),transparent_50%)] pointer-events-none" />
        {/* Floating orbs */}
        <div className="absolute top-16 right-[15%] w-72 h-72 rounded-full bg-primary/4 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-8 left-[5%] w-60 h-60 rounded-full bg-indigo-600/4 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(hsl(0,0%,0%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,0%,0%) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[0.5cm] lg:gap-12 items-end lg:items-start">
            {/* Left: text */}
            <div className="pt-8 lg:pt-16 pb-0 lg:pb-10">
              <motion.div
                className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-xs font-bold uppercase tracking-widest">{t.blog.tag}</span>
              </motion.div>
              <motion.h1
                className="font-display text-[1.55rem] sm:text-[2.1rem] md:text-[2.5rem] lg:text-6xl font-bold text-foreground mb-6 leading-[1.08] lg:leading-[1.06] tracking-tight"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              >
                {t.blog.title}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                  {t.blog.titleHighlight}
                </span>
              </motion.h1>
              <motion.p
                className="text-muted-foreground text-[12px] sm:text-sm md:text-base lg:text-lg max-w-lg leading-relaxed mb-0 max-lg:font-bold"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
              >
                {t.blog.desc}
              </motion.p>
              {/* Fact cards — visible only on desktop */}
              <motion.div
                className="hidden lg:flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}
              >
                {[
                  { icon: BookOpen, label: t.blogPage.postsLabel, value: `${ARTICLES.length}` },
                  { icon: Users, label: t.blogPage.authorsLabel, value: `${new Set(ARTICLES.map((p: any) => p.author)).size}` },
                  { icon: Tag, label: t.blogPage.topicsLabel, value: `${categories.length - 1}` },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 group">
                    <div className="w-9 h-9 rounded-lg bg-muted border border-border flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
                      <f.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-[10px] uppercase tracking-widest font-medium">{f.label}</p>
                      <p className="text-foreground font-bold text-sm">{f.value}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: photo collage */}
            <motion.div
              className="relative pb-0 w-full z-10"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            >
              <div className="relative w-full aspect-[1675/939] lg:aspect-auto lg:h-[420px]">
                <div className="grid grid-cols-3 gap-2 h-full lg:h-[420px] w-full">
                  <div className="col-span-2 row-span-2 rounded-xl lg:rounded-tl-2xl overflow-hidden relative group">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                      style={{ backgroundImage: `url(${ARTICLES[0]?.image || "/images/blog/future-of-farming.webp"})` }} />
                    <div className="hidden lg:flex absolute inset-0 flex-col justify-end p-6 bg-gradient-to-t from-background/80 via-transparent to-transparent">
                      <BookOpen className="w-10 h-10 text-primary mb-3" />
                      <h3 className="text-foreground font-bold text-2xl leading-tight">
                        {ARTICLES[0]?.title || "Insights & Updates"}
                      </h3>
                    </div>
                  </div>
                  <div className="rounded-tr-xl lg:rounded-tr-2xl overflow-hidden relative group">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                      style={{ backgroundImage: `url(${ARTICLES[1]?.image || "/images/blog/game-changing-electric-tractor.webp"})` }} />
                  </div>
                  <div className="overflow-hidden relative rounded-br-xl lg:rounded-none group">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                      style={{ backgroundImage: `url(${ARTICLES[2]?.image || "/images/blog/technology-behind-autonxt.webp"})` }} />
                  </div>
                </div>
                {/* Top gradient — blends image top edge into background */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
              </div>
              {/* Fact cards — horizontal row below image (mobile only) */}
              <div className="flex lg:hidden flex-row gap-2 mt-3 w-full">
                {[
                  { icon: BookOpen, label: t.blogPage.postsLabel, value: `${ARTICLES.length}` },
                  { icon: Users, label: t.blogPage.authorsLabel, value: `${new Set(ARTICLES.map((p: any) => p.author)).size}` },
                  { icon: Tag, label: t.blogPage.topicsLabel, value: `${categories.length - 1}` },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 flex-1 py-1">
                    <f.icon className="w-4 h-4 text-neutral-500 flex-shrink-0" strokeWidth={2} />
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none truncate">{f.label}</p>
                      <p className="text-xs sm:text-sm font-bold text-foreground mt-1 leading-tight truncate">{f.value}</p>
                    </div>
                  </div>
                ))}
              </div>
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
            {t.blog.tag}
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
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60" aria-hidden="true" />
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
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60" aria-hidden="true" />
                  <span>{post.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SEARCH & FILTER SECTION ── */}
      <section className="py-6 bg-muted/30 border-b border-border relative z-30">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="max-w-2xl mx-auto relative w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary w-4.5 h-4.5 pointer-events-none" aria-hidden="true" />
            <input
              id="blog-search"
              type="search"
              placeholder={t.blog.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label={t.blog.searchPlaceholder}
              className="w-full pl-14 pr-24 py-3.5 bg-background border-2 border-primary/20 hover:border-primary/40 focus:border-primary rounded-full outline-none transition-all text-base text-foreground placeholder-muted-foreground shadow-md font-medium"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  aria-label={t.common.cancel}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                </button>
              )}

              {/* Category Filter Icon Trigger */}
              <div ref={filterRef} className="relative flex items-center">
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  aria-label="Filter by category"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 active:bg-primary/20 transition-all cursor-pointer relative"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  {selectedCategory !== "all" && (
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-primary border-2 border-background rounded-full" />
                  )}
                </button>

                {/* Dropdown Options List */}
                {isFilterOpen && (
                  <div className="absolute right-0 top-full mt-3 w-56 bg-background border border-border shadow-xl rounded-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="max-h-[280px] overflow-y-auto hide-scrollbar">
                      {selectOptions.map((option) => {
                        const isSelected = option.value === selectedCategory;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setSelectedCategory(option.value);
                              setIsFilterOpen(false);
                            }}
                            className={`w-full text-left px-5 py-2.5 text-sm transition-colors duration-150 select-none block truncate cursor-pointer
                              ${isSelected 
                                ? "bg-primary/10 text-primary font-bold" 
                                : "text-foreground hover:bg-primary/5 hover:text-primary font-medium"
                              }`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SINGLE ARTICLE SLIDER ── */}
      <section className="pt-10 pb-6 bg-muted/5">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <ArticleSlider
            items={filteredPosts}
            noItemsMessage={t.blog.noArticlesFound}
            noItemsDesc={t.blog.noArticlesDesc}
            showAll={showAll}
            setShowAll={setShowAll}
            isPaused={isFilterOpen}
            renderCard={(post: any) => (
              <div className="bg-card border border-border rounded-2xl overflow-hidden group flex flex-col md:flex-row shadow-md relative">
                <div
                  className="relative md:w-5/12 h-60 md:h-[300px] overflow-hidden cursor-pointer shrink-0"
                  onClick={() => handleReadArticle(post.externalUrl)}
                >
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-contain bg-muted/40 group-hover:scale-105 transition-transform duration-700"
                      loading="eager"
                    />
                  ) : (
                    <div className={`absolute inset-0 w-full h-full ${getGradient(post.id)}`} />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md backdrop-blur-md bg-white/95 text-black">
                      {post.tag}
                    </span>
                  </div>
                </div>

                <div className="p-4 md:p-6 md:w-7/12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
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
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${authorColor(post.author)} flex items-center justify-center text-white text-[10px] font-bold shadow-sm`}>
                        {post.author.split(" ").map((w: string) => w[0]).slice(0, 2).join("")}
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

      {/* ── ARTICLES GRID ── */}
      {showAll && (
        <section className="pt-4 pb-14 bg-background">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <p className="text-xs font-bold text-primary uppercase tracking-widest">
                {`${t.blog.allPosts} (${filteredPosts.length})`}
              </p>
            </div>

            {isTransitioning ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-card border border-border/60 rounded-3xl overflow-hidden flex flex-col h-full">
                    <div className="h-52 bg-muted/60 relative overflow-hidden">
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
            ) : filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post: any, i: number) => (
                  <motion.div
                    key={post.id}
                    className="bg-card border border-border/60 rounded-3xl transition-all duration-300 group flex flex-col overflow-hidden relative card-lift"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: (i % 3) * 0.08, duration: 0.5, ease: "easeOut" }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(180,30,30,0.12)";
                      (e.currentTarget as HTMLElement).style.borderColor = "hsl(0,72%,50%,0.35)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "";
                      (e.currentTarget as HTMLElement).style.borderColor = "";
                    }}
                  >
                    {/* Top gradient accent line */}
                    <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${post.accent} rounded-t-3xl z-10`} />

                    {/* "New" badge */}
                    {post.isNew && (
                      <div className="absolute top-5 left-4 z-20">
                        <span className="bg-primary text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md animate-pulse">
                          {t.blog.newBadge}
                        </span>
                      </div>
                    )}

                    {/* Card Cover */}
                    <div
                      className="relative h-52 w-full overflow-hidden cursor-pointer"
                      onClick={() => handleReadArticle(post.externalUrl)}
                      title={t.blog.readArticle}
                    >
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-contain bg-muted/40 group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      ) : (
                        <div className={`absolute inset-0 w-full h-full ${getGradient(post.id)} group-hover:scale-110 transition-transform duration-700`} />
                      )}
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay pointer-events-none" />

                      {/* Category tag */}
                      <div className={`absolute ${post.isNew ? "top-4 left-16" : "top-4 left-4"}`} onClick={(e) => e.stopPropagation()}>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md backdrop-blur-md bg-white/95 text-black">
                          {post.tag}
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
                          {t.blog.readArticle}
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex flex-col flex-1 bg-gradient-to-b from-transparent to-muted/10">
                      <div className="flex items-center gap-3 mb-3 text-[11px] font-medium text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                      </div>

                      <h3
                        className="font-bold text-foreground text-lg leading-snug mb-3 hover:text-primary transition-colors cursor-pointer line-clamp-2"
                        onClick={() => handleReadArticle(post.externalUrl)}
                      >
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                        {post.summary}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50 text-muted-foreground text-xs font-medium">
                        <span className="flex items-center gap-2">
                          {/* Author avatar with initials */}
                          <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${authorColor(post.author)} flex items-center justify-center text-white text-[10px] font-bold shadow-sm`}>
                            {post.author.split(" ").map((w: string) => w[0]).slice(0, 2).join("")}
                          </div>
                          <span className="font-medium text-foreground/70">{post.author}</span>
                        </span>
                        <button
                          onClick={() => handleReadArticle(post.externalUrl)}
                          className="flex items-center gap-1 text-primary/70 hover:text-primary font-semibold transition-colors"
                        >
                          {t.blog.readAction} <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-14 relative overflow-hidden bg-gradient-to-r from-red-700 via-primary to-red-950">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[150%] bg-white/10 transform rotate-12 blur-3xl" />
          <div className="absolute top-[20%] -left-[10%] w-[30%] h-[100%] bg-black/10 transform -rotate-12 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <Zap className="w-8 h-8 text-white" />
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
          >
            {t.blog.writeFor}
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/90 mb-8 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed"
          >
            {t.blog.writeDesc}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a href="mailto:info@autonxt.in?subject=Writing for AutoNxt Blog">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-50 font-bold px-10 py-6 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:-translate-y-1 transition-all text-base group">
                {t.common.getInTouch}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
