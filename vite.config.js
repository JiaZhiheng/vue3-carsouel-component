import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

const resolve = (dir) => path.join(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      emitFile: false,
      filename: 'analysis-chart.html', // 分析图生成的文件名
      open: false // 如果存在本地服务端口，将在打包后自动展示
    })
  ],
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  build: {
    lib: {
      entry: resolve('src/components/carousel/index.js'),
      name: 'carousel',
      fileName: (format) => `carousel.${format}.js`,
      formats: ['es', 'umd', 'cjs', 'iife']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    },
    minify: false // 禁用代码压缩
  }
});
