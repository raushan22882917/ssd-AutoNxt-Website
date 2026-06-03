import * as React from "react"

import { cn } from "@/lib/utils"

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
  ({ src, alt, fetchpriority, className, onError, ...rest }, ref) => {
    const webpSrc = src.replace(/\.(jpe?g|png)$/i, ".webp")
    const [activeSrc, setActiveSrc] = React.useState(webpSrc)
    const triedFallback = React.useRef(false)

    React.useEffect(() => {
      triedFallback.current = false
      setActiveSrc(webpSrc)
    }, [webpSrc])

    const imgProps = {
      ...rest,
      ...(fetchpriority ? { fetchpriority } : {}),
    } as React.ImgHTMLAttributes<HTMLImageElement>

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      if (!triedFallback.current && activeSrc !== src) {
        triedFallback.current = true
        setActiveSrc(src)
        return
      }
      onError?.(e)
    }

    return (
      <img
        ref={ref}
        src={activeSrc}
        alt={alt}
        className={cn(className)}
        onError={handleError}
        {...imgProps}
      />
    )
  }
)

OptimizedImg.displayName = "OptimizedImg"

export { OptimizedImg }
