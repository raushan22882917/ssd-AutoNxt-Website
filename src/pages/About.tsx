import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Linkedin, Users, Target, Lightbulb, Award, Leaf, MapPin, Calendar, ChevronRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

// Team photos
const kaustubhImg  = "/images/team/kaustubh.png";
const pankajImg    = "/images/team/pankaj.jpg";
const harikishan   = "/images/team/harikishan.jpg";
const sudiptoImg   = "/images/team/sudipto.jpg";
const vamsiImg     = "/images/team/vamsi.png";
const dharmateja   = "/images/team/dharmateja.jpg";
const tejashImg    = "/images/team/tejash.jpg";
const siddhantImg  = "/images/team/siddhant.jpg";
const saiImg       = "/images/team/sai.jpg";
const ajinkyaImg   = "/images/team/ajinkya.jpg";
const khushpreetImg = "/images/team/khushpreet.jpg";
const shantanuImg  = "/images/team/shantanu.jpg";
const manishImg    = "/images/team/manish.png";
const swapneshImg  = "/images/team/swapnesh.jpg";
const harendar     = "/images/team/harendar.jpg";
const rajinder     = "/images/team/rajinder.jpg";
// Advisor photos
const ivRao        = "/images/team/iv-rao.jpg";
const ashishImg    = "/images/team/ashish.jpg";
const swadeepImg   = "/images/team/swadeep.jpg";

// Facility photos
const facilityGarage = "/images/facility/garage-entry.jpg";
const facilityLeft   = "/images/facility/left-wall.jpg";
const facilityRight  = "/images/facility/right-wall.jpg";
// Event photos used as field strip
const fieldImg1 = "/images/events/event-1.jpg";
const fieldImg2 = "/images/events/event-2.jpg";
const fieldImg3 = "/images/events/event-3.jpg";
const fieldImg4 = "/images/events/event-4.jpg";
const fieldImg5 = "/images/events/event-5.jpg";
const fieldImg6 = "/images/events/event-6.jpg";

const TEAM = [
  { name: "Kaustubh Dhonde", role: "Chief Executive Officer", img: kaustubhImg, bio: "Visionary leader driving AutoNxt's mission to revolutionize agriculture with innovative electric vehicle solutions.", featured: true },
  { name: "Pankaj Goyal", role: "Co-Founder & COO", img: pankajImg, bio: "Operational strategist ensuring seamless execution and growth, overseeing day-to-day operations and partnerships.", featured: true },
  { name: "Hari Kishan", role: "Plant Head", img: harikishan, bio: "Oversees plant operations, ensuring quality and efficiency in every tractor produced." },
  { name: "Sudipto Deb", role: "Lead Power Train Engineer", img: sudiptoImg, bio: "Expert in power electronics, responsible for designing and optimizing the electrical systems powering our tractors." },
  { name: "Vamsi Atluri", role: "Lead Mechanical Design Engineer", img: vamsiImg, bio: "Mechanical design innovator, crafting robust and efficient tractor structures for diverse agricultural needs." },
  { name: "Dr. Dharmateja Adapa", role: "Lead Robotics Engineer", img: dharmateja, bio: "Automation expert focused on integrating smart technologies for seamless and reliable tractor performance." },
  { name: "Tejesh Madireddy", role: "Lead Embedded Engineer", img: tejashImg, bio: "Leads embedded systems development, ensuring reliable and efficient hardware-software integration." },
  { name: "Siddhant Singhal", role: "Lead Software Developer", img: siddhantImg, bio: "Heads software development, building robust and scalable solutions for autonomous tractors." },
  { name: "Aswanth Mulupuri", role: "Robotics & Automation Engineer", img: saiImg, bio: "Specialist in automation, developing advanced control systems for autonomous tractor operation." },
  { name: "Ajinkya Delvi", role: "Power Train Engineer", img: ajinkyaImg, bio: "Works on power train systems, optimizing performance and efficiency." },
  { name: "Khushpreet Singh", role: "Testing & Validation Engineer", img: khushpreetImg, bio: "Responsible for rigorous testing and validation, guaranteeing the reliability and safety of our products." },
  { name: "Avinash Singh", role: "Business Development Manager", img: shantanuImg, bio: "Focused on identifying new opportunities and fostering relationships to accelerate company expansion." },
  { name: "Maneesh Dubey", role: "Business Development Manager", img: manishImg, bio: "Drives business growth by building strategic partnerships and expanding AutoNxt's market presence." },
  { name: "Swapnesh Jahagirdar", role: "Business Development Manager", img: swapneshImg, bio: "Focused on identifying new opportunities and fostering relationships to accelerate company expansion." },
  { name: "Harender Chauhan", role: "Service Manager", img: harendar, bio: "Ensures top-notch service and support for all customers and partners." },
  { name: "Rajinder Parkash Sharma", role: "Plant Manager", img: rajinder, bio: "Oversees manufacturing operations, ensuring quality and efficiency in every tractor produced." },
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
  { step: "01", title: "Define", desc: "Define requirements for the electric self-driving tractors — gathering field insights and engineering constraints." },
  { step: "02", title: "Design", desc: "Create 3D models and schematics, select components such as motor, battery, and sensors, and design the autonomous driving system." },
  { step: "03", title: "Develop", desc: "Build physical components including the chassis, motor, battery, sensors, and autonomous driving system." },
  { step: "04", title: "Test", desc: "Test performance in a variety of conditions — different terrains, weather conditions, and driving scenarios across India." },
  { step: "05", title: "Refine", desc: "Based on test results, adjust components, fine-tune software algorithms, or make changes to the user interface." },
  { step: "06", title: "Manufacture", desc: "Set up the manufacturing process, source components, and develop a distribution network for scale." },
];

