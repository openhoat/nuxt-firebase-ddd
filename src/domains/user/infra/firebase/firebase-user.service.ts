import {
  type Auth,
  type User as FirebaseAuthUser,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import type { User } from '../../domain/user'
import type { GetUserService } from '../../domain/user-service'

export type FirebaseUserServiceConfig = { firebaseAuth: Auth }

export const fromFirebaseAuthUser = (
  firebaseAuthUser: FirebaseAuthUser | null,
): User | null => {
  if (!firebaseAuthUser) {
    return null
  }
  const {
    email,
    emailVerified,
    displayName,
    phoneNumber,
    photoURL,
    providerId,
    uid,
  } = firebaseAuthUser
  return {
    displayName: displayName ?? undefined,
    email: email ?? undefined,
    emailVerified,
    getJwt: () => firebaseAuthUser.getIdToken(),
    phoneNumber: phoneNumber ?? undefined,
    photoURL: photoURL ?? undefined,
    providerId,
    userId: uid,
  }
}

export const getFirebaseUserService: GetUserService<
  FirebaseUserServiceConfig
> = ({ firebaseAuth }) => ({
  getCurrentUser: (): User | null =>
    fromFirebaseAuthUser(firebaseAuth.currentUser),
  signIn: async () => {
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopup(firebaseAuth, provider)
    return fromFirebaseAuthUser(userCredential.user)
  },
  signOut: async () => {
    await signOut(firebaseAuth)
  },
})
