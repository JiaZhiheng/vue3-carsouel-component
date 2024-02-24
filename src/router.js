import { createRouter, createWebHistory } from 'vue-router';
import Home from './page/home.vue';
import Test from './page/test.vue';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/test',
    component: Test
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
