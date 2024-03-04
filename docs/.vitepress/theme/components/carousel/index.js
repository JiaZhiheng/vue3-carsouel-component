import Carousel from './Carousel.vue';

const componentName = Carousel.name || 'Carousel';

Carousel.install = function (Vue) {
  Vue.component(componentName, Carousel);
};

export default Carousel;
