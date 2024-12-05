import type { Auth, User } from 'firebase/auth'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import type { GetUserService } from '~/domains/user/domain/user-service'

export type FirebaseUserServiceConfig = { firebaseAuth: Auth }

export const getFirebaseUserService: GetUserService<
  FirebaseUserServiceConfig
> = ({ firebaseAuth }) => ({
  getCurrentUser: (): User | null => {
    return firebaseAuth.currentUser
  },
  signIn: async () => {
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopup(firebaseAuth, provider)
    return userCredential.user
  },
  signOut: async () => {
    await signOut(firebaseAuth)
  },
})
