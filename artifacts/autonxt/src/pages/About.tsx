import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, MapPin, Linkedin, Twitter } from "lucide-react";
// using lucide-react only — no react-icons needed

const team = [
  {
    name: "Arjun Mehta",
    role: "Co-Founder & CEO",
    bio: "Former Tesla and Ola Electric engineer. Passionate about making EVs accessible to every Indian.",
    location: "Pune, Maharashtra",
    img: "/images/team-ceo.png",
  },
  {
    name: "Priya Sharma",
    role: "Co-Founder & CTO",
    bio: "IIT Bombay graduate. Architect of the NXT-OS software stack and solid-state battery program.",
    location: "Bengaluru, Karnataka",
    img: "/images/team-cto.png",
  },
  {
    name: "Rahul Singh",
    role: "Chief Design Officer",
    bio: "Pininfarina and Tata Motors alumnus. Believes Indian design can lead the world.",
    location: "Mumbai, Maharashtra",
    img: "/images/team-cdo.png",
  },
  {
    name: "Deepika Nair",
    role: "VP of Operations",
    bio: "Supply chain expert with 15 years in automotive manufacturing across India and Germany.",
    location: "Chennai, Tamil Nadu",
    img: "/images/team-vp.png",
  },
];

const values = [
  { title: "Precision First", desc: "Every bolt, line of code, and design decision is deliberate. We build things that last." },
  { title: "Made in India", desc: "100% indigenously designed and manufactured. We believe Indian engineering leads the future." },
  { title: "For Everyone", desc: "From the auto-rickshaw to the luxury sedan, electric mobility is for all of India." },
  { title: "Zero Compromise", desc: "We never trade safety for cost. The highest standards, always." },
];

export default function About() {
  return (
    <div className="w-full min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">

        {/* Hero */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">Our Story</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
              Born in India. <br /><span className="text-primary">Built for the World.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Autonxt was founded in 2019 in Pune with a single conviction: India doesn't need to wait for the West to lead the electric revolution. We can — and we will — build it ourselves.
            </p>
            <p className="text-muted-foreground mb-8">
              From a small R&D team of 12 engineers, we've grown into India's most ambitious electric vehicle and technology company, with manufacturing facilities in three states, over 500 employees, and a mission that drives every single one of them.
            </p>
            <Link href="/book">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Work With Us <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-square rounded-2xl overflow-hidden border border-border"
          >
            <img src="/images/about-hq.png" alt="Autonxt HQ" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-sm font-bold text-primary mb-1">AUTONXT HQ</p>
              <div className="flex items-center text-foreground text-sm gap-1">
                <MapPin className="w-4 h-4" />
                <span>Hinjewadi, Pune — India</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {[
            {
              label: "Our Mission",
              text: "To accelerate India's transition to sustainable mobility by building the most advanced, reliable, and affordable electric vehicles and technology platforms in the world.",
            },
            {
              label: "Our Vision",
              text: "A future where every vehicle on Indian roads is electric, every city breathes clean air, and Indian engineering is synonymous with global innovation.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-card border border-border rounded-2xl p-10 hover:border-primary/40 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-4">{item.label}</span>
              <p className="font-display text-xl md:text-2xl font-semibold text-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-24">
          <motion.h2
            className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What We Stand For
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={i}
                className="bg-card border border-border rounded-2xl p-8 hover:border-primary/40 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="w-8 h-1 bg-primary mb-6 rounded-full" />
                <h3 className="font-display text-lg font-bold text-foreground mb-3">{val.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <motion.h2
            className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Team
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                data-testid={`card-team-${i}`}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-border mb-5 group-hover:border-primary/40 transition-colors">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0d9488&color=fff&size=400`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 flex gap-3">
                      <button className="w-8 h-8 rounded-full bg-background/80 flex items-center justify-center hover:bg-primary transition-colors" data-testid={`btn-linkedin-${i}`}>
                        <Linkedin className="w-4 h-4 text-foreground" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-background/80 flex items-center justify-center hover:bg-primary transition-colors" data-testid={`btn-twitter-${i}`}>
                        <Twitter className="w-4 h-4 text-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{member.bio}</p>
                <div className="flex items-center gap-1 text-muted-foreground text-xs">
                  <MapPin className="w-3 h-3" />
                  <span>{member.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
