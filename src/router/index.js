import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    alias: '/index.html',
    name: 'SaveTools',
    component: () => import('../views/SaveTools.vue'),
    meta: {
      title: 'Barotrauma Save Editor',
    },
    beforeEnter: (to, from, next) => {
      // handle redirect from 404.html
      if (sessionStorage.getItem('redirect') !== null) {
        const redirect = sessionStorage.redirect
        delete sessionStorage.redirect
        next(redirect)
      } else {
        next()
      }
    },
  },
  {
    path: '/SubTools',
    name: 'SubTools',
    component: () => import('../views/SubTools.vue'),
    meta: {
      title: 'Barotrauma Submarine Editor',
    },
  },
  {
    path: '/About',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'About This App',
    },
  },
]

const router = createRouter({
  history: createWebHistory('/baro-save-editor/'),
  routes,
})

export default router
