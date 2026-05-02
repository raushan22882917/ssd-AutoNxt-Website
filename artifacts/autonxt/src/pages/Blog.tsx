import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Calendar, Clock, User, Tag } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const POSTS = [
  {
    tag: "Sustainability",
    title: "How India's Farmers Are Leading the Electric Revolution",
    author: "Kaustubh Dhonde",
    date: "April 2025",
    readTime: "6 min read",
    summary: "India has over 140 million farming households. If even 10% switch to electric tractors over the next decade, the carbon savings would be equivalent to removing millions of cars from Indian roads. Here's why the shift is already happening.",
    color: "bg-green-50 text-green-700",
  },
  {
    tag: "Technology",
    title: "From Diesel to Electric: What the Transition Looks Like on a Real Farm",
    author: "Pankaj Goyal",
    date: "March 2025",
    readTime: "8 min read",
    summary: "Raju Patil farms 12 acres in Nashik. Last season was his first full season with the AutoNxt X45H2. We followed him from sowing to harvest to understand what the shift from diesel really means on the ground — in cost, in effort, and in confidence.",
    color: "bg-blue-50 text-blue-700",
  },
  {
    tag: "Engineering",
    title: "Why We Chose Lithium Iron Phosphate (LFP) Over NMC for the X45H2",
    author: "Sudipto Deb",
    date: "February 2025",
    readTime: "5 min read",
    summary: "Battery chemistry is the heart of any electric vehicle. When designing the X45H2, we faced a critical choice between NMC and LFP. This post explains why LFP was the right choice for Indian farming conditions — and what it means for safety, longevity, and cost.",
    color: "bg-orange-50 text-orange-700",
  },
  {
    tag: "Policy",
    title: "FAME-III and What It Means for Electric Tractors in India",
    author: "Avinash Singh",
    date: "January 2025",
    readTime: "7 min read",
    summary: "The Government of India's FAME-III scheme is set to expand incentives to electric agricultural equipment. We break down what the policy means, how farmers can benefit, and how AutoNxt is working with policymakers to accelerate adoption.",
    color: "bg-purple-50 text-purple-700",
  },
  {
    tag: "Agri-Tech",
    title: "Precision Farming Meets Electric Power: AutoNxt's Vision for Smart Agriculture",
    author: "Dr. Dharmateja Adapa",
    date: "December 2024",
    readTime: "9 min read",
    summary: "The future of Indian agriculture is not just electric — it's autonomous. Integrating GPS-guided operations, IoT sensors, and AI-driven crop management with the X45H2 platform opens up possibilities that diesel machines could never deliver.",
    color: "bg-teal-50 text-teal-700",
  },
  {
    tag: "Business",
    title: "The Total Cost of Ownership: Electric vs Diesel Tractor Over 5 Years",
    author: "Maneesh Dubey",
    date: "November 2024",
    readTime: "6 min read",
    summary: "Farmers ask us one question more than any other: 'Is it worth the higher upfront cost?' We ran the full numbers on 5-year TCO across fuel, maintenance, servicing, and productivity — the results speak for themselves.",
    color: "bg-red-50 text-red-700",
  },
];

export default function Blog() {
  const { t } = useLang();
  const [featured, ...rest] = POSTS;

  return (
    <div className="w-full min-h-screen pt-20 pb-0 bg-background">

      {/* Header */}
      <section className="py-16 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <motion.p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {t.blog.tag}
          </motion.p>
          <motion.h1
            className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          >
            {t.blog.title} <span className="text-primary">{t.blog.titleHighlight}</span>
          </motion.h1>
          <motion.p className="text-lg text-muted-foreground max-w-2xl" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            {t.blog.desc}
          </motion.p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-14 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-6">{t.blog.featured}</p>
          <motion.div
            className="bg-card border border-border rounded-2xl p-8 md:p-10 hover:border-primary/40 hover:shadow-lg transition-all group"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <div className="flex flex-wrap gap-3 items-center mb-5">
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${featured.color}`}>{featured.tag}</span>
              <span className="text-muted-foreground text-sm flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{featured.date}</span>
              <span className="text-muted-foreground text-sm flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
              <span className="text-muted-foreground text-sm flex items-center gap-1"><User className="w-3.5 h-3.5" />{featured.author}</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{featured.title}</h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">{featured.summary}</p>
            <Button className="bg-primary text-white hover:bg-primary/90">
              {t.blog.readFull} <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-8">{t.blog.allPosts}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <motion.div
                key={i}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-md transition-all group flex flex-col"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.07 }}
              >
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full w-fit mb-4 ${post.color}`}>{post.tag}</span>
                <h3 className="font-bold text-foreground text-sm leading-snug mb-2 group-hover:text-primary transition-colors flex-1">{post.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-3">{post.summary}</p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
                  <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
                    <User className="w-3 h-3" />{post.author}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-[11px]">
                    <Clock className="w-3 h-3" />{post.readTime}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-foreground">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-3">{t.blog.writeFor}</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">{t.blog.writeDesc}</p>
          <a href="mailto:info@autonxt.in">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold px-8">
              {t.common.getInTouch} <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
