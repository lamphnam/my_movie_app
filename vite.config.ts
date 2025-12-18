import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-dialog",
            "@radix-ui/react-navigation-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-slot",
            "@radix-ui/react-toggle",
            "@radix-ui/react-toggle-group",
          ],
          "animation-vendor": [
            "framer-motion",
            "embla-carousel-react",
            "embla-carousel-autoplay",
          ],
          "query-vendor": ["@tanstack/react-query"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: "esbuild", // esbuild is faster and included by default
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@tanstack/react-query",
      "framer-motion",
    ],
  },
});
