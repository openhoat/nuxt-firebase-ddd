import type { Feature } from '~/types'

export const userFeature: Feature = {
  name: 'user',
  navItems: [
    {
      order: 3,
      title: 'Login',
      to: '/demos/login',
    },
  ],
}

export default defineNuxtConfig({
  appConfig: {
    features: { [userFeature.name]: userFeature },
  },
  imports: {
    dirs: ['stores'],
  },
  routeRules: {
    '/demos/login': { ssr: false },
  },
})
