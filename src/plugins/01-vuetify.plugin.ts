import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin({
  name: 'vuetify-plugin',
  parallel: true,
  setup: (nuxtApp) => {
    const vuetify = createVuetify({
      icons: {
        defaultSet: 'mdi',
      },
      theme: {
        defaultTheme: 'dark',
      },
    })
    nuxtApp.vueApp.use(vuetify)
  },
})
