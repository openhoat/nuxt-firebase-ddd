// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import type { VueWrapper } from '@vue/test-utils'
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest'
import Login from '~/components/Login.vue'
import type { ComponentWrapper } from '~~/test/unit/components/test-helper'

describe('Unit tests', () => {
  describe('components', () => {
    describe('Login', () => {
      let wrapper: VueWrapper
      let components: {
        loginContainer: ComponentWrapper
        loggedContainer: ComponentWrapper
        notLoggedContainer: ComponentWrapper
        signInButton: ComponentWrapper
        loggedText: ComponentWrapper
        signOutButton: ComponentWrapper
      }
      beforeAll(async () => {
        components = {
          get loginContainer() {
            return wrapper.findComponent('[data-testid="loginContainer"]')
          },
          get loggedContainer() {
            return wrapper.findComponent('[data-testid="loggedContainer"]')
          },
          get notLoggedContainer() {
            return wrapper.findComponent('[data-testid="notLoggedContainer"]')
          },
          get signInButton() {
            return wrapper.findComponent('[data-testid="signInButton"]')
          },
          get loggedText() {
            return wrapper.findComponent('[data-testid="loggedText"]')
          },
          get signOutButton() {
            return wrapper.findComponent('[data-testid="signOutButton"]')
          },
        }
      })
      beforeEach(async () => {
        wrapper = await mountSuspended(Login)
      })
      afterEach(async () => {
        if (components.signOutButton.exists()) {
          await components.signOutButton.trigger('click')
        }
      })
      const expectInitialContent = () => {
        expect(components.loginContainer.exists()).toBe(true)
        expect(components.loginContainer.isVisible()).toBe(true)
        expect(components.loggedContainer.exists()).toBe(false)
        expect(components.notLoggedContainer.exists()).toBe(true)
        expect(components.notLoggedContainer.isVisible()).toBe(true)
        expect(components.loggedText.exists()).toBe(false)
        expect(components.signOutButton.exists()).toBe(false)
        expect(components.signInButton.exists()).toBe(true)
        expect(components.signInButton.isVisible()).toBe(true)
        expect(components.signInButton.text()).toContain('SignIn with Google')
      }
      test('renders a sign in button given the user is not logged in', () => {
        // Then
        expectInitialContent()
      })
      test('renders Hello message with sign out button when user click on sign in', async () => {
        // Given
        expectInitialContent()
        // When
        await components.signInButton.trigger('click')
        await vi.waitUntil(() => !components.notLoggedContainer.exists())
        // Then
        expect(components.loggedContainer.exists()).toBe(true)
        expect(components.loggedContainer.isVisible()).toBe(true)
        expect(components.signInButton.exists()).toBe(false)
        expect(components.signOutButton.exists()).toBe(true)
        expect(components.signOutButton.isVisible()).toBe(true)
        expect(components.loggedText.exists()).toBe(true)
        expect(components.loggedText.isVisible()).toBe(true)
        expect(components.loggedText.text()).toBe('Hello John Doe!')
      })
      test('renders a sign in button given the user logged in then logged out', async () => {
        // Given
        expectInitialContent()
        await components.signInButton.trigger('click')
        await vi.waitUntil(() => !components.notLoggedContainer.exists())
        expect(components.loggedContainer.exists()).toBe(true)
        expect(components.loggedContainer.isVisible()).toBe(true)
        expect(components.signOutButton.exists()).toBe(true)
        expect(components.signOutButton.isVisible()).toBe(true)
        // When
        await components.signOutButton.trigger('click')
        await vi.waitUntil(() => !components.loggedContainer.exists())
        // Then
        expectInitialContent()
      })
    })
  })
})
