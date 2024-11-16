import firebaseAdmin from 'firebase-admin'
import { cert, getApp, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

const initFirebase = () => {
  const config = useRuntimeConfig()
  const {
    fbAdminServiceAccount: useServiceAccount,
    fbAdminClientEmail: clientEmail,
    fbAdminPrivateKey: privateKey,
    fbAdminProjectId: projectId,
  } = config
  const firebaseConfig = useServiceAccount
    ? {
        credential: cert({ clientEmail, privateKey, projectId }),
      }
    : undefined
  const firebaseApp = getApps().length
    ? getApp()
    : firebaseAdmin.initializeApp(firebaseConfig)
  const firestore = getFirestore(firebaseApp)
  const auth = getAuth(firebaseApp)
  return { auth, firebase: firebaseApp, firestore }
}

export { initFirebase }
