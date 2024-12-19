import type { User } from 'firebase/auth'
import type { GetService } from '~/domains/service'

export type UserService = {
  getCurrentUser: () => User | null
  signIn: () => Promise<User | null>
  signOut: () => Promise<void>
}

export type GetUserService<T = void> = GetService<UserService, T>
