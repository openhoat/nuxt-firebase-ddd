import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  build: {
    transpile: ['vuetify'],
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],
  nitro: {
    firebase: {
      gen: 2,
      httpsOptions: {
        region: 'europe-west9',
        maxInstances: 3,
      },
    },
    output: {
      dir: 'dist/nuxt',
    },
  },
  srcDir: 'src',
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
