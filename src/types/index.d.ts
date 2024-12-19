export type AppConfig = {
  debug: boolean
  maxInstances: number
  region: string
}

export type FeatureNavItem = {
  condition?: boolean
  order?: number
  title: string
  to: string
}

export type Feature = {
  name: string
  navItems?: FeatureNavItem[]
}

declare module '#app' {
  interface NuxtApp {
    appConfig: {
      features: Record<string, Feature>
    }
  }
}
