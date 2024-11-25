import firebaseAdmin from 'firebase-admin'
import {
  type App as FirebaseApp,
  cert,
  getApp,
  getApps,
} from 'firebase-admin/app'
import { type Firestore, getFirestore } from 'firebase-admin/firestore'

const initFirebaseInstance = (): FirebaseApp => {
  if (getApps().length) {
    return getApp()
  }
  const config = useRuntimeConfig()
  const {
    firebaseServiceAccountClientEmail: clientEmail,
    firebaseServiceAccountPrivateKey: privateKey,
    firebaseUseServiceAccount: useServiceAccount,
  } = config
  const { firebaseProjectId: projectId } = config.public
  const firebaseConfig = useServiceAccount
    ? {
        credential: cert({ clientEmail, privateKey, projectId }),
      }
    : undefined
  return firebaseAdmin.initializeApp(firebaseConfig)
}

export const initFirebaseAdmin = (): {
  firebaseApp: FirebaseApp
  firestore: Firestore
} => {
  const firebaseApp = initFirebaseInstance()
  const firestore = getFirestore(firebaseApp)
  return { firebaseApp, firestore }
}
