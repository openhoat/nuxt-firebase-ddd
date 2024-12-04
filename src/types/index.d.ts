import type { FirebaseApp } from '@firebase/app'
import type { Firestore } from 'firebase-admin/firestore'

export type AppRuntimeConfig = {
  firebaseServiceAccountClientEmail?: string
  firebaseServiceAccountPrivateKey?: string
}

export type AppPublicRuntimeConfig = {
  firebaseProjectId?: string
}

export type AppConfig = {
  debug: boolean
  maxInstances: number
  region: string
  runtimeConfig: AppRuntimeConfig & {
    public: AppPublicRuntimeConfig
  }
}

declare module 'nuxt/schema' {
  type RuntimeConfig = AppRuntimeConfig
  type PublicRuntimeConfig = AppPublicRuntimeConfig
}

declare module 'h3' {
  interface H3EventContext {
    firebase: {
      firebaseApp: FirebaseApp
      firestore: Firestore
    }
  }
}
