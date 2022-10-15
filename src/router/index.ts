import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import character from '@/views/character/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/:id',
    name: 'rolelist',
    component: () => import('@/views/RoleList/index.vue'),
  },
  {
    path: '/character/:id',
    name: 'character',
    component: () => import('@/views/character/index.vue'),
    // component: character
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('@/views/index.vue'),
  },
];
const reuter = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default reuter;