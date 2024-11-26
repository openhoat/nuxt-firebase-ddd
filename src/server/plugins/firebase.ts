import type { RuntimeConfig } from '@nuxt/schema'
import firebaseAdmin from 'firebase-admin'
import {
  type App as FirebaseApp,
  cert,
  getApp,
  getApps,
} from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const initFirebaseInstance = (config: RuntimeConfig): FirebaseApp => {
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
    console.warn('No firebase configuration provided!')
  }
  return firebaseAdmin.initializeApp(firebaseConfig)
}

export default defineNitroPlugin((nitro) => {
  const firebaseApp = initFirebaseInstance(useRuntimeConfig())
  const firestore = getFirestore(firebaseApp)
  nitro.hooks.hook('request', async (event) => {
    event.context.firebase = { firebaseApp, firestore }
  })
})
