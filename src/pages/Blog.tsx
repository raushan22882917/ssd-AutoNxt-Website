import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Calendar, Clock, User, Tag, BookOpen, Users, 
  Search, Filter, ExternalLink, Zap 
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export default function Blog() {
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
    return post.image || "/News/Blog/Blog.png";
  };

  const blogPostsFromT = t.blogPage.posts;
  
  // Enhance the localized blog posts with metadata needed for premium cards
  const ARTICLES = blogPostsFromT.map((post, i) => {
    return {
      id: i + 1,
      ...post,
      cat: post.tag, // map tag to cat for filtering consistency
      image: "/News/Blog/Blog.png",
    };
  });

  // Dynamically extract categories to maintain perfect multi-lingual capability
  const categories = ["all", ...Array.from(new Set(ARTICLES.map(p => p.tag)))];

  const accents = [
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
    "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
    "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
    "bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400",
    "bg-pink-50 text-pink-700 dark:bg-pink-950/30 dark:text-pink-400",
    "bg-teal-50 text-teal-700 dark:bg-teal-950/30 dark:text-teal-400",
    "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400"
  ];

  const ARTICLES_WITH_ACCENTS = ARTICLES.map((article, i) => ({
    ...article,
    accent: accents[i % accents.length]
  }));

  const filteredPosts = ARTICLES_WITH_ACCENTS.filter(post => {
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
    <div className="w-full min-h-screen bg-background pb-16">

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
                className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-4 py-1.5 mb-6"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-xs font-bold uppercase tracking-widest">{t.blog.tag}</span>
              </motion.div>
              <motion.h1
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.06]"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              >
                {t.blog.title} <span className="text-primary">{t.blog.titleHighlight}</span>
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
                  { icon: BookOpen, label: t.blogPage.postsLabel, value: "20+" },
                  { icon: Users, label: t.blogPage.authorsLabel, value: "6" },
                  { icon: Tag, label: t.blogPage.topicsLabel, value: "5" },
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
                    src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=900&q=80"
                    alt="Farm fields at sunrise"
                    className="w-full h-full object-cover"
                    loading="eager" decoding="async"
                  />
                </div>
                <div className="rounded-tr-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=500&q=80"
                    alt="Writing and research"
                    className="w-full h-full object-cover"
                    loading="eager" decoding="async"
                  />
                </div>
                <div className="overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80"
                    alt="Agricultural landscape"
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

      {/* ── SEARCH & FILTER SECTION ── */}
      <section className="py-8 bg-muted/20 border-y border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 w-full max-w-md">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder={t.blog.searchPlaceholder}
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
                    {category === "all" ? t.blog.allCategories : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED POST (ONLY WHEN NOT FILTERING/SEARCHING) ── */}
      {!isFilteringOrSearching && featuredPost && (
        <section className="py-14 bg-muted/30">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-6">{t.blog.featured}</p>
            
            <motion.div
              className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/45 hover:shadow-xl transition-all group flex flex-col md:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Featured Cover Image Container */}
              <div 
                className="relative md:w-1/2 h-64 md:h-auto min-h-[300px] overflow-hidden cursor-pointer"
                onClick={() => handleReadArticle(featuredPost.externalUrl)}
                title="Click to read full article"
              >
                <img
                  src={getImageSrc(featuredPost)}
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={() => handleImageError(featuredPost.id)}
                />
                
                {/* Category tag */}
                <div className="absolute top-4 left-4" onClick={(e) => e.stopPropagation()}>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${featuredPost.accent}`}>
                    {featuredPost.tag}
                  </span>
                </div>

                {/* Top Right External Link Icon */}
                <div className="absolute top-4 right-4">
                  <div className="bg-black/60 backdrop-blur-sm rounded-full p-1.5 transition-transform group-hover:scale-110">
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                {/* Center "Read Article" Button on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 text-black px-5 py-2.5 rounded-xl text-xs font-semibold shadow-md tracking-wider">
                    {t.blog.readArticle}
                  </div>
                </div>
              </div>

              {/* Featured Content details */}
              <div className="p-8 md:p-10 md:w-1/2 flex flex-col justify-center">
                <div className="flex flex-wrap gap-4 items-center mb-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{featuredPost.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featuredPost.readTime}</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{featuredPost.author}</span>
                </div>
                
                <h2 
                  className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 hover:text-primary transition-colors cursor-pointer leading-snug"
                  onClick={() => handleReadArticle(featuredPost.externalUrl)}
                >
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {featuredPost.summary}
                </p>
                
                <Button 
                  onClick={() => handleReadArticle(featuredPost.externalUrl)} 
                  className="bg-primary text-white hover:bg-primary/90 w-fit"
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
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-8">
            {isFilteringOrSearching ? `${t.blog.allPosts} (${filteredPosts.length})` : t.blog.allPosts}
          </p>
          
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(isFilteringOrSearching ? filteredPosts : regularPosts).map((post, i) => (
                <motion.div
                  key={post.id}
                  className="bg-card border border-border rounded-2xl hover:border-primary/45 hover:shadow-lg transition-all group flex flex-col overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.07 }}
                >
                  {/* Card Cover Image Container */}
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
                        {post.tag}
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
                    <div className="flex items-center gap-3 mb-2 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                    </div>

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
                        <User className="w-3.5 h-3.5" />
                        {post.author}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 max-w-md mx-auto">
              <Search className="w-12 h-12 text-muted-foreground/60 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-1 text-foreground">{t.blog.noArticlesFound}</h3>
              <p className="text-sm text-muted-foreground">
                {t.blog.noArticlesDesc}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-surface-dark border-t border-white/5">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <Zap className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="font-display text-3xl font-bold text-white mb-3">{t.blog.writeFor}</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">{t.blog.writeDesc}</p>
          <a href="mailto:info@autonxt.in?subject=Writing for AutoNxt Blog">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold px-8">
              {t.common.getInTouch} <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
