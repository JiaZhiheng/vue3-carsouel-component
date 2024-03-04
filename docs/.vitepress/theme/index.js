import DefaultTheme from 'vitepress/theme';
import demo from './demo/demo.vue'; // 我的项目
import home from './demo/home.vue'; // 我的项目

export default {
  ...DefaultTheme,
  NotFound: () => 'custom 404', // 404 页面
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('demo', demo);
    app.component('home', home);
  },
  setup() {}
};
