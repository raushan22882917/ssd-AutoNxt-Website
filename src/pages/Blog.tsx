import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Calendar, Clock, User, BookOpen, Users,
  Search, ExternalLink, Zap, Tag, X
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

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

  const categories = ["all", ...Array.from(new Set(ARTICLES.map((p: any) => p.tag)))];

  // Count per category
  const categoryCounts = categories.reduce((acc: Record<string, number>, cat) => {
    acc[cat as string] = cat === "all"
      ? ARTICLES.length
      : ARTICLES.filter((p: any) => p.tag === cat).length;
    return acc;
  }, {});

  const filteredPosts = ARTICLES.filter((post: any) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tag.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      post.tag.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const isFilteringOrSearching = searchTerm !== "" || selectedCategory !== "all";
  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="w-full min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="bg-surface-dark relative overflow-hidden pt-20 md:pt-28 pb-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,hsl(0,72%,40%,0.12),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,hsl(214,65%,32%,0.09),transparent_50%)] pointer-events-none" />
        {/* Floating orbs */}
        <div className="absolute top-16 right-[15%] w-72 h-72 rounded-full bg-primary/4 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-8 left-[5%] w-60 h-60 rounded-full bg-indigo-600/4 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(hsl(0,0%,100%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,0%,100%) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            {/* Left: text */}
            <div className="pb-8 md:pb-10">
              <motion.div
                className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-xs font-bold uppercase tracking-widest">{t.blog.tag}</span>
              </motion.div>
              <motion.h1
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.06]"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              >
                {t.blog.title}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                  {t.blog.titleHighlight}
                </span>
              </motion.h1>
              <motion.p
                className="text-white/55 text-lg max-w-lg leading-relaxed mb-10"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
              >
                {t.blog.desc}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}
              >
                {[
                  { icon: BookOpen, label: t.blogPage.postsLabel, value: `${ARTICLES.length}` },
                  { icon: Users, label: t.blogPage.authorsLabel, value: `${new Set(ARTICLES.map((p: any) => p.author)).size}` },
                  { icon: Tag, label: t.blogPage.topicsLabel, value: `${categories.length - 1}` },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 group">
                    <div className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
                      <f.icon className="w-4 h-4 text-white/60 group-hover:text-primary transition-colors" />
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
                <div className="col-span-2 row-span-2 rounded-tl-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url(${featuredPost?.image || "/images/blog/future-of-farming.webp"})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <BookOpen className="w-10 h-10 text-white/70 mb-3 drop-shadow-lg" />
                    <h3 className="text-white font-bold text-2xl drop-shadow-lg leading-tight">
                      {featuredPost?.title || "Insights & Updates"}
                    </h3>
                  </div>
                </div>
                <div className="rounded-tr-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url(${regularPosts[0]?.image || "/images/blog/game-changing-electric-tractor.webp"})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="overflow-hidden relative group">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url(${regularPosts[1]?.image || "/images/blog/technology-behind-autonxt.webp"})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface-dark to-transparent pointer-events-none" />
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

      {/* ── SEARCH & FILTER SECTION ── */}
      <section className="py-6 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-5 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-[380px] shrink-0">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary w-4.5 h-4.5" />
              <input
                type="text"
                placeholder={t.blog.searchPlaceholder}
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

            {/* Category pills with counts */}
            <div className="flex flex-nowrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                const count = categoryCounts[category as string] ?? 0;
                return (
                  <button
                    key={category as string}
                    onClick={() => setSelectedCategory(category as string)}
                    className={`whitespace-nowrap flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-background border border-border text-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
                      }`}
                  >
                    {category === "all" ? t.blog.allCategories : (category as string)}
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

      {/* ── FEATURED POST ── */}
      {!isFilteringOrSearching && featuredPost && (
        <section className="pt-10 pb-4 bg-muted/10">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
              <Zap className="w-4 h-4" /> {t.blog.featured}
            </p>

            <motion.div
              className="relative bg-card border-2 border-transparent rounded-2xl overflow-hidden group flex flex-col md:flex-row"
              style={{
                background: "linear-gradient(hsl(var(--card)), hsl(var(--card))) padding-box, linear-gradient(135deg, hsl(var(--primary)/0.5), hsl(214,65%,40%,0.5)) border-box",
                boxShadow: "0 4px 30px rgba(0,0,0,0.06)"
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(180,30,30,0.14), 0 4px 20px rgba(0,0,0,0.06)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 30px rgba(0,0,0,0.06)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* "Editor's Pick" pulsing badge */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-6 z-30">
                <div className="flex items-center gap-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Editor's Pick
                </div>
              </div>

              {/* Featured Cover */}
              <div
                className="relative md:w-5/12 h-64 md:h-[360px] overflow-hidden cursor-pointer shrink-0"
                onClick={() => handleReadArticle(featuredPost.externalUrl)}
                title="Click to read full article"
              >
                {featuredPost.image ? (
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className={`absolute inset-0 w-full h-full ${getGradient(featuredPost.id)} group-hover:scale-110 transition-transform duration-700`} />
                )}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay pointer-events-none" />

                {/* Category */}
                <div className="absolute top-4 left-4" onClick={(e) => e.stopPropagation()}>
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md bg-white/90 text-black">
                    {featuredPost.tag}
                  </span>
                </div>

                {/* Hover CTA */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 bg-white/95 text-black px-5 py-2.5 rounded-full text-sm font-bold shadow-xl tracking-wider flex items-center gap-2">
                    {t.blog.readArticle} <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Featured content */}
              <div className="p-6 md:p-8 md:w-7/12 flex flex-col justify-center bg-card/50 backdrop-blur-xl z-10">
                <div className="flex flex-wrap gap-3 items-center mb-4 text-xs text-muted-foreground font-medium">
                  <span className="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-md">
                    <Calendar className="w-3 h-3" />{featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-md">
                    <Clock className="w-3 h-3" />{featuredPost.readTime}
                  </span>
                </div>

                <h2
                  className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 hover:text-primary transition-colors cursor-pointer leading-tight line-clamp-2"
                  onClick={() => handleReadArticle(featuredPost.externalUrl)}
                >
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground/90 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                  {featuredPost.summary}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${authorColor(featuredPost.author)} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
                    {featuredPost.author.split(" ").map((w: string) => w[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Author</p>
                    <p className="text-sm font-semibold">{featuredPost.author}</p>
                  </div>
                </div>

                <Button
                  onClick={() => handleReadArticle(featuredPost.externalUrl)}
                  className="bg-primary text-white hover:bg-primary/90 w-fit rounded-full px-6 py-5 shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
                >
                  {t.blog.readFull} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── ARTICLES GRID ── */}
      <section className="pt-4 pb-14 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="font-display text-4xl font-black text-primary/10 leading-none select-none">
                {isFilteringOrSearching ? "—" : "02"}
              </span>
              <p className="text-xs font-bold text-primary uppercase tracking-widest">
                {isFilteringOrSearching ? `${t.blog.allPosts} (${filteredPosts.length})` : t.blog.allPosts}
              </p>
            </div>
          </div>

          {isTransitioning ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-card border border-border/60 rounded-3xl overflow-hidden flex flex-col h-full">
                  <div className="h-52 bg-muted/60 relative overflow-hidden">
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
              {(isFilteringOrSearching ? filteredPosts : regularPosts).map((post: any, i: number) => (
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
                        New
                      </span>
                    </div>
                  )}

                  {/* Card Cover */}
                  <div
                    className="relative h-52 w-full overflow-hidden cursor-pointer"
                    onClick={() => handleReadArticle(post.externalUrl)}
                    title="Click to read full article"
                  >
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
                  <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-transparent to-muted/10">
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
                        Read <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-20 max-w-md mx-auto bg-muted/20 rounded-3xl border border-border border-dashed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground/60" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{t.blog.noArticlesFound}</h3>
              <p className="text-sm text-muted-foreground">{t.blog.noArticlesDesc}</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 relative overflow-hidden bg-gradient-to-r from-primary to-blue-800">
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
