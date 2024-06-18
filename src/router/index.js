import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import VenderView from '../views/VenderView.vue'
import HistorialView from '../views/HistorialView.vue'

const routes = [
  {
    path: '/',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/Home',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/Vender',
    name: 'VenderView',
    component: VenderView
  },
  {
    path: '/Historial',
    name: 'HistorialView',
    component: HistorialView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
