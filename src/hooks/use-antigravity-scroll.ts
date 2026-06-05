import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Custom hook to handle an "anti-gravity" organic autoscroll to center a target element in the viewport.
 * 
 * Features:
 * - DOM referencing via React useRef (no getElementById or querySelectors).
 * - Precise layout measurement using useLayoutEffect before browser paint.
 * - Hardware-accelerated smooth scrolling using a requestAnimationFrame (rAF) loop.
 * - Weightless cubic-bezier(0.1, 0.9, 0.2, 1) deceleration curve.
 * - Instant interruptibility via passive events (wheel, touchmove, keydown).
 * - Clean garbage collection on unmount to prevent memory leaks.
 * - Execution guard to ensure the scroll runs exactly ONCE per page mount.
 * 
 * @param targetRef React RefObject of the element to scroll to
 * @param delayMs Brief pause duration before scroll starts (default 1200ms)
 * @param durationMs Scroll transition duration (default 1600ms)
 */
export function useAntigravityScroll(
  targetRef: React.RefObject<HTMLElement | null>,
  delayMs = 750,
  durationMs = 3200
) {
  const animationFrameRef = useRef<number | null>(null);
  const hasRunRef = useRef(false);
  const initialScrollRef = useRef<number | null>(null);

  // 1. DOM Referencing & Layout Accuracy:
  // Measure the element height before paint to prevent layout-shift calculations from breaking
  useLayoutEffect(() => {
    // Reset window scroll to 0 immediately on mount to start the animation from the very top
    window.scrollTo(0, 0);

    if (!targetRef.current || hasRunRef.current) return;
    const rect = targetRef.current.getBoundingClientRect();
    initialScrollRef.current = window.pageYOffset + rect.top;
  }, [targetRef]);

  useEffect(() => {
    if (hasRunRef.current) return;

    let delayTimeout: NodeJS.Timeout | null = null;
    let originalScrollBehavior = "";

    const stopAnimation = () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      removeInterruptionListeners();
      
      // Restore original scroll behavior
      if (originalScrollBehavior !== undefined) {
        document.documentElement.style.scrollBehavior = originalScrollBehavior;
      }
    };

    // User Interruption triggers instant scroll cancellation
    const handleUserInterruption = () => {
      stopAnimation();
    };

    const addInterruptionListeners = () => {
      window.addEventListener("wheel", handleUserInterruption, { passive: true });
      window.addEventListener("touchmove", handleUserInterruption, { passive: true });
      window.addEventListener("keydown", handleUserInterruption, { passive: true });
    };

    const removeInterruptionListeners = () => {
      window.removeEventListener("wheel", handleUserInterruption);
      window.removeEventListener("touchmove", handleUserInterruption);
      window.removeEventListener("keydown", handleUserInterruption);
    };

    const startScrollAnimation = () => {
      if (!targetRef.current) return;

      // Measure coordinates right before scroll starts (handles changes that happened during the delay)
      const rect = targetRef.current.getBoundingClientRect();
      const currentScrollY = window.pageYOffset;
      
      // Target to align the top of the section with the top of the viewport (offset by the navbar height)
      const navbarOffset = 80;
      const targetScrollY = currentScrollY + rect.top - navbarOffset;
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
      const finalTargetY = Math.max(0, Math.min(targetScrollY, maxScrollY));

      // Guard: If we are already near the target, do not scroll
      if (Math.abs(currentScrollY - finalTargetY) < 10) {
        hasRunRef.current = true;
        return;
      }

      // Temporarily disable CSS smooth scrolling to prevent conflict with JS animation frame loop
      originalScrollBehavior = document.documentElement.style.scrollBehavior || "";
      document.documentElement.style.scrollBehavior = "auto";

      // Mark as executed for this page mount
      hasRunRef.current = true;
      addInterruptionListeners();

      let startTime: number | null = null;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / durationMs, 1);

        // Quintic ease-out: starts fast and decelerates into weightless glide with zero loop overhead
        const easedProgress = 1 - Math.pow(1 - progress, 5);
        const nextY = currentScrollY + (finalTargetY - currentScrollY) * easedProgress;

        // Use Math.round to prevent subpixel layout thrashing and browser scroll jitter
        window.scrollTo(0, Math.round(nextY));

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          stopAnimation();
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Pause briefly (delayMs) before triggering the organic glide down
    delayTimeout = setTimeout(() => {
      startScrollAnimation();
    }, delayMs);

    // Cleanup: Remove listeners and cancel active animation loops to avoid memory leaks
    return () => {
      if (delayTimeout) clearTimeout(delayTimeout);
      stopAnimation();
    };
  }, [targetRef, delayMs, durationMs]);
}
