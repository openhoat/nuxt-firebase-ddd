import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin({
  name: 'vuetify-plugin',
  parallel: true,
  setup: (nuxtApp) => {
    const vuetify = createVuetify({
      theme: {
        defaultTheme: 'dark',
      },
    })
    nuxtApp.vueApp.use(vuetify)
  },
})
