import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    alias: '/index.html',
    name: 'SaveTools',
    component: () => import('../views/SaveTools.vue'),
    meta: {
      title: 'Barotrauma Save Editor',
      keywords: 'barotrauma, save editor, save, editor, submarine, decompressor',
      desc: 'Online save and submarine editing tools for Barotrauma. Edit owned submarines, the crew, convert between single-player and multi-player formats, adjust campaign settings. Also includes some submarine editing tools and save decompressor.',
    },
    beforeEnter: (to, from, next) => {
      // handle redirect from 404.html
      var redirect = sessionStorage.redirect
      if (redirect) {
        console.log(`Detected redirect to ${redirect}`)
        if (redirect.endsWith('/')) redirect = redirect.slice(0, -1)
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
      keywords: 'barotrauma, submarine editor, submarine, editor, tools',
      desc: 'Online submarine tools for Barotrauma. Extract shuttles, preview image, mass hide wires, change price or clean wall stains.',
    },
  },
  {
    path: '/Decompressor',
    name: 'Decompressor',
    component: () => import('../views/Decompressor.vue'),
    meta: {
      title: 'Barotrauma Save Decompressor',
      keywords: 'barotrauma, save, decompressor, compressor',
      desc: 'Online save compressor and decompressor for Barotrauma. Uses experimental file system API: might not work on some browsers and can only access files in specific locations.',
    },
  },
  {
    path: '/About',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'About This App',
      keywords: 'barotrauma, save editor, save, editor, submarine, decompressor',
      desc: 'Online save and submarine editing tools for Barotrauma. Edit owned submarines, the crew, convert between single-player and multi-player formats, adjust campaign settings. Also includes some submarine editing tools and save decompressor.',
    },
  },
]

const router = createRouter({
  history: createWebHistory('/baro-save-editor/'),
  routes,
})

export default router
