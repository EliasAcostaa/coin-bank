import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import OperarView from '../views/OperarView.vue'
import HistorialView from '../views/HistorialView.vue'
import EstadoActualView from '../views/EstadoActualView.vue'
import SobreNosotrosView from '@/views/SobreNosotrosView.vue'
import ContactoView from '@/views/ContactoView.vue'

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
    path: '/Operar',
    name: 'OperarView',
    component: OperarView
  },
  {
    path: '/Historial',
    name: 'HistorialView',
    component: HistorialView
  },
  {
    path: '/Balances',
    name: 'EstadoActualView',
    component: EstadoActualView
  },
  {
    path: '/SobreNosotros',
    name: 'SobreNosotrosView',
    component: SobreNosotrosView
  },
  {
    path: '/Contacto',
    name: 'ContactoView',
    component: ContactoView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
