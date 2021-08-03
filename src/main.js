import { createApp, nextTick } from 'vue'
import vuetify from '@/plugins/vuetify'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import counter from '@/helpers/counter.dev'
counter()

const app = createApp(App)
app.use(router)
app.use(store)
app.use(vuetify)

app.mount('#app')

const DEFAULT_TITLE = 'Barotrauma Save Editor'
router.afterEach(function (to) {
  nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE
  })
})
