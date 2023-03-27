// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Landing from '@/views/LandingPage.vue';
import Inicio from '@/views/Inicio.vue';
import Filmes from "@/views/Filmes.vue";
import Series from "@/views/Series.vue";
import Livros from "@/views/Livros.vue"

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
  },
  {
    path: '/Inicio',
    name: 'Inicio',
    component: Inicio,
  },
  {
    path: '/Filmes',
    name: 'Filmes',
    component: Filmes,
  },
  {
    path: '/Series',
    name: 'Series',
    component: Series,
  },
  {
    path: '/Livros',
    name: 'Livros',
    component: Livros,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
