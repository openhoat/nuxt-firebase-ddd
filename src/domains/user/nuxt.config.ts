export default defineNuxtConfig({
  appConfig: {
    'features.user': true,
  },
  imports: {
    dirs: ['stores'],
  },
  routeRules: {
    '/demos/login': { ssr: false },
  },
})
