import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  /* Site Metadata 站点元数据 */
  title: 'Vue3-Carousel-Component',
  titleTemplate: ':title - Vue3-Carousel-Component',
  description:
    'Vue3-Carousel-Component is a carousel component built with Vue 3. Offering a range of features and flexibility for creating contemporary carousel effects. This component harnesses the compositional API and reactivity system of Vue 3, providing developers with an easy-to-use and highly customizable carousel solution. With Vue3-Carousel-Component, developers can create seamless slideshows of images, videos, or any content, integrating smoothly into Vue 3 projects.',
  head: [['link', { rel: 'icon', href: '/vue3-carsouel-component/favicon.ico' }]],
  lang: 'zh-CN',
  base: '/vue3-carsouel-component/',
  /* Routing 路由 */
  cleanUrls: true,
  rewrites: {
    // URL 映射
    // 'source/:page': 'destination/:page'
  },
  /* Build 构建 */
  // srcDir: './src',
  srcExclude: ['**/README.md', '**/TODO.md'],
  outDir: './.vitepress/dist',
  assetsDir: 'static',
  cacheDir: './.vitepress/cache',
  ignoreDeadLinks: true,
  metaChunk: false,
  mpa: false,
  /* Theming 主题 */
  appearance: true,
  lastUpdated: true,
  /* Customization 自定义 */
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    theme: { light: 'github-light', dark: 'github-dark' }, // https://github.com/shikijs/shiki/blob/main/docs/themes.md
    lineNumbers: false,
    anchor: {
      slugify(str) {
        return encodeURIComponent(str);
      }
    }
  },
  vite: {
    resolve: {
      alias: {}
    }
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag === 'td-doc-usage'
      }
    }
  },
  /* Build Hooks 构建钩子 */
  async buildEnd(siteConfig) {
    // ...
  },
  async postRender(context) {
    // ...
  },
  async transformHead(context) {
    // ...
  },
  async transformHtml(code, id, context) {
    // ...
  },
  async transformPageData(pageData, { siteConfig }) {
    // ...
  },
  /* Default Theme Config 默认主题配置 */
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    i18nRouting: true,
    logo: '/assets/carousel.png',
    siteTitle: 'Vue3-Carousel-Component',
    nav: [
      { text: 'Docs', link: '/docs' },
      { text: 'API', link: '/api' },
      { text: 'Example', link: '/example' },
      { text: 'Demo', link: '/demo' },
      { text: 'Home', link: '/home' }
    ],
    sidebar: [
      {
        text: 'Examples',
        items: []
      }
    ],
    aside: true,
    outline: [2, 4],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/JiaZhiheng/vue3-carsouel-component' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You'
    },
    editLink: {
      pattern: 'https://github.com/JiaZhiheng/vue3-carsouel-component/issues',
      text: 'Edit this page on GitHub'
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    search: {
      provider: 'local'
      //   provider: 'algolia',
      //   options: {
      //     appId: '...',
      //     apiKey: '...',
      //     indexName: '...',
      //     locales: {
      //       zh: {
      //         placeholder: '搜索文档',
      //         translations: {
      //           button: {
      //             buttonText: '搜索文档',
      //             buttonAriaLabel: '搜索文档'
      //           },
      //           modal: {
      //             searchBox: {
      //               resetButtonTitle: '清除查询条件',
      //               resetButtonAriaLabel: '清除查询条件',
      //               cancelButtonText: '取消',
      //               cancelButtonAriaLabel: '取消'
      //             },
      //             startScreen: {
      //               recentSearchesTitle: '搜索历史',
      //               noRecentSearchesText: '没有搜索历史',
      //               saveRecentSearchButtonTitle: '保存至搜索历史',
      //               removeRecentSearchButtonTitle: '从搜索历史中移除',
      //               favoriteSearchesTitle: '收藏',
      //               removeFavoriteSearchButtonTitle: '从收藏中移除'
      //             },
      //             errorScreen: {
      //               titleText: '无法获取结果',
      //               helpText: '你可能需要检查你的网络连接'
      //             },
      //             footer: {
      //               selectText: '选择',
      //               navigateText: '切换',
      //               closeText: '关闭',
      //               searchByText: '搜索提供者'
      //             },
      //             noResultsScreen: {
      //               noResultsText: '无法找到相关结果',
      //               suggestedQueryText: '你可以尝试查询',
      //               reportMissingResultsText: '你认为该查询应该有结果？',
      //               reportMissingResultsLinkText: '点击反馈'
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
    },
    // carbonAds: {
    //   code: 'your-carbon-code',
    //   placement: 'your-carbon-placement'
    // },
    docFooter: {
      prev: 'Pagina prior',
      next: 'Proxima pagina'
    },
    darkModeSwitchLabel: 'Appearance',
    lightModeSwitchTitle: 'Switch to light theme',
    darkModeSwitchTitle: 'Switch to dark theme',
    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Return to top',
    langMenuLabel: 'Change language',
    externalLinkIcon: false
  }
});
