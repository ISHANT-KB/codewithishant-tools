import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    build: {
      target: "esnext",
      minify: "esbuild",
      cssMinify: true,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("node_modules/lucide-react/")) {
                return "vendor-lucide";
              }
              if (
                id.includes("node_modules/motion/") ||
                id.includes("node_modules/@motionone/")
              ) {
                return "vendor-motion";
              }
              if (
                id.includes("node_modules/react/") ||
                id.includes("node_modules/react-dom/") ||
                id.includes("node_modules/scheduler/")
              ) {
                return "vendor-react";
              }
              return "vendor-helpers";
            }
          },
        },
      },
    },
    server: {
      hmr: true,
    },
  };
});
