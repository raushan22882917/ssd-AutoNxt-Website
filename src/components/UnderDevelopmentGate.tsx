import { motion } from "framer-motion";

const logoImg = "/small-logo-black-sm.webp";

export default function UnderDevelopmentGate() {
  return (
    <div className="fixed inset-0 z-[10000] flex min-h-screen flex-col items-center justify-center bg-background px-6 text-foreground">
      <div className="absolute h-64 w-64 rounded-full bg-primary/8 blur-3xl pointer-events-none" />

      <motion.img
        src={logoImg}
        alt="AutoNxt"
        className="relative mb-8 h-16 w-16 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.12)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      <motion.h1
        className="relative text-center text-2xl font-semibold tracking-tight sm:text-3xl"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Under Development
      </motion.h1>

      <motion.p
        className="relative mt-3 max-w-sm text-center text-sm text-muted-foreground sm:text-base"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        We&apos;re building something new. Please check back soon.
      </motion.p>
    </div>
  );
}
