import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import IntroScreen from '../views/IntroScreen.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IntroScreen,
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('../views/CommunityView.vue'),
    },
    {
      path: '/food',
      name: 'food',
      component: () => import('../views/FoodView.vue'),
    },
    {
      path: '/water',
      name: 'water',
      component: () => import('../views/WaterView.vue'),
    },
    {
      path: '/movement',
      name: 'movement',
      component: () => import('../views/MovementView.vue'),
    },
    {
      path: '/energy',
      name: 'energy',
      component: () => import('../views/EnergyView.vue'),
    },
    {
      path: '/goods',
      name: 'goods',
      component: () => import('../views/GoodsView.vue'),
    },
    {
      path: '/habitat',
      name: 'habitat',
      component: () => import('../views/HabitatView.vue'),
    },
    {
      path: '/score',
      name: 'score',
      component: () => import('../views/ScoreView.vue'),
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserName.vue'),
    },
    {
      path: '/screener',
      name: 'screener',
      component: () => import('../views/ScreenerView.vue'),
    },
  ],
})

export default router
