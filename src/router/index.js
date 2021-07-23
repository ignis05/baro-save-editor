import { createRouter, createWebHashHistory } from 'vue-router'
import SaveTools from '../views/SaveTools.vue'
import SubTools from '../views/SubTools.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'SaveTools',
    component: SaveTools,
    meta: {
      title: 'Barotrauma Save Editor',
    },
  },
  {
    path: '/SubTools',
    name: 'SubTools',
    component: SubTools,
    meta: {
      title: 'Barotrauma Submarine Editor',
    },
  },
  {
    path: '/About',
    name: 'About',
    component: About,
    meta: {
      title: 'About Barotrauma Save Editor',
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
