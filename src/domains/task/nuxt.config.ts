import type { Feature } from '~/types'

export const taskFeature: Feature = {
  name: 'task',
  navItems: [
    {
      order: 3,
      title: 'Tasks',
      to: '/demos/tasks',
    },
  ],
}

export default defineNuxtConfig({
  appConfig: {
    features: { [taskFeature.name]: taskFeature },
  },
  routeRules: {
    '/demos/tasks': { ssr: false },
  },
})
