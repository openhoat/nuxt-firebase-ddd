import type { Feature } from '~/types'

export const helloFeature: Feature = {
  name: 'hello',
  navItems: [
    {
      order: 1,
      title: 'Hello',
      to: '/demos/hello',
    },
  ],
}

export default defineNuxtConfig({
  appConfig: {
    features: {
      [helloFeature.name]: helloFeature,
    },
  },
})
