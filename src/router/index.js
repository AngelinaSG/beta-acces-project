import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'


import guest from './middleware/guest'
import auth from './middleware/auth'
import middlewarePipeline from './middlewarePipeline'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      middleware: [
        guest
      ]
    },
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: {
      middleware: [
        auth
      ]
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
