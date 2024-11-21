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
        if (config.plugins) {
          config.plugins.push(vuetify({ autoImport: true }))
        }
      })
    },
    '@pinia/nuxt',
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
  runtimeConfig: {
    fbAdminClientEmail: process.env.NUXT_FB_ADMIN_CLIENT_EMAIL,
    fbAdminPrivateKey: process.env.NUXT_FB_ADMIN_PRIVATE_KEY,
    fbAdminProjectId: process.env.NUXT_FB_ADMIN_PROJECT_ID,
    fbAdminServiceAccount: process.env.NUXT_FB_ADMIN_SERVICE_ACCOUNT === 'true',
    public: {
      fbApiKeyProd: process.env.NUXT_FB_API_KEY_PROD,
      fbAuthDomainProd: process.env.NUXT_FB_AUTH_DOMAIN_PROD,
      fbApiKeyStaging: process.env.NUXT_FB_API_KEY_STAGING,
      fbAuthDomainStaging: process.env.NUXT_FB_AUTH_DOMAIN_STAGING,
      fbEnvTarget: process.env.NUXT_FB_ENV_TARGET,
      useFbAuthEmulator: process.env.NUXT_FB_USE_AUTH_EMULATOR === 'true',
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
