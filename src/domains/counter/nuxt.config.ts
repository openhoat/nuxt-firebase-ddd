import type { Feature } from '~/types'

export const counterFeature: Feature = {
  name: 'counter',
  navItems: [
    {
      order: 2,
      title: 'Counter',
      to: '/demos/counter',
    },
  ],
}

export default defineNuxtConfig({
  appConfig: {
    features: {
      [counterFeature.name]: counterFeature,
    },
  },
  routeRules: {
    '/demos/counter': { ssr: false },
  },
})
