/**
 * Under-development gate:
 * - Production: ON by default (blocks the site). Set VITE_SITE_PUBLIC=true to go live.
 * - Local dev: OFF by default. Set VITE_UNDER_DEVELOPMENT=true to preview the gate.
 */
export const isUnderDevelopment = import.meta.env.PROD
  ? import.meta.env.VITE_SITE_PUBLIC !== "true"
  : import.meta.env.VITE_UNDER_DEVELOPMENT === "true";
