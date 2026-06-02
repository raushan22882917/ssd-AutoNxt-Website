import * as React from "react"

import { cn } from "@/lib/utils"


// OptimizedImg


type FetchPriority = "high" | "low" | "auto"

export interface OptimizedImgProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Path to the original image (.jpg / .jpeg / .png). */
  src: string
  /** Accessible alt text — always required. */
  alt: string
  /**
   * Native fetchpriority attribute. Set to "high" on the LCP image.
   * Omitted from React's types but supported in all modern browsers.
   */
  fetchpriority?: FetchPriority
}

const OptimizedImg = React.forwardRef<HTMLImageElement, OptimizedImgProps>(
  ({ src, alt, fetchpriority, className, ...rest }, ref) => {
    // Derive WebP sibling path: /images/team/foo.jpg → /images/team/foo.webp
    const webpSrc = src.replace(/\.(jpe?g|png)$/i, ".webp")

    // Forward fetchpriority via cast — React doesn't type it on img yet
    const imgProps = {
      ...rest,
      ...(fetchpriority ? { fetchpriority } : {}),
    } as React.ImgHTMLAttributes<HTMLImageElement>

    return (
      <picture>
        {/* Modern browsers: serve the compressed WebP */}
        <source srcSet={webpSrc} type="image/webp" />
        {/* Fallback: original format for browsers without WebP support */}
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={cn(className)}
          {...imgProps}
        />
      </picture>
    )
  }
)

OptimizedImg.displayName = "OptimizedImg"

export { OptimizedImg }
