import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Zap, Shield, Battery, Gauge } from "lucide-react";
import { Link } from "wouter";

export default function Product() {
  const products = [
    {
      name: "Autonxt One",
      type: "Premium Sedan",
      image: "/images/gallery-1.png",
      description: "The flagship luxury sedan redefining electric performance. Zero compromises, absolute precision.",
      specs: [
        { label: "Range", value: "650 km" },
        { label: "0-100 km/h", value: "3.2s" },
        { label: "Top Speed", value: "250 km/h" },
      ]
    },
    {
      name: "Autonxt X-Series",
      type: "Electric SUV",
      image: "/images/product-autonomous.png",
      description: "Commanding presence meets sustainable power. Built for both the urban jungle and the great outdoors.",
      specs: [
        { label: "Range", value: "580 km" },
        { label: "0-100 km/h", value: "4.5s" },
        { label: "Cargo", value: "850L" },
      ]
    },
    {
      name: "Autonxt Fleet Pro",
      type: "Commercial Van",
      image: "/images/gallery-3.png",
      description: "The workhorse of tomorrow. Maximum utility, minimal downtime, zero emissions.",
      specs: [
        { label: "Payload", value: "2.5 Tons" },
        { label: "Range", value: "400 km" },
        { label: "Charge Time", value: "30 mins" },
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <motion.h1 
            className="font-display text-4xl md:text-6xl font-bold mb-6 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            The <span className="text-primary">Lineup.</span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Discover our range of next-generation electric vehicles and intelligent platforms.
          </motion.p>
        </div>

        {/* Product List */}
        <div className="space-y-32">
          {products.map((product, index) => (
            <motion.div 
              key={index}
              className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden border border-border group">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div>
                  <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">{product.type}</span>
                  <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">{product.name}</h2>
                  <p className="text-lg text-muted-foreground">{product.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-6 py-6 border-y border-border/50">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="text-center lg:text-left">
                      <p className="text-sm text-muted-foreground mb-1">{spec.label}</p>
                      <p className="text-xl font-bold text-foreground">{spec.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Link href="/book">
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Reserve Now
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted">
                    Technical Specs
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Platforms Teaser */}
        <motion.div 
          className="mt-40 bg-card rounded-3xl p-8 md:p-12 border border-border relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-1/2 h-full">
             <img src="/images/product-battery.png" alt="Battery Tech" className="w-full h-full object-cover opacity-20" />
             <div className="absolute inset-0 bg-gradient-to-r from-card to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">Beyond the Vehicle.</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Autonxt isn't just an automaker. We build the foundational technologies powering the future of mobility — from solid-state batteries to AI-driven autonomous systems.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <Battery className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-foreground mb-1">Solid-State Cells</h4>
                  <p className="text-sm text-muted-foreground">Higher energy density with advanced thermal stability.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Gauge className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-foreground mb-1">NXT-Drive Motors</h4>
                  <p className="text-sm text-muted-foreground">Ultra-efficient axial flux electric motors.</p>
                </div>
              </div>
            </div>

            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Explore Tech Stack <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}