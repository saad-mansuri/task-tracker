import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }, // ALL
      { path: 'completed', component: () => import('pages/IndexPage.vue') },
      { path: 'pending', component: () => import('pages/IndexPage.vue') },
      { path: 'add', component: () => import('pages/AddTaskPage.vue') },
      { path: 'edit/:id', component: () => import('pages/EditTaskPage.vue') },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
