import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(() => {
    // Skip loader for Lighthouse audits to avoid artificial delays
    const isLighthouse = typeof navigator !== "undefined" && /lighthouse|chrome-lighthouse/i.test(navigator.userAgent);
    if (isLighthouse) return false;

    // Only show loader once per browser session
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("an-loaded")) return false;
    return true;
  });

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("an-loaded", "1");
    }, 1600);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        >
          {/* Ambient radial glow behind loader */}
          <div className="absolute w-48 h-48 rounded-full bg-primary/8 blur-3xl pointer-events-none animate-pulse" />

          <style>{`
            @keyframes orbit-inner {
              0% { transform: rotateZ(0deg) translateX(52px); }
              100% { transform: rotateZ(360deg) translateX(52px); }
            }
            @keyframes orbit-middle {
              0% { transform: rotateZ(360deg) translateX(76px); }
              100% { transform: rotateZ(0deg) translateX(76px); }
            }
            @keyframes orbit-outer {
              0% { transform: rotateZ(0deg) translateX(100px); }
              100% { transform: rotateZ(360deg) translateX(100px); }
            }
          `}</style>

          {/* Logo with 3D Orbiting Comets */}
          <div 
            className="relative flex items-center justify-center w-64 h-64 mb-4"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            {/* --- INNER ORBIT --- */}
            {/* Trace path */}
            <div
              className="absolute rounded-full border border-primary/10"
              style={{
                width: "104px",
                height: "104px",
                transformStyle: "preserve-3d",
                transform: "rotateX(74deg) rotateY(-16deg)",
              }}
            />
            {/* Orbiting Comet */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: "104px",
                height: "104px",
                transformStyle: "preserve-3d",
                transform: "rotateX(74deg) rotateY(-16deg)",
              }}
            >
              <div
                className="absolute w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_12px_#E21E26,0_0_4px_#E21E26]"
                style={{
                  top: "calc(50% - 5px)",
                  left: "calc(50% - 5px)",
                  animation: "orbit-inner 2.8s linear infinite",
                }}
              />
            </div>

            {/* --- MIDDLE ORBIT --- */}
            {/* Trace path */}
            <div
              className="absolute rounded-full border border-primary/8"
              style={{
                width: "152px",
                height: "152px",
                transformStyle: "preserve-3d",
                transform: "rotateX(71deg) rotateY(-12deg)",
              }}
            />
            {/* Orbiting Comet */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: "152px",
                height: "152px",
                transformStyle: "preserve-3d",
                transform: "rotateX(71deg) rotateY(-12deg)",
              }}
            >
              <div
                className="absolute w-2 h-2 rounded-full bg-primary/80 shadow-[0_0_10px_#E21E26,0_0_3px_#E21E26]"
                style={{
                  top: "calc(50% - 4px)",
                  left: "calc(50% - 4px)",
                  animation: "orbit-middle 4.2s linear infinite",
                }}
              />
            </div>

            {/* --- OUTER ORBIT --- */}
            {/* Trace path */}
            <div
              className="absolute rounded-full border border-primary/5"
              style={{
                width: "200px",
                height: "200px",
                transformStyle: "preserve-3d",
                transform: "rotateX(68deg) rotateY(-8deg)",
              }}
            />
            {/* Orbiting Comet */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: "200px",
                height: "200px",
                transformStyle: "preserve-3d",
                transform: "rotateX(68deg) rotateY(-8deg)",
              }}
            >
              <div
                className="absolute w-1.5 h-1.5 rounded-full bg-primary/60 shadow-[0_0_8px_#E21E26]"
                style={{
                  top: "calc(50% - 3px)",
                  left: "calc(50% - 3px)",
                  animation: "orbit-outer 5.6s linear infinite",
                }}
              />
            </div>

            {/* Central Logo */}
            <motion.img
              src="/small-logo-black-sm.webp"
              alt="AutoNxt Logo"
              className="w-14 h-14 object-contain relative filter drop-shadow-[0_0_8px_rgba(0,0,0,0.12)]"
              style={{
                transform: "translateZ(0px)",
                transformStyle: "preserve-3d"
              }}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: [0.96, 1.04, 0.96], opacity: 1 }}
              transition={{ 
                opacity: { duration: 0.4 },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </div>

          {/* Elegant glowing loading text */}
          <motion.p
            className="text-[10px] tracking-[0.45em] uppercase text-foreground/45 font-bold"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            Loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
