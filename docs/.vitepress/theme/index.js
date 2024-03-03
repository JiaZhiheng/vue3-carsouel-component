import DefaultTheme from 'vitepress/theme';
import demo from './components/demo.vue'; // 我的项目

export default {
  ...DefaultTheme,
  NotFound: () => 'custom 404', // 404 页面
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('demo', demo);
  },
  setup() {}
};
