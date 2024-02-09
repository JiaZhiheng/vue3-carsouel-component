import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import libCss from 'vite-plugin-libcss';

const resolve = (dir) => path.join(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), libCss()],
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
      formats: ['esm'],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
    minify: false, // 禁用代码压缩
  },
})
