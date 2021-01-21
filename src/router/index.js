import Vue from 'vue'
import VueRouter from 'vue-router'
import Frontpage from '../views/Frontpage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Frontpage',
    component: Frontpage
  },
  /*
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  */
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }// ,
  // {
  // path: '/frontpage',
  // name: 'Frontpage',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/Frontpage.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
