import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Auto-compresses all images at production build time
    ViteImageOptimizer({
      jpg:  { quality: 80 },
      jpeg: { quality: 80 },
      png:  { quality: 80 },
      webp: { quality: 82 },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(__dirname),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-three": ["three", "@react-three/fiber", "@react-three/drei"],
          "vendor-query": ["@tanstack/react-query"],
          "vendor-ui": ["@radix-ui/react-dialog", "@radix-ui/react-select", "@radix-ui/react-tooltip"],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
    allowedHosts: [".ngrok-free.app"],
    proxy: {
      "/api/n8n-form-callback": {
        target: "https://autonxt.app.n8n.cloud",
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/api\/n8n-form-callback/, "/webhook/autonxt-form-callback"),
      },
      "/api/n8n-schedule-meeting": {
        target: "https://autonxt.app.n8n.cloud",
        changeOrigin: true,
        secure: true,
        rewrite: (p) =>
          p.replace(/^\/api\/n8n-schedule-meeting/, "/webhook/autonxt-schedule-meeting"),
      },
      "/api/n8n-session-report": {
        target: "https://autonxt.app.n8n.cloud",
        changeOrigin: true,
        secure: true,
        rewrite: (p) =>
          p.replace(/^\/api\/n8n-session-report/, "/webhook/autonxt-session-report"),
      },
    },
  },
  preview: {
    port: 4173,
    host: true,
  },
});
