import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SucheView from '@/views/SucheView.vue'
import LoginView from '@/views/LoginView.vue'
import KleidungListe from '@/components/KleidungListe.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/suche',
      name: 'Suche',
      component: SucheView
    },
    {
      path: '/kleidung',
      name: 'Kleidung',
      component: KleidungListe
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})
// class Kleidung{
//   constructor(private kleidungName: string, private groesse: string, private lager: number) {
//   }
// }
// class KleidungController{
//   constructor(private kleidungName: string, private groesse: string, private lager: number) {
//   }
// }
export default router
