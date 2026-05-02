import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Linkedin, Users, Target, Lightbulb, Award, Leaf } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

import kaustubhImg from "@assets/Kaustubh_1777738266292.png";
import pankajImg from "@assets/pankaj_1777738266293.jpg";
import harikishan from "@assets/harikishan_1777738266292.jpg";
import sudiptoImg from "@assets/sudipto_1777738266294.jpeg";
import vamsiImg from "@assets/v_1777738266295.png";
import dharmateja from "@assets/dharmateja_1777738266292.jpeg";
import tejashImg from "@assets/tejash_1777738266295.jpeg";
import siddhantImg from "@assets/siddhant_1777738266294.jpg";
import saiImg from "@assets/sai_1777738266293.jpeg";
import ajinkyaImg from "@assets/Ajinkya_Photo_1777738266291.jpg";
import khushpreetImg from "@assets/khushpreet_1777738266292.jpg";
import shantanuImg from "@assets/shantanu_1777738266294.jpeg";
import manishImg from "@assets/manish_1777738266293.png";
import swapneshImg from "@assets/swapnesh_1777738266295.jpeg";
import harendar from "@assets/harendar_1777738266292.jpg";
import rajinder from "@assets/rajinder_1777738266293.jpg";

import ivRao from "@assets/iv-rao_1777738188650.jpeg";
import ashishImg from "@assets/ashish_1777738188649.jpeg";
import swadeepImg from "@assets/swadeep_1777738188650.jpeg";

const TEAM = [
  { name: "Kaustubh Dhonde", role: "Chief Executive Officer", img: kaustubhImg, bio: "Visionary leader driving AutoNxt's mission to revolutionize agriculture with innovative electric vehicle solutions.", featured: true },
  { name: "Pankaj Goyal", role: "Co-Founder & COO", img: pankajImg, bio: "Operational strategist ensuring seamless execution and growth, overseeing day-to-day operations and partnerships.", featured: true },
  { name: "Hari Kishan", role: "Plant Head", img: harikishan, bio: "Oversees plant operations, ensuring quality and efficiency in every tractor produced.", featured: false },
  { name: "Sudipto Deb", role: "Lead Power Train Engineer", img: sudiptoImg, bio: "Expert in power electronics, responsible for designing and optimizing the electrical systems powering our tractors.", featured: false },
  { name: "Vamsi Atluri", role: "Lead Mechanical Design Engineer", img: vamsiImg, bio: "Mechanical design innovator, crafting robust and efficient tractor structures for diverse agricultural needs.", featured: false },
  { name: "Dr. Dharmateja Adapa", role: "Lead Robotics Engineer", img: dharmateja, bio: "Automation expert focused on integrating smart technologies for seamless and reliable tractor performance.", featured: false },
  { name: "Tejesh Madireddy", role: "Lead Embedded Engineer", img: tejashImg, bio: "Leads embedded systems development, ensuring reliable and efficient hardware-software integration.", featured: false },
  { name: "Siddhant Singhal", role: "Lead Software Developer", img: siddhantImg, bio: "Heads software development, building robust and scalable solutions for autonomous tractors.", featured: false },
  { name: "Aswanth Mulupuri", role: "Robotics & Automation Engineer", img: saiImg, bio: "Specialist in automation, developing advanced control systems for autonomous tractor operation.", featured: false },
  { name: "Ajinkya Delvi", role: "Power Train Engineer", img: ajinkyaImg, bio: "Works on power train systems, optimizing performance and efficiency.", featured: false },
  { name: "Khushpreet Singh", role: "Testing & Validation Engineer", img: khushpreetImg, bio: "Responsible for rigorous testing and validation, guaranteeing the reliability and safety of our products.", featured: false },
  { name: "Avinash Singh", role: "Business Development Manager", img: shantanuImg, bio: "Focused on identifying new opportunities and fostering relationships to accelerate company expansion.", featured: false },
  { name: "Maneesh Dubey", role: "Business Development Manager", img: manishImg, bio: "Drives business growth by building strategic partnerships and expanding AutoNxt's market presence.", featured: false },
  { name: "Swapnesh Jahagirdar", role: "Business Development Manager", img: swapneshImg, bio: "Focused on identifying new opportunities and fostering relationships to accelerate company expansion.", featured: false },
  { name: "Harender Chauhan", role: "Service Manager", img: harendar, bio: "Ensures top-notch service and support for all customers and partners.", featured: false },
  { name: "Rajinder Parkash Sharma", role: "Plant Manager", img: rajinder, bio: "Oversees manufacturing operations, ensuring quality and efficiency in every tractor produced.", featured: false },
];

