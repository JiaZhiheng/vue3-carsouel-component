import Segmented from './Segmented.vue';

// 使用文件名作为组件的名称
const componentName = Segmented.name || 'Segmented';

Segmented.install = function (Vue) {
  Vue.component(componentName, Segmented);
};

export default Segmented;
