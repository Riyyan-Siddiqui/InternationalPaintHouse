import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js", // Add this line to point to your PostCSS config
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Point to Node.js server
        changeOrigin: true,
      },
    },
  },
});