const ADVISORS = [
  { name: "IV-Rao", role: "Senior Advisor", img: ivRao, bio: "Together, we challenge ourselves for a better tomorrow through meaningful designs and lasting relevance." },
  { name: "Ashish Mehta", role: "Financial Advisor", img: ashishImg, bio: "Contemporary design and well-made products are things that everyone should benefit from — driving what we do." },
  { name: "Swadeep Pillarisetti", role: "Strategy Consultant", img: swadeepImg, bio: "Our collection is ever-evolving yet consistently relatable. Our purpose is to inspire and help showcase the look you want." },
];

const JOURNEY = [
  { year: "2016", title: "Foundation", desc: "AutoNxt Automation Pvt. Ltd. was founded by Kaustubh Dhonde in Mumbai with a vision to revolutionize agriculture and industrial operations through electric and autonomous tractors." },
  { year: "2018–19", title: "Research & Early Prototypes", desc: "Extensive R&D on high-torque electric powertrains and intelligent control systems. AutoNxt successfully built and tested early prototypes, proving the feasibility of replacing diesel with electric technology." },
  { year: "2020–21", title: "Innovation & Development", desc: "Enhanced prototypes with smarter vehicle control units and IoT-based monitoring. Expanded the engineering team and strengthened partnerships for component development and testing." },
  { year: "2022–23", title: "Validation & Certification", desc: "Electric tractors underwent rigorous performance and safety testing. Received certifications from iCAT (International Centre for Automotive Technology), finalizing 20 HP, 35 HP, and 45 HP variants." },
  { year: "2024", title: "Commercial Launch", desc: "AutoNxt officially launched the X45H2 in Thane, Maharashtra. First unit delivered to Jaywant Sugars Ltd. — establishing AutoNxt as India's pioneer in the electric tractor ecosystem." },
  { year: "2025+", title: "Growth & Expansion", desc: "Expanding production capabilities and customer base across agricultural and industrial sectors. Advancing autonomous driving, smart connectivity, and next-generation battery systems." },
];

const PROCESS = [
  { step: "01", title: "Define", desc: "Define the requirements for the electric self-driving tractors or any product we plan to develop — gathering field insights and engineering constraints." },
  { step: "02", title: "Design", desc: "Create 3D models and schematics, select components such as motor, battery, and sensors, and design the autonomous driving system." },
  { step: "03", title: "Develop", desc: "Build physical components including the chassis, motor, battery, sensors, and autonomous driving system." },
  { step: "04", title: "Test", desc: "Test performance in a variety of conditions — different terrains, weather conditions, and driving scenarios across India." },
  { step: "05", title: "Refine", desc: "Based on test results, adjust components, fine-tune software algorithms, or make changes to the user interface." },
  { step: "06", title: "Manufacture", desc: "Set up the manufacturing process, source components, and develop a distribution network for scale." },
];

