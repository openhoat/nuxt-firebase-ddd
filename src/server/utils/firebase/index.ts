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
  console.log('config in firebase server initialization:', config)
  const {
    firebaseAdminServiceAccount: useServiceAccount,
    firebaseAdminClientEmail: clientEmail,
    firebaseAdminPrivateKey: privateKey,
    firebaseAdminProjectId: projectId,
  } = config
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
