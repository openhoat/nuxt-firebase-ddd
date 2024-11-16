export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
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
      fbApiKey: process.env.NUXT_FB_API_KEY,
      fbAppId: process.env.NUXT_FB_APP_ID,
      fbAuthDomain: process.env.NUXT_FB_AUTH_DOMAIN,
      fbMessagingSenderId: process.env.NUXT_FB_MESSAGING_SENDER_ID,
      fbProjectId: process.env.NUXT_FB_PROJECT_ID,
      fbStorageBucket: process.env.NUXT_FB_STORAGE_BUCKET,
      useFbAuthEmulator: process.env.NUXT_FB_USE_AUTH_EMULATOR === 'true',
    },
  },
  plugins: ['~/plugins/firebase'],
  srcDir: 'src',
  ssr: false,
})
