import * as React from "react"
import { cn } from "@/lib/utils"

export const BlurDivider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative w-full h-px my-0 pointer-events-none z-10", className)}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-[2px]" />
    </div>
  )
})
BlurDivider.displayName = "BlurDivider"
