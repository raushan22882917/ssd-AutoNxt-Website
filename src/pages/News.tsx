import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Calendar, ExternalLink, Tag, FileText, Globe, Award, Search, Filter, Clock, Eye, User
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export default function News() {
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
      return "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80";
    }
    return post.image || "/unnamed.jpg";
  };

  const localizedNews = t.newsPage.news || [];

  const externalUrls = [
    "https://www.cmv360.com/tractors/news/autonxt-automation-launching-india-first-self-driving-electric-tractor",
    "https://auto.economictimes.indiatimes.com/news/automotive/autonxt-automation-secures-pre-series-a-funding-led-by-saama/109165048",
    "https://tractornews.in/news/autonxt-automation-to-introduce-india-s-first-self-driving-electric-tractor-secures-pre-series-a-funding/",
    "https://www.tractorjunction.com/tractor-news/autonxt-automation-secures-pre-series-a-funding-from-saama/",
    "https://www.mercomindia.com/autonxt-pre-series-a-funding",
    "https://indiabuzznews.co.in/autonxts-game-changing-electric-tractor-set-to-transform-farming-and-industry-in-india/",
    "https://firstindia.co.in/news/press-releases/revolutionizing-indian-agriculture-autonxts-electric-tractors-bring-intelligence-sustainability-and-profitability-to-farmers",
    "https://evreporter.com/autonxt-automation-secures-pre-series-a-funding-for-electric-autonomous-tractor/"
  ];

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
      externalUrl: post.externalUrl || externalUrls[i] || "https://www.autonxt.in",
      featured: i < 2, // The first 2 items are featured!
      tags: [post.tag, "AutoNxt", "Electric Tractor", "Innovation"]
    };
  });

  const categories = ["all", ...Array.from(new Set(newsPosts.map((p: any) => p.cat)))];

  const accents = [
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
    "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
    "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
    "bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400"
  ];

  const ARTICLES = newsPosts.map((article, i) => ({
    ...article,
    accent: accents[i % accents.length]
  }));

  const filteredPosts = ARTICLES.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || post.cat.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

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
                <span className="text-primary text-xs font-bold uppercase tracking-widest">{t.news.tag}</span>
              </motion.div>
              <motion.h1
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.06]"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              >
                {t.news.title} <span className="text-primary">{t.news.titleHighlight}</span>
              </motion.h1>
              <motion.p
                className="text-white/55 text-lg max-w-lg leading-relaxed mb-10"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
              >
                {t.news.desc}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}
              >
                {[
                  { icon: FileText, label: t.newsPage.storiesLabel, value: "50+" },
                  { icon: Globe, label: t.newsPage.coverageLabel, value: t.newsPage.coverageValue },
                  { icon: Award, label: t.newsPage.milestonesLabel, value: t.newsPage.milestonesValue },
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
                    src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80"
                    alt="AutoNxt press event"
                    className="w-full h-full object-cover"
                    loading="eager" decoding="async"
                  />
                </div>
                <div className="rounded-tr-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=500&q=80"
                    alt="Media coverage"
                    className="w-full h-full object-cover"
                    loading="eager" decoding="async"
                  />
                </div>
                <div className="overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1495020689067-958852a7765e?w=500&q=80"
                    alt="News headlines"
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
                placeholder="Search news..."
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

      {/* ── FEATURED STORIES ── */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-8">{t.news.featured}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  className="bg-card border border-border rounded-2xl hover:border-primary/45 hover:shadow-lg transition-all group flex flex-col overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 2) * 0.07 }}
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
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                    </div>
                    
                    <h3 
                      className="font-bold text-foreground text-base leading-snug mb-3 hover:text-primary transition-colors cursor-pointer line-clamp-2"
                      onClick={() => handleReadArticle(post.externalUrl)}
                    >
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-xs leading-relaxed mb-4 flex-1 line-clamp-3">
                      {post.summary}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-border text-muted-foreground text-[10px]">
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{post.author}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{post.views} views</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border/40">
                      {post.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="flex items-center gap-1 bg-muted text-muted-foreground px-2 py-0.5 rounded text-[9px] font-medium">
                          <Tag className="w-2.5 h-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── REGULAR STORIES (ALL ARTICLES) ── */}
      {regularPosts.length > 0 && (
        <section className="py-16 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-8">{t.news.allNews}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, i) => (
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
                    <div className="flex items-center gap-3 mb-2 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
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
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views} views</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto">
              <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2 text-gray-300">No news articles found</h3>
              <p className="text-gray-400">
                Try adjusting your search query or choosing another category filter.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── PRESS CONTACT CTA ── */}
      <section className="py-16 bg-primary border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-2xl text-center">
          <FileText className="w-8 h-8 text-white mx-auto mb-4" />
          <h2 className="font-display text-3xl font-bold text-white mb-3">{t.news.ctaTitle}</h2>
          <p className="text-white/80 mb-6">{t.news.ctaDesc}</p>
          <a href="mailto:info@autonxt.in?subject=Media Enquiry">
            <Button size="lg" className="bg-white text-primary hover:bg-white/95 font-semibold px-8">
              {t.news.contactPress} <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
