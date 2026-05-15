import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(() => {
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
          {/* Animated rings */}
          <div className="relative flex items-center justify-center mb-8">
            {[80, 56, 36].map((size, i) => (
              <motion.div
                key={size}
                className="absolute rounded-full border border-primary/20"
                style={{ width: size, height: size }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
              />
            ))}
            {/* Logo mark */}
            <motion.div
              className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            >
              <span className="text-white font-bold text-xl tracking-tight font-display">A</span>
            </motion.div>
          </div>

          {/* Brand name */}
          <motion.div
            className="flex items-baseline gap-1.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <span className="font-display text-2xl font-bold text-foreground tracking-tight">AUTONXT</span>
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Automation</span>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="mt-8 h-[2px] w-40 bg-muted rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
