import Carousel from './Carousel.vue';

// 使用文件名作为组件的名称
const componentName = Carousel.name || 'Carousel';

Carousel.install = function (Vue) {
  Vue.component(componentName, Carousel);
};

export default Carousel;
