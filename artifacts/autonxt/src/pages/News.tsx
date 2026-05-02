import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Calendar, ExternalLink, Tag, FileText, Globe, Award } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const NEWS = [
  {
    date: "March 2024",
    tag: "Product Launch",
    title: "AutoNxt Officially Launches X45H2 in Thane, Maharashtra",
    summary: "AutoNxt Automation Pvt. Ltd. officially launched India's most powerful electric tractor — the X45H2 — at a grand ceremony in Thane. The event was attended by government officials, agricultural scientists, and early adopters.",
    link: "https://www.linkedin.com/company/autonxt-automation",
  },
  {
    date: "March 2024",
    tag: "Milestone",
    title: "First Unit Delivered to Jaywant Sugars Ltd., Karad",
    summary: "AutoNxt delivered the first commercial unit of the X45H2 electric tractor to Jaywant Sugar Mill in Karad, Satara — establishing AutoNxt as India's pioneer in the electric tractor ecosystem for industrial agriculture.",
    link: "https://www.youtube.com/watch?v=kia8cxkaUJc",
  },
  {
    date: "2023",
    tag: "Certification",
    title: "AutoNxt Receives iCAT Certification for X45H2",
    summary: "The X45H2 successfully completed rigorous performance and safety testing at the International Centre for Automotive Technology (iCAT), receiving certification for all three variants — 20 HP, 35 HP, and 45 HP.",
    link: "https://www.linkedin.com/company/autonxt-automation",
  },
  {
    date: "2022",
    tag: "Funding",
    title: "AutoNxt Raises Seed Funding to Scale Manufacturing",
    summary: "AutoNxt secured seed funding to accelerate manufacturing scale-up and expand its R&D capabilities in electric powertrains, autonomous systems, and IoT-based farm management solutions.",
    link: "https://www.linkedin.com/company/autonxt-automation",
  },
  {
    date: "2021",
    tag: "Partnership",
    title: "AutoNxt Partners with BAIF Development Research Foundation",
    summary: "AutoNxt joined hands with BAIF Development Research Foundation to co-develop sustainable electric farming solutions for India's rural agricultural communities, combining technology with deep grassroots field expertise.",
    link: "https://www.linkedin.com/company/autonxt-automation",
  },
  {
    date: "2020",
    tag: "Recognition",
    title: "AutoNxt Recognized by National Innovation Foundation",
    summary: "The National Innovation Foundation (NIA) recognised AutoNxt among India's most promising deep-tech agri-startups, validating the company's approach to sustainable agriculture through electric and autonomous solutions.",
    link: "https://www.linkedin.com/company/autonxt-automation",
  },
];

const FEATURED = NEWS[0];

export default function News() {
  const { t } = useLang();
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
                  { icon: FileText, label: "Stories", value: "50+" },
                  { icon: Globe, label: "Coverage", value: "National" },
                  { icon: Award, label: "Milestones", value: "6 Key" },
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

      {/* Featured Story */}
      <section className="py-14 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-6">{t.news.featured}</p>
          <motion.div
            className="bg-card border border-border rounded-2xl p-8 md:p-10 hover:border-primary/40 hover:shadow-lg transition-all"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <div className="flex flex-wrap gap-3 items-center mb-4">
              <span className="bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">{FEATURED.tag}</span>
              <span className="text-muted-foreground text-sm flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{FEATURED.date}</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">{FEATURED.title}</h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">{FEATURED.summary}</p>
            <a href={FEATURED.link} target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary text-white hover:bg-primary/90">
                Read More <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-8">{t.news.allNews}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NEWS.slice(1).map((item, i) => (
              <motion.div
                key={i}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-md transition-all group"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 2) * 0.07 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5" />{item.tag}
                  </span>
                  <span className="text-muted-foreground text-xs flex items-center gap-1"><Calendar className="w-3 h-3" />{item.date}</span>
                </div>
                <h3 className="font-bold text-foreground text-base leading-snug mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.summary}</p>
                <a href={item.link} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                  Read More <ArrowRight className="w-3 h-3" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-3">{t.news.ctaTitle}</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">{t.news.ctaDesc}</p>
          <a href="mailto:info@autonxt.in">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8">
              {t.news.contactPress} <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
