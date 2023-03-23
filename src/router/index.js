// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Landing from '@/views/LandingPage.vue';
import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
