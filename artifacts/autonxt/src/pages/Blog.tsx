import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Calendar, Clock, User, Tag, BookOpen, Users } from "lucide-react";
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
                  { icon: BookOpen, label: "Posts", value: "20+" },
                  { icon: Users, label: "Authors", value: "6" },
                  { icon: Tag, label: "Topics", value: "5" },
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
      <section className="py-16 bg-surface-dark">
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
