import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/absensi',
    name: 'absensi',
    component: () => import('../views/Absensi.vue')
  },
  {
    path: '/dpr_ri',
    name: 'dpr_ri',
    component: () => import('../views/DprRi.vue')
  },
  {
    path: '/dprd_prov',
    name: 'dprd_prov',
    component: () => import('../views/DprdProv.vue')
  },
  {
    path: '/dprd_kota_kab',
    name: 'dprd_kota_kab',
    component: () => import('../views/DprdKota.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
