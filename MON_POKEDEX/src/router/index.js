import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/pokedex',
      name: 'pokedex',
      component: () => import('../views/PokedexView.vue'),
    },
    {
      path: '/pokemon/:id',
      name: 'pokemon-info',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DetailView.vue'),
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: () => import('../views/FavoriteView.vue'),
    },
  ],
})

export default router
