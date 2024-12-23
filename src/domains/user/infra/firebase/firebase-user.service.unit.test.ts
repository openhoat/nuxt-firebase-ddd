import type { Auth } from 'firebase/auth'
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import type { User } from '../../domain/user'
import type { GetUserService, UserService } from '../../domain/user-service'
import type { FirebaseUserServiceConfig } from './firebase-user.service'

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
                  fakeUser = {
                    displayName: 'John Doe',
                    email: 'johndoe@local.io',
                    getJwt: vi.fn(),
                    providerId: 'test',
                    userId: 'user-id',
                  }
                  return Promise.resolve({ user: fakeUser })
                }),
                signOut: vi.fn(() => {
                  fakeUser = null
                  return Promise.resolve()
                }),
              }))
              getFirebaseUserService = (await import('./firebase-user.service'))
                .getFirebaseUserService
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
                // Given
                const expectedResult = {
                  displayName: 'John Doe',
                  email: 'johndoe@local.io',
                  getJwt: expect.any(Function),
                  providerId: 'test',
                }
                // When
                const result = await userService.signIn()
                // Then
                expect(result).toMatchObject(expectedResult)
                expect(userService.getCurrentUser()).toMatchObject(
                  expectedResult,
                )
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
