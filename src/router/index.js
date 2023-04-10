// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Landing from '@/views/LandingPage.vue';
import Inicio from '@/views/Inicio.vue';
import Filmes from "@/views/Filmes.vue";
import Series from "@/views/Series.vue";
import Perfil from "@/views/Perfil.vue"
import Details from "@/views/Details.vue"

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
    path: '/Perfil',
    name: 'Perfil',
    component: Perfil,
  },
  {
    path: '/Detalhes/:movieOrTv/:id',
    name: 'Detalhes',
    component: Details,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
  }
})

export default router
