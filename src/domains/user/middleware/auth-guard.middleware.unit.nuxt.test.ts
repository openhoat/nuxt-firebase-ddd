import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { type Mock, beforeAll, describe, expect, test, vi } from 'vitest'
import type { RouteLocationNormalized } from '#vue-router'
import type { RequireAuthentication } from '../utils/route-protector'

describe('Unit tests', () => {
  describe('domains', () => {
    describe('user', () => {
      describe('middleware', () => {
        describe('auth guard middleware', () => {
          let requireAuthentication: Mock<RequireAuthentication>
          // let authMiddleware: RouteMiddleware
          beforeAll(async () => {
            mockNuxtImport('useAuthStore', () => {
              return () => {
                return { user: null }
              }
            })
            requireAuthentication = vi.fn()
            vi.doMock('../utils/route-protector', () => ({
              requireAuthentication,
            }))
          })
          test('should get user from auth store and pass it to route protector', async () => {
            // Given
            const to = {
              name: '/foo',
            } as RouteLocationNormalized
            const from = {
              name: '/bar',
            } as RouteLocationNormalized
            requireAuthentication.mockReturnValue(undefined)
            const authMiddleware = (await import('./auth-guard.middleware'))
              .default
            // When
            const result = authMiddleware(to, from)
            // Then
            expect(requireAuthentication).toHaveBeenCalledOnce()
            expect(requireAuthentication).toHaveBeenCalledWith(
              to,
              null,
              expect.any(Function),
            )
            expect(result).toBeUndefined()
          })
        })
      })
    })
  })
})
