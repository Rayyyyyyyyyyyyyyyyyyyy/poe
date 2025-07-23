import { createRouter, createWebHistory } from 'vue-router'
import { ROUTE_NAMES, ROUTES } from '@/router/constants.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES.ROOT,
      name: ROUTE_NAMES.HOME_LAYOUT,
      component: () => import('@/layout/HomeLayout.vue'),
      children: [
        {
          path: ROUTES.ROOT,
          name: ROUTE_NAMES.HOME,
          component: () => import('@/views/HomePage.vue'),
        },
      ],
    },
    {
      path: ROUTES.LOGIN,
      name: ROUTE_NAMES.LOGIN,
      component: () => import('@/views/LoginPage.vue'),
    },
  ],
})

export default router
