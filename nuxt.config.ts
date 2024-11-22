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
    firebaseAdminClientEmail: process.env.NUXT_FIREBASE_ADMIN_CLIENT_EMAIL,
    firebaseAdminPrivateKey: process.env.NUXT_FIREBASE_ADMIN_PRIVATE_KEY,
    firebaseAdminProjectId: process.env.NUXT_FIREBASE_ADMIN_PROJECT_ID,
    firebaseAdminServiceAccount:
      process.env.NUXT_FIREBASE_ADMIN_SERVICE_ACCOUNT === 'true',
    public: {
      firebaseApiKey: process.env.NUXT_FIREBASE_API_KEY,
      firebaseAppId: process.env.NUXT_FIREBASE_APP_ID,
      firebaseAuthDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
      firebaseAuthEmulatorUrl: process.env.NUXT_FIREBASE_AUTH_EMULATOR_URL,
      firebaseMeasurementId: process.env.NUXT_FIREBASE_MEASUREMENT_ID,
      firebaseMessagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
      firebaseProjectId: process.env.NUXT_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
      useFirebaseAuthEmulator:
        process.env.NUXT_FIREBASE_USE_AUTH_EMULATOR === 'true',
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
