import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { OptimizedImg } from "@/components/ui/optimized-img"
import { Link } from "wouter"
import {
  ArrowRight, Linkedin, Users, Lightbulb, Award,
  Leaf, MapPin, Calendar,
} from "lucide-react"
import { useLang } from "@/contexts/LanguageContext"
import SEO from "@/components/SEO"


// Team
const kaustubhImg   = "/images/team/kaustubh.webp"
const pankajImg     = "/images/team/pankaj.webp"
const harikishan    = "/images/team/harikishan.webp"
const sudiptoImg    = "/images/team/sudipto.webp"
const vamsiImg      = "/images/team/vamsi.webp"
const dharmateja    = "/images/team/dharmateja.webp"
const tejashImg     = "/images/team/tejash.webp"
const siddhantImg   = "/images/team/siddhant.webp"
const saiImg        = "/images/team/sai.webp"
const ajinkyaImg    = "/images/team/ajinkya.webp"
const khushpreetImg = "/images/team/khushpreet.webp"
const shantanuImg   = "/images/team/shantanu.webp"
const manishImg     = "/images/team/manish.webp"
const swapneshImg   = "/images/team/swapnesh.webp"
const harendar      = "/images/team/harendar.webp"
const rajinder      = "/images/team/rajinder.webp"

// Advisors
const ivRao      = "/images/team/iv-rao.webp"
const ashishImg  = "/images/team/ashish.webp"
const swadeepImg = "/images/team/swadeep.webp"

// Facility — garage-entry is the LCP image (6.7 MB → ~120 KB WebP)
const facilityGarage = "/images/facility/garage-entry.webp"
const facilityLeft   = "/images/facility/left-wall.webp"
const facilityRight  = "/images/facility/right-wall.webp"

// Events
const fieldImg1 = "/images/events/event-1.webp"
const fieldImg2 = "/images/events/event-2.webp"
const fieldImg3 = "/images/events/AutoNxt-Launch-3.webp"
const fieldImg4 = "/images/events/event-launch-2023.webp"
const fieldImg5 = "/images/events/event-5.webp"
const fieldImg6 = "/images/events/event-6.webp"
const fieldImg7 = "/images/events/event-7.webp"

