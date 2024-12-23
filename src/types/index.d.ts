import type { Firestore } from 'firebase-admin/firestore'
import type { RouteMiddleware } from '#app'

export type AppPublicRuntimeConfig = {
  firebaseProjectId?: string
}

export type AppRuntimeConfig = {
  firebaseServiceAccountClientEmail?: string
  firebaseServiceAccountPrivateKey?: string
  public: AppPublicRuntimeConfig
}

export type AppConfig = {
  debug: boolean
  maxInstances: number
  region: string
  runtimeConfig: AppRuntimeConfig
}

declare module 'nuxt/schema' {
  type RuntimeConfig = AppRuntimeConfig
  type PublicRuntimeConfig = AppPublicRuntimeConfig
}

declare module '#app' {
  interface NuxtApp {
    $authGuardMiddleware?: RouteMiddleware
  }
}

declare module 'h3' {
  interface H3EventContext {
    firebase: {
      firestore: Firestore
    }
    requireAuthentication?: (event: H3Event) => void
  }
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