export default function About() {
  const { t } = useLang();
  return (
    <div className="w-full min-h-screen pt-20 pb-0 bg-background">

      {/* ── HERO ── */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <motion.p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {t.about.tag}
          </motion.p>
          <motion.h1
            className="font-display text-4xl md:text-6xl font-bold text-foreground mb-8 leading-tight"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          >
            {t.about.heroTitle} <span className="text-primary">{t.about.heroHighlight}</span> {t.about.heroTitle2}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          >
            {t.about.heroDesc}
          </motion.p>
        </div>
      </section>

      {/* ── MISSION & VALUES ── */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">{t.about.missionTag}</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t.about.missionTitle}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t.about.missionDesc}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: Users, title: "Customer First", desc: "We prioritize our customers' needs and satisfaction above all else.", color: "text-primary", bg: "bg-primary/8" },
                { icon: Lightbulb, title: "Innovation", desc: "Constantly pushing boundaries in electric vehicle technology.", color: "text-accent", bg: "bg-accent/8" },
                { icon: Award, title: "Excellence", desc: "Committed to delivering the highest quality products and services.", color: "text-amber-600", bg: "bg-amber-50" },
                { icon: Leaf, title: "Sustainability", desc: "Dedicated to creating a greener future for agriculture.", color: "text-green-600", bg: "bg-green-50" },
              ].map((v, i) => (
                <motion.div
                  key={i}
                  className="bg-card rounded-xl border border-border p-6 hover:border-primary/30 hover:shadow-sm transition-all"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                >
                  <div className={`w-10 h-10 rounded-lg ${v.bg} flex items-center justify-center mb-4`}>
                    <v.icon className={`w-5 h-5 ${v.color}`} />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ENGINEERING PROCESS ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{t.about.processTag}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t.about.processTitle}
            </h2>
            <p className="text-muted-foreground mt-4">We follow a rigorous process to ensure every AutoNxt tractor meets the highest standards of quality and performance.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS.map((p, i) => (
              <motion.div
                key={i}
                className="relative bg-card border border-border rounded-2xl p-7 hover:border-primary/40 hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              >
                <span className="font-display text-5xl font-black text-primary/10 select-none absolute top-4 right-5">{p.step}</span>
                <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">{p.step}</span>
                <h3 className="font-bold text-lg text-foreground mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOURNEY TIMELINE ── */}
      <section className="py-20 bg-foreground">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Our Journey</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">From Concept to Market Leader.</h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-px" />
            <div className="space-y-10">
              {JOURNEY.map((item, i) => (
                <motion.div
                  key={i}
                  className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                >
                  <div className="flex-shrink-0 md:w-1/2 md:flex md:justify-center items-start pt-1">
                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center ring-4 ring-foreground z-10 flex-shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    </div>
                  </div>
                  <div className={`md:w-1/2 bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/40 transition-colors ${i % 2 === 0 ? "md:pl-8" : "md:pr-8 md:text-right"}`}>
                    <span className="text-primary font-bold text-sm uppercase tracking-widest">{item.year}</span>
                    <h3 className="font-display font-bold text-white text-lg mt-1 mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{t.about.teamTag}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t.about.teamTitle}
            </h2>
            <p className="text-muted-foreground mt-4">{t.about.teamDesc}</p>
          </div>

          {/* Featured leaders — horizontal card with big circular portrait */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
            {TEAM.filter(m => m.featured).map((member, i) => (
              <motion.div
                key={i}
                className="flex gap-5 items-start bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                data-testid={`team-featured-${i}`}
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 ring-2 ring-offset-2 ring-primary/10">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top" />
                  </div>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{member.role}</span>
                  <h3 className="font-display font-bold text-foreground text-base mt-0.5 mb-1">{member.name}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-3">{member.bio}</p>
                  <a
                    href="https://www.linkedin.com/company/autonxt-automation"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#0A66C2] hover:bg-[#004182] px-3 py-1.5 rounded-full transition-colors"
                  >
                    <Linkedin className="w-3 h-3" /> LinkedIn
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Rest of the team — uniform cards with circular portrait */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {TEAM.filter(m => !m.featured).map((member, i) => (
              <motion.div
                key={i}
                className="bg-card border border-border rounded-2xl p-5 flex flex-col items-center text-center hover:border-primary/40 hover:shadow-md transition-all group"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.07 }}
                data-testid={`team-member-${i}`}
              >
                {/* Circular portrait — always shows the face regardless of photo shape */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-border group-hover:border-primary/40 transition-colors mb-4 flex-shrink-0">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="font-bold text-foreground text-sm leading-tight mb-1">{member.name}</h3>
                  <p className="text-muted-foreground text-[11px] leading-snug mb-3 flex-1">{member.role}</p>
                  <a
                    href="https://www.linkedin.com/company/autonxt-automation"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1 text-[10px] font-semibold text-[#0A66C2] border border-[#0A66C2]/30 hover:bg-[#0A66C2] hover:text-white px-3 py-1 rounded-full transition-colors"
                  >
                    <Linkedin className="w-2.5 h-2.5" /> {t.about.connect}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADVISORS ── */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{t.about.advisorsTag}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t.about.advisorsTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {ADVISORS.map((a, i) => (
              <motion.div
                key={i}
                className="bg-card border border-border rounded-2xl p-7 flex flex-col items-center text-center hover:border-primary/40 hover:shadow-md transition-all group"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                data-testid={`advisor-${i}`}
              >
                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-border group-hover:border-primary/40 transition-colors mb-5">
                  <img src={a.img} alt={a.name} className="w-full h-full object-cover object-center" />
                </div>
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{a.role}</p>
                <h3 className="font-display font-bold text-foreground text-base mb-3">{a.name}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-5 flex-1">{a.bio}</p>
                <a
                  href="https://www.linkedin.com/company/autonxt-automation"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#0A66C2] hover:bg-[#004182] px-4 py-1.5 rounded-full transition-colors"
                >
                  <Linkedin className="w-3 h-3" /> Connect on LinkedIn
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              {t.about.ctaTitle}
            </h2>
            <p className="text-white/80 mb-8">{t.about.ctaDesc}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8" data-testid="btn-about-cta">
                  {t.about.bookDemo} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contribution">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold px-8">
                  {t.about.ourImpact}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
