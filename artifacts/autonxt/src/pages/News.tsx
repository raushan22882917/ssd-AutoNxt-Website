import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Calendar, ExternalLink, Tag } from "lucide-react";

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
  return (
    <div className="w-full min-h-screen pt-20 pb-0 bg-background">

      {/* Header */}
      <section className="py-16 bg-white border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <motion.p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            News & Press
          </motion.p>
          <motion.h1
            className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          >
            AutoNxt in the <span className="text-primary">Headlines.</span>
          </motion.h1>
          <motion.p className="text-lg text-muted-foreground max-w-2xl" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Stay up to date with the latest news, announcements, and media coverage from AutoNxt Automation.
          </motion.p>
        </div>
      </section>

      {/* Featured Story */}
      <section className="py-14 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-6">Featured Story</p>
          <motion.div
            className="bg-white border border-border rounded-2xl p-8 md:p-10 hover:border-primary/40 hover:shadow-lg transition-all"
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
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-8">All News</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NEWS.slice(1).map((item, i) => (
              <motion.div
                key={i}
                className="bg-white border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-md transition-all group"
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
          <h2 className="font-display text-3xl font-bold text-white mb-3">Media Enquiries</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">For press kits, interviews, and partnership announcements, reach out to the AutoNxt communications team.</p>
          <a href="mailto:info@autonxt.in">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8">
              Contact Press Team <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
