import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { type Mock, beforeAll, describe, expect, test, vi } from 'vitest'
import type { ProtectRoutes } from '~/utils/route-protector'
import type { RouteLocationNormalized } from '#vue-router'

describe('Unit tests', () => {
  describe('middleware', () => {
    describe('auth middleware', () => {
      let protectRoutesMock: Mock<ProtectRoutes>
      // let authMiddleware: RouteMiddleware
      beforeAll(async () => {
        mockNuxtImport('useAuthStore', () => {
          return () => {
            return { user: null }
          }
        })
        protectRoutesMock = vi.fn()
        vi.doMock('~/utils/route-protector', () => ({
          protectRoutes: protectRoutesMock,
        }))
      })
      test('should get user from auth store and pass it authMiddleware', async () => {
        // Given
        const to = {
          name: '/foo',
        } as RouteLocationNormalized
        const from = {
          name: '/bar',
        } as RouteLocationNormalized
        protectRoutesMock.mockReturnValue(undefined)
        const authMiddleware = (await import('~/middleware/auth.middleware'))
          .default
        // When
        const result = authMiddleware(to, from)
        // Then
        expect(protectRoutesMock).toHaveBeenCalledOnce()
        expect(protectRoutesMock).toHaveBeenCalledWith(
          to,
          null,
          expect.any(Function),
        )
        expect(result).toBeUndefined()
      })
    })
  })
})
