import type { User } from 'firebase/auth'
import type { GetUserService } from '~/domains/user/domain/user-service'

export const getMemoryUserService: GetUserService = () => {
  const user: { value: User | null } = { value: null }
  return {
    getCurrentUser: () => user.value,
    signIn: () => {
      user.value = { displayName: 'John Doe' } as User
      return Promise.resolve(user.value)
    },
    signOut: () => {
      user.value = null
      return Promise.resolve()
    },
  }
}
