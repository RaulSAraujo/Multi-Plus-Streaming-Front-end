// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Landing from '@/views/LandingPage.vue';
import SingIn from '@/views/SingIn.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
  },
  {
    path: '/SingIn',
    name: 'SingIn',
    component: SingIn,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
