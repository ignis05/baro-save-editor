import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'SaveTools',
    component: () => import('../views/SaveTools.vue'),
    meta: {
      title: 'Barotrauma Save Editor',
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
  history: createWebHashHistory(),
  routes,
})

export default router
