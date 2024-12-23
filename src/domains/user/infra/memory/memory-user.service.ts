import type { User } from '../../domain/user'
import type { GetUserService } from '../../domain/user-service'

export const getMemoryUserService: GetUserService = () => {
  const user: { value: User | null } = { value: null }
  return {
    getCurrentUser: () => user.value,
    signIn: () => {
      user.value = {
        displayName: 'John Doe',
        email: 'johndoe@local.io',
        providerId: 'fake',
        getJwt: () => Promise.resolve('jwt-token-data'),
        userId: 'user-id',
      }
      return Promise.resolve(user.value)
    },
    signOut: () => {
      user.value = null
      return Promise.resolve()
    },
  }
}