export default function About() {
  const { t } = useLang()

  const teamFromT = t.aboutPage.team
  const TEAM = [
    { name: teamFromT[0].name,  role: teamFromT[0].role,  img: kaustubhImg,   bio: teamFromT[0].bio,  featured: true,  objectPosition: "top"     },
    { name: teamFromT[1].name,  role: teamFromT[1].role,  img: pankajImg,     bio: teamFromT[1].bio,  featured: true,  objectPosition: "top"     },
    { name: teamFromT[2].name,  role: teamFromT[2].role,  img: harikishan,    bio: teamFromT[2].bio,  objectPosition: "top"                       },
    { name: teamFromT[3].name,  role: teamFromT[3].role,  img: sudiptoImg,    bio: teamFromT[3].bio,  objectPosition: "top"                       },
    { name: teamFromT[4].name,  role: teamFromT[4].role,  img: vamsiImg,      bio: teamFromT[4].bio,  objectPosition: "30% 30%"                   },
    { name: teamFromT[5].name,  role: teamFromT[5].role,  img: dharmateja,    bio: teamFromT[5].bio,  objectPosition: "top"                       },
    { name: teamFromT[6].name,  role: teamFromT[6].role,  img: tejashImg,     bio: teamFromT[6].bio,  objectPosition: "30% 70%"                   },
    { name: teamFromT[7].name,  role: teamFromT[7].role,  img: siddhantImg,   bio: teamFromT[7].bio,  objectPosition: "top"                       },
    { name: teamFromT[8].name,  role: teamFromT[8].role,  img: saiImg,        bio: teamFromT[8].bio,  objectPosition: "top"                       },
    { name: teamFromT[9].name,  role: teamFromT[9].role,  img: ajinkyaImg,    bio: teamFromT[9].bio,  objectPosition: "top"                       },
    { name: teamFromT[10].name, role: teamFromT[10].role, img: khushpreetImg, bio: teamFromT[10].bio, objectPosition: "top"                       },
    { name: teamFromT[11].name, role: teamFromT[11].role, img: manishImg,     bio: teamFromT[11].bio, objectPosition: "top"                       },
    { name: teamFromT[12].name, role: teamFromT[12].role, img: swapneshImg,   bio: teamFromT[12].bio, objectPosition: "100% 20%"                  },
    { name: teamFromT[13].name, role: teamFromT[13].role, img: harendar,      bio: teamFromT[13].bio, objectPosition: "top"                       },
    { name: teamFromT[14].name, role: teamFromT[14].role, img: rajinder,      bio: teamFromT[14].bio, objectPosition: "top"                       },
  ]

  const advisorsFromT = t.aboutPage.advisors
  const ADVISORS = [
    { name: advisorsFromT[0].name, role: advisorsFromT[0].role, img: ivRao,      bio: advisorsFromT[0].bio, objectPosition: "top" },
    { name: advisorsFromT[1].name, role: advisorsFromT[1].role, img: ashishImg,  bio: advisorsFromT[1].bio, objectPosition: "top" },
    { name: advisorsFromT[2].name, role: advisorsFromT[2].role, img: swadeepImg, bio: advisorsFromT[2].bio, objectPosition: "top" },
  ]

  const journeyFromT = t.aboutPage.journey
  const JOURNEY = [
    { year: "2016",    title: journeyFromT[0].title, desc: journeyFromT[0].desc },
    { year: "2018–19", title: journeyFromT[1].title, desc: journeyFromT[1].desc },
    { year: "2020–21", title: journeyFromT[2].title, desc: journeyFromT[2].desc },
    { year: "2022–23", title: journeyFromT[3].title, desc: journeyFromT[3].desc },
    { year: "2024",    title: journeyFromT[4].title, desc: journeyFromT[4].desc },
    { year: "2025+",   title: journeyFromT[5].title, desc: journeyFromT[5].desc },
  ]

  const PROCESS = t.aboutPage.process

  const valueIcons   = [Users, Lightbulb, Award, Leaf]
  const valueColors  = ["text-primary", "text-accent", "text-amber-600", "text-emerald-600"]
  const valueBgs     = ["bg-primary/8",  "bg-accent/8",  "bg-amber-50",   "bg-emerald-50"]
  const valueBorders = ["border-primary/20", "border-accent/20", "border-amber-200", "border-emerald-200"]
  const VALUES = t.aboutPage.values.map((v, i) => ({
    title:  v.title,
    desc:   v.desc,
    icon:   valueIcons[i],
    color:  valueColors[i],
    bg:     valueBgs[i],
    border: valueBorders[i],
  }))

  return (
    <div className="w-full min-h-screen bg-background">
      <SEO title={t.nav.about} description="Learn more about AutoNxt Automation, our mission, vision, and the founders pioneering electric mobility in India." />

      {/* ── HERO ── */}
      <section className="bg-surface-dark relative overflow-hidden pt-24 pb-0 lg:h-[93.75vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,hsl(0,72%,40%,0.12),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,hsl(214,65%,32%,0.09),transparent_50%)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(hsl(0,0%,100%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,0%,100%) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

            {/* Left: text */}
            <div className="h-full flex flex-col justify-between">
              <div>
                <motion.div
                  className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-4 py-1.5 mb-6"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary text-xs font-bold uppercase tracking-widest">{t.aboutPage.aboutAutoNxt}</span>
                </motion.div>

                <motion.h1
                  className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.06]"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
                >
                  {t.about.heroTitle}{" "}
                  <span className="text-primary">{t.about.heroHighlight}</span>{" "}
                  {t.about.heroTitle2}
                </motion.h1>

                <motion.p
                  className="text-white/55 text-lg max-w-lg leading-relaxed mb-10"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
                >
                  {t.about.heroDesc}
                </motion.p>
              </div>

              {/* Quick facts */}
              <motion.div
                className="flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}
              >
                {[
                  { icon: Calendar, label: t.aboutPage.foundedLabel,       value: "2016"      },
                  { icon: MapPin,   label: t.aboutPage.headquarteredLabel,  value: "Thane, MH" },
                  { icon: Users,    label: t.aboutPage.teamSizeLabel,       value: "150+"      },
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
              className="relative pb-0 hidden lg:block h-full"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            >
              <div className="grid grid-cols-3 grid-rows-2 gap-2 h-full">
                
                {/* LCP image — eager + high priority + sync decode */}
                <div className="col-span-2 row-span-2 rounded-tl-2xl overflow-hidden">
                  <OptimizedImg
                    src={facilityGarage}
                    alt="AutoNxt Facility"
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="sync"
                    fetchpriority="high"
                  />
                </div>
                {/* Secondary collage images — lazy + low priority */}
                <div className="rounded-tr-2xl overflow-hidden">
                  <OptimizedImg
                    src={fieldImg1}
                    alt="AutoNxt in the field"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    fetchpriority="low"
                  />
                </div>
                <div className="overflow-hidden">
                  <OptimizedImg
                    src={fieldImg2}
                    alt="AutoNxt tractor"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    fetchpriority="low"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface-dark to-transparent pointer-events-none" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── MISSION & VALUES ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">

          {/* Centered Mission Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-4 py-1.5 mb-5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-bold uppercase tracking-widest">{t.about.missionTag}</span>
            </motion.div>
            <motion.h2
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 }}
            >
              {t.about.missionTitle}
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-base md:text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t.about.missionDesc}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-stretch">

            {/* Left: Large facility image */}
            <div className="lg:col-span-3 h-full">
              <motion.div
                className="relative rounded-3xl overflow-hidden h-full min-h-[350px] md:min-h-[450px] lg:min-h-[480px]"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <OptimizedImg
                  src={facilityLeft}
                  alt="AutoNxt facility"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                
                {/* 2016 Founding Badge */}
                <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-xl">
                  <p className="text-primary font-black text-2xl font-display">2016</p>
                  <p className="text-foreground text-xs font-semibold">{t.aboutPage.foundedInMumbai}</p>
                </div>

                {/* Floating secondary image */}
                <div className="absolute -bottom-5 -right-4 w-40 h-28 rounded-xl overflow-hidden border-4 border-background shadow-xl">
                  <OptimizedImg
                    src={facilityRight}
                    alt="AutoNxt gate"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </motion.div>
            </div>

            {/* Right: Four value cards (2x2 grid) */}
            <div className="lg:col-span-2 h-full">
              <div className="grid grid-cols-2 gap-4 lg:grid-rows-2 lg:h-full">
                {VALUES.map((v, i) => (
                  <motion.div
                    key={i}
                    className={`bg-card rounded-xl border ${v.border} p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <div className={`w-9 h-9 rounded-lg ${v.bg} flex items-center justify-center mb-3`}>
                      <v.icon className={`w-[18px] h-[18px] ${v.color}`} />
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

      {/* ── FIELD PHOTO STRIP ── */}
      <section className="py-0 bg-background overflow-hidden">
        <div className="flex gap-3 px-4 md:px-8 pb-16 max-w-screen-xl mx-auto overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          {[fieldImg2, fieldImg5, fieldImg7, fieldImg1].map((img, i) => (
            <motion.div
              key={i}
              className="relative flex-shrink-0 w-[75vw] sm:flex-1 sm:w-auto rounded-2xl overflow-hidden h-52 snap-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <OptimizedImg
                src={img}
                alt={`AutoNxt operations ${i + 3}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
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
            <motion.div
              className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-4 py-1.5 mb-5"
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-bold uppercase tracking-widest">{t.aboutPage.ourJourney}</span>
            </motion.div>
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-white"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              {t.aboutPage.fromConcept}
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

      {/* ── ENGINEERING PROCESS ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            >
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">{t.about.processTag}</p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-foreground"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              {t.about.processTitle}
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS.map((p, i) => (
              <motion.div
                key={i}
                className="bg-card border border-border rounded-2xl p-7 hover:border-primary/30 hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              >
                <div className="font-display text-3xl font-black text-primary/20 mb-3">{p.step}</div>
                <h3 className="font-bold text-foreground text-base mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            >
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">{t.about.teamTag}</p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              {t.about.teamTitle}
            </motion.h2>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            >
              {t.about.teamDesc}
            </motion.p>
          </div>

          {/* Featured leaders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-14">
            {TEAM.filter(m => m.featured).map((member, i) => (
              <motion.div
                key={i}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.3 }}
                data-testid={`team-featured-${i}`}
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-muted">
                  <OptimizedImg
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: member.objectPosition ?? "top center" }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                      {member.role}
                    </span>
                    <h3 className="font-display font-bold text-white text-xl">{member.name}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{member.bio}</p>
                  <a
                    href="https://www.linkedin.com/company/autonxt-automation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-[#0A66C2] hover:bg-[#004182] px-4 py-2 rounded-full transition-colors"
                  >
                    <Linkedin className="w-3 h-3" /> {t.aboutPage.connectLinkedIn}
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
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300 will-change-transform"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.06 }}
                data-testid={`team-member-${i}`}
              >
                <div className="relative w-full aspect-square overflow-hidden bg-muted">
                  <OptimizedImg
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: member.objectPosition ?? "top center" }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground text-sm leading-tight mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-primary text-[10px] font-semibold uppercase tracking-widest mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-[11px] leading-relaxed mb-3">{member.bio}</p>
                  <a
                    href="https://www.linkedin.com/company/autonxt-automation"
                    target="_blank"
                    rel="noopener noreferrer"
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
            <motion.div
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            >
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">{t.about.advisorsTag}</p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-foreground"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              {t.about.advisorsTitle}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {ADVISORS.map((a, i) => (
              <motion.div
                key={i}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-testid={`advisor-${i}`}
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-muted">
                  <OptimizedImg
                    src={a.img}
                    alt={a.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: a.objectPosition ?? "top center" }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block bg-accent/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-1.5">
                      {a.role}
                    </span>
                    <h3 className="font-display font-bold text-white text-lg">{a.name}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{a.bio}</p>
                  <a
                    href="https://www.linkedin.com/company/autonxt-automation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-[#0A66C2] hover:bg-[#004182] px-4 py-2 rounded-full transition-colors"
                  >
                    <Linkedin className="w-3 h-3" /> {t.aboutPage.connectLinkedIn}
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
              <Button asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 h-12"
              >
                <Link href="/book" data-testid="btn-about-cta">
                  {t.about.bookDemo} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 font-semibold px-8 h-12"
              >
                <Link href="/contribution">
                  {t.about.ourImpact}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
