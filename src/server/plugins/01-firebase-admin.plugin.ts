import {
  type App as FirebaseApp,
  cert,
  getApp,
  getApps,
  initializeApp,
} from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import type { AppConfig } from '~/types'

const initFirebaseInstance = (
  config: AppConfig['runtimeConfig'],
): FirebaseApp => {
  if (getApps().length) {
    return getApp()
  }
  const {
    firebaseServiceAccountClientEmail: clientEmail,
    firebaseServiceAccountPrivateKey: privateKey,
  } = config
  const { firebaseProjectId: projectId } = config.public
  const firebaseConfig =
    clientEmail !== undefined &&
    privateKey !== undefined &&
    projectId !== undefined
      ? {
          credential: cert({ clientEmail, privateKey, projectId }),
        }
      : undefined
  if (!firebaseConfig) {
    console.warn(
      'No firebase configuration provided: initializing firebase with defaults',
    )
  }
  return initializeApp(firebaseConfig)
}

export default defineNitroPlugin((nitro) => {
  const firebaseApp = initFirebaseInstance(useRuntimeConfig())
  const firestore = getFirestore(firebaseApp)
  nitro.hooks.hook('request', (event) => {
    event.context.firebase = { firebaseApp, firestore }
  })
})
