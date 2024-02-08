import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

const resolve = (dir) => path.join(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
  build: {
    lib: {
      entry: resolve("src/components/carousel/index.js"),
      name: "carousel",
      fileName: (format) => `carousel.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
})
