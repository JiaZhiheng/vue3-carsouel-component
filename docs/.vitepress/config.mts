import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'vue3-carousel-component',
  titleTemplate: ':title - Vue3-carousel-component',
  description: 'A Vue 3 carousel component',
  base: '/vue3-carsouel-component/', // GitHub部署配置
  head: [['link', { rel: 'icon', href: '/vue3-carsouel-component/favicon.ico' }]],
  cleanUrls: true,
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag === 'td-doc-usage'
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/assets/carousel.png',
    nav: [
      { text: 'Docs', link: '/docs' },
      { text: 'API', link: '/api' },
      { text: 'Example', link: '/example' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: []
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
  }
});
