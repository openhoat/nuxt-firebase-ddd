import type { NuxtApp } from 'nuxt/app'
import {
  type Mock,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest'

describe('Unit tests', () => {
  describe('plugins', () => {
    describe('firebase plugin', () => {
      let initializeAppMock: Mock
      let connectAuthEmulatorMock: Mock
      let getAuthMock: Mock
      let firebasePlugin: { setup: (nuxtApp: NuxtApp) => Promise<void> }
      const firebaseApiKey = 'firebase api key'
      const firebaseAppId = 'firebase app id'
      const firebaseAuthDomain = 'firebase auth domain'
      const firebaseAuthEmulatorUrl = 'http://localhost:1234'
      const firebaseMeasurementId = 'firebase measurement id'
      const firebaseMessagingSenderId = 'firebase messaging sender id'
      const firebaseProjectId = 'firebase project id'
      const firebaseStorageBucket = 'firebase storage bucket'
      const firebaseAppMock = 'firebase app'
      let firebaseAuthMock: { setPersistence: Mock }
      beforeAll(async () => {
        initializeAppMock = vi.fn()
        vi.doMock('firebase/app', () => ({ initializeApp: initializeAppMock }))
        connectAuthEmulatorMock = vi.fn()
        getAuthMock = vi.fn()
        vi.doMock('firebase/auth', () => ({
          browserLocalPersistence: 'NONE',
          connectAuthEmulator: connectAuthEmulatorMock,
          getAuth: getAuthMock,
        }))
        firebasePlugin = (await import('@/plugins/02-firebase.plugin'))
          .default as typeof firebasePlugin
      })
      beforeEach(() => {
        initializeAppMock.mockReturnValue(firebaseAppMock)
        firebaseAuthMock = {
          setPersistence: vi.fn(),
        }
        getAuthMock.mockReturnValue(firebaseAuthMock)
      })
      afterEach(() => {
        vi.resetAllMocks()
      })
      test('should initialize firebase and provide firebase auth given firebase auth emulator enabled', async () => {
        // Given
        const firebaseUseAuthEmulator = true
        const $config = {
          public: {
            firebaseApiKey,
            firebaseAppId,
            firebaseAuthDomain,
            firebaseAuthEmulatorUrl,
            firebaseMeasurementId,
            firebaseMessagingSenderId,
            firebaseProjectId,
            firebaseStorageBucket,
            firebaseUseAuthEmulator,
          },
        }
        const nuxtApp = { $config } as NuxtApp
        getAuthMock.mockReturnValue(firebaseAuthMock)
        // When
        await firebasePlugin.setup(nuxtApp)
        // Then
        expect(initializeAppMock).toHaveBeenCalledOnce()
        expect(initializeAppMock).toHaveBeenCalledWith({
          apiKey: firebaseApiKey,
          appId: firebaseAppId,
          authDomain: firebaseAuthDomain,
          measurementId: firebaseMeasurementId,
          messagingSenderId: firebaseMessagingSenderId,
          projectId: firebaseProjectId,
          storageBucket: firebaseStorageBucket,
        })
        expect(getAuthMock).toHaveBeenCalledOnce()
        expect(getAuthMock).toHaveBeenCalledWith()
        expect(connectAuthEmulatorMock).toHaveBeenCalledOnce()
        expect(connectAuthEmulatorMock).toHaveBeenCalledWith(
          firebaseAuthMock,
          firebaseAuthEmulatorUrl,
        )
        expect(firebaseAuthMock.setPersistence).not.toHaveBeenCalled()
      })
      test('should initialize firebase and provide firebase auth given firebase auth emulator not enabled', async () => {
        // Given
        const firebaseUseAuthEmulator = false
        const $config = {
          public: {
            firebaseApiKey,
            firebaseAppId,
            firebaseAuthDomain,
            firebaseAuthEmulatorUrl,
            firebaseMeasurementId,
            firebaseMessagingSenderId,
            firebaseProjectId,
            firebaseStorageBucket,
            firebaseUseAuthEmulator,
          },
        }
        const nuxtApp = { $config } as NuxtApp
        // When
        await firebasePlugin.setup(nuxtApp)
        // Then
        expect(initializeAppMock).toHaveBeenCalledOnce()
        expect(initializeAppMock).toHaveBeenCalledWith({
          apiKey: firebaseApiKey,
          appId: firebaseAppId,
          authDomain: firebaseAuthDomain,
          measurementId: firebaseMeasurementId,
          messagingSenderId: firebaseMessagingSenderId,
          projectId: firebaseProjectId,
          storageBucket: firebaseStorageBucket,
        })
        expect(getAuthMock).toHaveBeenCalledOnce()
        expect(getAuthMock).toHaveBeenCalledWith(firebaseAppMock)
        expect(connectAuthEmulatorMock).not.toHaveBeenCalled()
        expect(firebaseAuthMock.setPersistence).toHaveBeenCalledOnce()
        expect(firebaseAuthMock.setPersistence).toHaveBeenCalledWith('NONE')
      })
    })
  })
})
