import Vue from 'vue'
import VueRouter from 'vue-router'
import views from '../views'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'views',
    component: views
  }
]

const router = new VueRouter({
  routes
})

export default router
