import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Calendar, Clock, User, Tag, BookOpen, Users, 
  Search, ExternalLink, Zap 
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export default function Blog() {
  const { t } = useLang();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleReadArticle = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
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
  
  // Enhance the localized blog posts with metadata needed for premium cards
  const ARTICLES = blogPostsFromT.map((post: any, i: number) => {
    return {
      id: i + 1,
      ...post,
      cat: post.tag, // map tag to cat for filtering consistency
    };
  });

  // Dynamically extract categories to maintain perfect multi-lingual capability
  const categories = ["all", ...Array.from(new Set(ARTICLES.map((p: any) => p.tag)))];

  const accents = [
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
    "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
    "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
    "bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400",
    "bg-pink-50 text-pink-700 dark:bg-pink-950/30 dark:text-pink-400",
    "bg-teal-50 text-teal-700 dark:bg-teal-950/30 dark:text-teal-400",
    "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400"
  ];

  const ARTICLES_WITH_ACCENTS = ARTICLES.map((article: any, i: number) => ({
    ...article,
    accent: accents[i % accents.length]
  }));

  const filteredPosts = ARTICLES_WITH_ACCENTS.filter((post: any) => {
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

  // When not searching/filtering, separate the first article as featured
  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="w-full min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="bg-surface-dark relative overflow-hidden pt-28 pb-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,hsl(0,72%,40%,0.12),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,hsl(214,65%,32%,0.09),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(hsl(0,0%,100%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,0%,100%) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            {/* Left: text */}
            <div className="pb-16">
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
                {t.blog.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">{t.blog.titleHighlight}</span>
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
                <div className="col-span-2 row-span-2 rounded-tl-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${featuredPost?.image || '/images/blog/future-of-farming.webp'})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <BookOpen className="w-10 h-10 text-white/70 mb-3 drop-shadow-lg" />
                    <h3 className="text-white font-bold text-2xl drop-shadow-lg leading-tight">{featuredPost?.title || 'Insights & Updates'}</h3>
                  </div>
                </div>
                <div className="rounded-tr-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${regularPosts[0]?.image || '/images/blog/game-changing-electric-tractor.webp'})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="overflow-hidden relative group">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${regularPosts[1]?.image || '/images/blog/technology-behind-autonxt.webp'})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface-dark to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SEARCH & FILTER SECTION ── */}
      <section className="py-8 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:w-[350px] shrink-0">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
              <input
                type="text"
                placeholder={t.blog.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-3.5 bg-background border-2 border-primary/20 hover:border-primary/40 focus:border-primary rounded-full outline-none transition-all text-base text-foreground placeholder-muted-foreground shadow-md font-medium"
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
                      ? "bg-primary text-primary-foreground shadow-md scale-105"
                      : "bg-background border border-border text-foreground hover:bg-muted hover:scale-105"
                  }`}
                >
                  {category === "all" ? t.blog.allCategories : (category as string)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED POST (ONLY WHEN NOT FILTERING/SEARCHING) ── */}
      {!isFilteringOrSearching && featuredPost && (
        <section className="py-14 bg-muted/10">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
              <Zap className="w-4 h-4" /> {t.blog.featured}
            </p>
            
            <motion.div
              className="bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/45 hover:shadow-2xl transition-all group flex flex-col md:flex-row relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Featured Cover Image Container */}
              <div 
                className="relative md:w-5/12 h-64 md:h-[360px] overflow-hidden cursor-pointer shrink-0"
                onClick={() => handleReadArticle(featuredPost.externalUrl)}
                title="Click to read full article"
              >
                {featuredPost.image ? (
                  <img src={featuredPost.image} alt={featuredPost.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className={`absolute inset-0 w-full h-full ${getGradient(featuredPost.id)} group-hover:scale-110 transition-transform duration-700`} />
                )}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay pointer-events-none" />
                
                {/* Category tag */}
                <div className="absolute top-4 left-4" onClick={(e) => e.stopPropagation()}>
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md bg-white/90 text-black`}>
                    {featuredPost.tag}
                  </span>
                </div>

                {/* Top Right External Link Icon */}
                <div className="absolute top-4 right-4">
                  <div className="bg-black/40 backdrop-blur-md rounded-full p-2 transition-transform group-hover:scale-110 shadow-lg">
                    <ExternalLink className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Center "Read Article" Button on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 bg-white/95 text-black px-5 py-2.5 rounded-full text-sm font-bold shadow-xl tracking-wider flex items-center gap-2">
                    {t.blog.readArticle} <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Featured Content details */}
              <div className="p-6 md:p-8 md:w-7/12 flex flex-col justify-center bg-card/50 backdrop-blur-xl z-10">
                <div className="flex flex-wrap gap-4 items-center mb-4 text-xs text-muted-foreground font-medium">
                  <span className="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-md"><Calendar className="w-3 h-3" />{featuredPost.date}</span>
                  <span className="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-md"><Clock className="w-3 h-3" />{featuredPost.readTime}</span>
                  <span className="flex items-center gap-1.5"><User className="w-3 h-3 text-primary" />{featuredPost.author}</span>
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
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <p className="text-xs font-bold text-primary uppercase tracking-widest">
              {isFilteringOrSearching ? `${t.blog.allPosts} (${filteredPosts.length})` : t.blog.allPosts}
            </p>
          </div>
          
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(isFilteringOrSearching ? filteredPosts : regularPosts).map((post: any, i: number) => (
                <motion.div
                  key={post.id}
                  className="bg-card border border-border/60 rounded-3xl hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 group flex flex-col overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: (i % 3) * 0.1, duration: 0.5, ease: "easeOut" }}
                >
                  {/* Card Cover Image Container (Gradient) */}
                  <div 
                    className="relative h-52 w-full overflow-hidden cursor-pointer"
                    onClick={() => handleReadArticle(post.externalUrl)}
                    title="Click to read full article"
                  >
                    {post.image ? (
                      <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className={`absolute inset-0 w-full h-full ${getGradient(post.id)} group-hover:scale-110 transition-transform duration-700`} />
                    )}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay pointer-events-none" />
                    
                    {/* Category tag */}
                    <div className="absolute top-4 left-4" onClick={(e) => e.stopPropagation()}>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md backdrop-blur-md bg-white/95 text-black`}>
                        {post.tag}
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
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                      {post.summary}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50 text-muted-foreground text-xs font-medium">
                      <span className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <User className="w-3 h-3" />
                        </div>
                        {post.author}
                      </span>
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
              <p className="text-sm text-muted-foreground">
                {t.blog.noArticlesDesc}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-r from-primary to-blue-800">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[150%] bg-white/10 transform rotate-12 blur-3xl"></div>
          <div className="absolute top-[20%] -left-[10%] w-[30%] h-[100%] bg-black/10 transform -rotate-12 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <Zap className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            {t.blog.writeFor}
          </motion.h2>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/90 mb-10 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed"
          >
            {t.blog.writeDesc}
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a href="mailto:info@autonxt.in?subject=Writing for AutoNxt Blog">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-50 font-bold px-10 py-7 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:-translate-y-1 transition-all text-lg group">
                {t.common.getInTouch} 
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
