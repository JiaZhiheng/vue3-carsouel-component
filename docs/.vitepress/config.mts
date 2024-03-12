import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'vue3-carousel-component',
  description: 'A Vue 3 carousel component',
  base: '/vue3-carsouel-component/', // GitHub部署配置
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag === 'td-doc-usage',
      },
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '示例', link: '/example' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
});
