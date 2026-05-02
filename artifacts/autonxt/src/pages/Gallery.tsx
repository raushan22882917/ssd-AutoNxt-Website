import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Gallery() {
  const images = [
    { src: "/images/gallery-1.png", alt: "Autonxt Interior", span: "md:col-span-2 md:row-span-2" },
    { src: "/images/gallery-2.png", alt: "Factory Floor", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/gallery-3.png", alt: "Commercial Fleet", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/gallery-4.png", alt: "Public Transit", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/gallery-5.png", alt: "Charging Infrastructure", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/product-ev-platform.png", alt: "Platform Tech", span: "md:col-span-2 md:row-span-1" },
  ];

  return (
    <div className="w-full min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="mb-16">
          <motion.h1 
            className="font-display text-4xl md:text-6xl font-bold mb-6 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Visual <span className="text-primary">Showcase.</span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            A glimpse into our designs, manufacturing, and the technology driving us forward.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] md:auto-rows-[300px] gap-4 md:gap-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className={`relative rounded-xl overflow-hidden border border-border group cursor-zoom-in ${img.span}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-foreground font-medium">{img.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">Want to see it in person?</h3>
          <Link href="/book">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Schedule a Viewing
            </Button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}