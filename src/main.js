import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import BaseUsage from './demo/base-usage.vue';

// import site webComponents
import 'tdesign-site-components';
import 'tdesign-site-components/lib/styles/style.css';

// import site webComponents
import 'tdesign-site-components';
import 'tdesign-site-components/lib/styles/style.css';

import { registerLocaleChange } from 'tdesign-site-components';

registerLocaleChange();

const app = createApp(App);

// 注册组件
app.component('BaseUsage', BaseUsage);

// 挂载应用
app.mount('#app');
