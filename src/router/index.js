import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/address',
    name: 'address',
    
    component: () => import(/* webpackChunkName: "about" */ '../views/address.vue')
  },
  {
    path: '/item',
    name: 'item',

    component: () => import(/* webpackChunkName: "about" */ '../views/item.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router 