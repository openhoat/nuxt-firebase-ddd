import type { Auth, User } from 'firebase/auth'
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import type {
  GetUserService,
  UserService,
} from '~/domains/user/domain/user-service'
import type { FirebaseUserServiceConfig } from '~/domains/user/infra/firebase/firebase-user.service'

describe('Unit tests', () => {
  describe('domains', () => {
    describe('counter', () => {
      describe('infra', () => {
        describe('firebase', () => {
          describe('firebase user service', () => {
            let getFirebaseUserService: GetUserService<FirebaseUserServiceConfig>
            let userService: UserService
            let firebaseAuth: Auth
            let fakeUser: User | null
            beforeAll(async () => {
              vi.doMock('firebase/auth', () => ({
                GoogleAuthProvider: vi.fn(),
                signInWithPopup: vi.fn(() => {
                  fakeUser = { displayName: 'John Doe' } as User
                  return Promise.resolve({ user: fakeUser })
                }),
                signOut: vi.fn(() => {
                  fakeUser = null
                  return Promise.resolve()
                }),
              }))
              getFirebaseUserService = (
                await import(
                  '~/domains/user/infra/firebase/firebase-user.service'
                )
              ).getFirebaseUserService
              firebaseAuth = {} as unknown as Auth
              Object.defineProperty(firebaseAuth, 'currentUser', {
                get: () => fakeUser,
              })
              const config: FirebaseUserServiceConfig = {
                firebaseAuth: firebaseAuth as unknown as Auth,
              }
              userService = getFirebaseUserService(config)
            })
            beforeEach(() => {
              fakeUser = null
            })
            describe('signIn', () => {
              test('should sign in user', async () => {
                // When
                const result = await userService.signIn()
                // Then
                expect(result).toStrictEqual(fakeUser)
                expect(userService.getCurrentUser()).toStrictEqual(fakeUser)
              })
            })
            describe('signIn', () => {
              test('should sign in user', async () => {
                // Given
                await userService.signIn()
                // When
                await userService.signOut()
                // Then
                expect(userService.getCurrentUser()).toStrictEqual(null)
              })
            })
          })
        })
      })
    })
  })
})
