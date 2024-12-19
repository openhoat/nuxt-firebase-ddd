import {
  type App as FirebaseApp,
  cert,
  getApp,
  getApps,
  initializeApp,
} from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { defineNitroPlugin, useRuntimeConfig } from 'nitropack/runtime'

const initFirebaseInstance = (config: {
  clientEmail?: string
  privateKey?: string
  projectId?: string
}): FirebaseApp => {
  if (getApps().length) {
    return getApp()
  }
  const { clientEmail, privateKey, projectId } = config
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
  const {
    firebaseServiceAccountClientEmail: clientEmail,
    firebaseServiceAccountPrivateKey: privateKey,
    public: { firebaseProjectId: projectId },
  } = useRuntimeConfig()
  const firebaseApp = initFirebaseInstance({
    clientEmail,
    privateKey,
    projectId,
  })
  const firestore = getFirestore(firebaseApp)
  nitro.hooks.hook('request', (event) => {
    event.context.firebase = { firestore }
  })
})
