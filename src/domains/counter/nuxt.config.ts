export default defineNuxtConfig({
  appConfig: {
    'features.counter': true,
  },
  routeRules: {
    '/demos/counter': { ssr: false },
  },
})
