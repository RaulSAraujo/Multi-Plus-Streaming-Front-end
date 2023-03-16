// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Landing',
        component: () => import('@/views/LandingPage.vue'),
      },
      {
        path: '/singIn',
        name: 'Sing In',
        component: () => import('@/views/singIn.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
