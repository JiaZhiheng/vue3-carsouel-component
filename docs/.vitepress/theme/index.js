import DefaultTheme from 'vitepress/theme';
import BaseUsage from './util/base-usage.vue';
// import Carousel from '../../../dist/carousel.es';
// import '../../../dist/style.css';
import Carousel from '../../../src/components/carousel/Carousel.vue';
import Basic from './example/basic/basic.vue';
import Arrow from './example/arrow/arrow.vue';
import Indicator from './example/indicator/indicator.vue';
import './custom.css';

export default {
  ...DefaultTheme,
  NotFound: () => 'custom 404', // 404 页面
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('carousel', Carousel);
    app.component('BaseUsage', BaseUsage);
    app.component('Basic', Basic);
    app.component('Arrow', Arrow);
    app.component('Indicator', Indicator);

    if (import.meta.env.SSR === false) {
      import('tdesign-site-components');
      import('tdesign-site-components/lib/styles/style.css');
    }
  },
  setup() {}
};
