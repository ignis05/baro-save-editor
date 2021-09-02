import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles/main.sass'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary: '#4CAF50',
          secondary: '#03A9F4',
        },
      },
    },
  },
})
