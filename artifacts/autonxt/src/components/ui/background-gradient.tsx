import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: { backgroundPosition: "0 50%" },
    animate: { backgroundPosition: ["0 50%", "100% 50%", "0 50%"] },
  };

  return (
    <div className={cn("relative p-[3px] group/bg-grad", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={animate ? { duration: 5, repeat: Infinity, repeatType: "reverse" } : undefined}
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
          backgroundImage:
            "radial-gradient(circle farthest-side at 0 100%, #a80000cc, transparent), radial-gradient(circle farthest-side at 100% 0, #1e40af88, transparent), radial-gradient(circle farthest-side at 100% 100%, #a80000aa, transparent), radial-gradient(circle farthest-side at 0 0, hsl(214,65%,32%,0.8), #141316)",
        }}
        className="absolute inset-0 rounded-[22px] z-[1] opacity-60 group-hover/bg-grad:opacity-100 blur-xl transition duration-500 will-change-transform"
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={animate ? { duration: 5, repeat: Infinity, repeatType: "reverse" } : undefined}
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
          backgroundImage:
            "radial-gradient(circle farthest-side at 0 100%, #a80000cc, transparent), radial-gradient(circle farthest-side at 100% 0, #1e40af88, transparent), radial-gradient(circle farthest-side at 100% 100%, #a80000aa, transparent), radial-gradient(circle farthest-side at 0 0, hsl(214,65%,32%,0.8), #141316)",
        }}
        className="absolute inset-0 rounded-[22px] z-[1]"
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
