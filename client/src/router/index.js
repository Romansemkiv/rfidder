import Vue from 'vue'
import VueRouter from 'vue-router'
import Modules from '../views/Modules.vue'
import Devices from '../views/Devices.vue'
import Logs from '../views/Logs.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Modules',
    component: Modules
  },
  {
    path: '/devices',
    name: 'Devices',
    component: Devices
  },
  {
    path: '/logs',
    name: 'Logs',
    component: Logs
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
