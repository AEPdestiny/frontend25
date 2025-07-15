// src/router/index.ts

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Anmelden from '@/views/Anmelden.vue'
import Registrieren from '@/views/Registrieren.vue'
import Dashboard from '@/views/Dashboard.vue'
import KleidungListe from '@/views/KleidungListe.vue'
import KleidungFormular from '@/views/KleidungFormular.vue'
import KleidungSuche from '@/views/KleidungSuche.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth/anmelden',
    name: 'anmelden',
    component: Anmelden,
    meta: { requiresAuth: false }
  },
  {
    path: '/auth/registrieren',
    name: 'registrieren',
    component: Registrieren,
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/kleidung',
    name: 'kleidung-liste',
    component: KleidungListe,
    meta: { requiresAuth: true }
  },
  {
    path: '/kleidung/neu',
    name: 'kleidung-neu',
    component: KleidungFormular,
    meta: { requiresAuth: true },
    props: false
  },
  {
    path: '/kleidung/bearbeiten/:id',
    name: 'kleidung-bearbeiten',
    component: KleidungFormular,
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/kleidung/suche',
    name: 'kleidung-suche',
    component: KleidungSuche,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    redirect: '/dashboard'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const benutzer = JSON.parse(localStorage.getItem('user') || 'null')
  const istAngemeldet = benutzer !== null

  if (to.meta.requiresAuth && !istAngemeldet) {
    next('/auth/anmelden')
  } else if ((to.name === 'anmelden' || to.name === 'registrieren') && istAngemeldet) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