const VALUES = [
  { icon: Users, title: "Customer First", desc: "We prioritize our customers' needs and satisfaction above all else.", color: "text-primary", bg: "bg-primary/8", border: "border-primary/20" },
  { icon: Lightbulb, title: "Innovation", desc: "Constantly pushing boundaries in electric vehicle technology.", color: "text-accent", bg: "bg-accent/8", border: "border-accent/20" },
  { icon: Award, title: "Excellence", desc: "Committed to delivering the highest quality products and services.", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  { icon: Leaf, title: "Sustainability", desc: "Dedicated to creating a greener future for agriculture.", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
];

export default function About() {
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
            {/* Left text */}
            <div className="pb-16">
              <motion.div
                className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-4 py-1.5 mb-6"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-xs font-bold uppercase tracking-widest">About AutoNxt</span>
              </motion.div>
              <motion.h1
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.06]"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              >
                {t.about.heroTitle} <span className="text-primary">{t.about.heroHighlight}</span> {t.about.heroTitle2}
              </motion.h1>
              <motion.p
                className="text-white/55 text-lg max-w-lg leading-relaxed mb-10"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
              >
                {t.about.heroDesc}
              </motion.p>
              {/* Quick facts */}
              <motion.div
                className="flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}
              >
                {[
                  { icon: Calendar, label: "Founded", value: "2016" },
                  { icon: MapPin, label: "Headquartered", value: "Thane, MH" },
                  { icon: Users, label: "Team Size", value: "150+" },
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

            {/* Right: Photo collage */}
            <motion.div
              className="relative pb-0 hidden lg:block"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            >
              <div className="grid grid-cols-3 gap-2 h-[420px]">
                <div className="col-span-2 row-span-2 rounded-tl-2xl overflow-hidden">
                  <img src={facilityGarage} alt="AutoNxt Facility" className="w-full h-full object-cover" loading="eager" decoding="async" />
                </div>
                <div className="rounded-tr-2xl overflow-hidden">
                  <img src={fieldImg1} alt="AutoNxt in the field" className="w-full h-full object-cover" loading="eager" decoding="async" />
                </div>
                <div className="overflow-hidden">
                  <img src={fieldImg2} alt="AutoNxt tractor" className="w-full h-full object-cover" loading="eager" decoding="async" />
                </div>
              </div>
              {/* Fade bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface-dark to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VALUES ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: facility image */}
            <motion.div
              className="relative rounded-3xl overflow-hidden"
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <img src={facilityLeft} alt="AutoNxt facility" className="w-full h-80 object-cover" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              {/* Overlay stat */}
              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-xl">
                <p className="text-primary font-black text-2xl font-display">2016</p>
                <p className="text-foreground text-xs font-semibold">Founded in Mumbai</p>
              </div>
              {/* Second image floating */}
              <div className="absolute -bottom-5 -right-4 w-40 h-28 rounded-xl overflow-hidden border-4 border-background shadow-xl">
                <img src={facilityRight} alt="AutoNxt gate" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
            </motion.div>

            {/* Right: Mission + values */}
            <div>
              <motion.div
                className="flex items-center gap-3 mb-4"
                initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              >
                <div className="h-px w-10 bg-primary rounded-full" />
                <p className="text-primary font-bold text-sm uppercase tracking-widest">{t.about.missionTag}</p>
              </motion.div>
              <motion.h2
                className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 }}
              >
                {t.about.missionTitle}
              </motion.h2>
              <motion.p
                className="text-muted-foreground text-lg leading-relaxed mb-8"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              >
                {t.about.missionDesc}
              </motion.p>
              <div className="grid grid-cols-2 gap-4">
                {VALUES.map((v, i) => (
                  <motion.div
                    key={i}
                    className={`bg-card rounded-xl border ${v.border} p-5 hover:shadow-md transition-all`}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  >
                    <div className={`w-9 h-9 rounded-lg ${v.bg} flex items-center justify-center mb-3`}>
                      <v.icon className={`w-4.5 h-4.5 ${v.color} w-[18px] h-[18px]`} />
                    </div>
                    <h3 className="font-bold text-foreground text-sm mb-1">{v.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{v.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FACILITY PHOTO STRIP ── */}
      <section className="py-0 bg-background overflow-hidden">
        <div className="flex gap-3 px-4 md:px-8 pb-16 max-w-screen-xl mx-auto">
          {[fieldImg3, fieldImg4, fieldImg5, fieldImg6].map((img, i) => (
            <motion.div
              key={i}
              className="relative flex-1 rounded-2xl overflow-hidden h-52 min-w-0 group"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
            >
              <img src={img} alt={`AutoNxt operations ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── JOURNEY TIMELINE ── */}
      <section className="py-24 bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(0,72%,40%,0.10),transparent_55%)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-4 py-1.5 mb-5"
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-bold uppercase tracking-widest">Our Journey</span>
            </motion.div>
            <motion.h2 className="font-display text-3xl md:text-4xl font-bold text-white"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              From Concept to Market Leader.
            </motion.h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-px" />
            <div className="space-y-10">
              {JOURNEY.map((item, i) => (
                <motion.div
                  key={i}
                  className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                >
                  <div className="flex-shrink-0 md:w-1/2 md:flex md:justify-center items-start pt-1">
                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center ring-4 ring-surface-dark z-10 flex-shrink-0 shadow-lg shadow-primary/30">
                      <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    </div>
                  </div>
                  <div className={`md:w-1/2 bg-white/[0.04] border border-white/10 rounded-2xl p-6 hover:border-primary/40 hover:bg-white/[0.06] transition-all ${i % 2 === 0 ? "md:pl-8" : "md:pr-8 md:text-right"}`}>
                    <span className="text-primary font-bold text-sm uppercase tracking-widest">{item.year}</span>
                    <h3 className="font-display font-bold text-white text-lg mt-1 mb-2">{item.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">{t.about.teamTag}</p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
            <motion.h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              {t.about.teamTitle}
            </motion.h2>
            <motion.p className="text-muted-foreground" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              {t.about.teamDesc}
            </motion.p>
          </div>

          {/* Featured leaders — large vertical portrait cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-14">
            {TEAM.filter(m => m.featured).map((member, i) => (
              <motion.div
                key={i}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                data-testid={`team-featured-${i}`}
              >
                {/* Portrait photo — tall */}
                <div className="relative h-72 overflow-hidden bg-muted">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover object-[20%] group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  {/* Role badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                      {member.role}
                    </span>
                    <h3 className="font-display font-bold text-white text-xl">{member.name}</h3>
                  </div>
                </div>
                {/* Bio + LinkedIn */}
                <div className="p-5">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{member.bio}</p>
                  <a
                    href="https://www.linkedin.com/company/autonxt-automation"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-[#0A66C2] hover:bg-[#004182] px-4 py-2 rounded-full transition-colors"
                  >
                    <Linkedin className="w-3 h-3" /> Connect on LinkedIn
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Rest of the team */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {TEAM.filter(m => !m.featured).map((member, i) => (
              <motion.div
                key={i}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.06 }}
                data-testid={`team-member-${i}`}
              >
                {/* Square portrait */}
                <div className="relative h-44 bg-muted overflow-hidden">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover object-[20%] group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground text-sm leading-tight mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-primary text-[10px] font-semibold uppercase tracking-widest mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-[11px] leading-relaxed mb-3">{member.bio}</p>
                  <a
                    href="https://www.linkedin.com/company/autonxt-automation"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#0A66C2] border border-[#0A66C2]/30 hover:bg-[#0A66C2] hover:text-white px-2.5 py-1 rounded-full transition-colors"
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
      <section className="py-24 bg-muted/40 border-t border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <motion.div className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">{t.about.advisorsTag}</p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
            <motion.h2 className="font-display text-3xl md:text-4xl font-bold text-foreground"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              {t.about.advisorsTitle}
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {ADVISORS.map((a, i) => (
              <motion.div
                key={i}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                data-testid={`advisor-${i}`}
              >
                {/* Portrait */}
                <div className="relative h-60 bg-muted overflow-hidden">
                  <img src={a.img} alt={a.name} className="w-full h-full object-cover object-[20%] group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block bg-accent/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-1.5">
                      {a.role}
                    </span>
                    <h3 className="font-display font-bold text-white text-lg">{a.name}</h3>
                  </div>
                </div>
                {/* Content */}
                <div className="p-5">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{a.bio}</p>
                  <a
                    href="https://www.linkedin.com/company/autonxt-automation"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-[#0A66C2] hover:bg-[#004182] px-4 py-2 rounded-full transition-colors"
                  >
                    <Linkedin className="w-3 h-3" /> Connect on LinkedIn
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0,72%,30%,0.5),transparent_65%)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <motion.div
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">{t.about.ctaTitle}</h2>
            <p className="text-white/75 text-lg mb-10">{t.about.ctaDesc}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 h-12" data-testid="btn-about-cta">
                  {t.about.bookDemo} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contribution">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold px-8 h-12">
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
