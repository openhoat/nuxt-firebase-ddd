// @vitest-environment nuxt
import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import type { VueWrapper } from '@vue/test-utils'
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import type { ComponentWrapper } from '~~/test/utils/test-helper'
import Hello from './Hello.vue'

describe('Unit tests', () => {
  describe('domains', () => {
    describe('hello', () => {
      describe('components', () => {
        describe('Hello', () => {
          let wrapper: VueWrapper
          let components: {
            helloContainer: ComponentWrapper
            helloButton: ComponentWrapper
            helloText: ComponentWrapper
          }
          beforeAll(async () => {
            registerEndpoint('/api/hello', () => ({ hello: 'fake world!' }))
            components = {
              get helloContainer() {
                return wrapper.findComponent('[data-testid="helloContainer"]')
              },
              get helloButton() {
                return wrapper.findComponent('[data-testid="helloButton"]')
              },
              get helloText() {
                return wrapper.findComponent('[data-testid="helloText"]')
              },
            }
          })
          beforeEach(async () => {
            wrapper = await mountSuspended(Hello)
          })
          const expectInitialContent = () => {
            expect(components.helloContainer.exists()).toBe(true)
            expect(components.helloContainer.isVisible()).toBe(true)
            expect(components.helloButton.isVisible()).toBe(true)
            expect(components.helloButton.text()).toContain('Hello')
            expect(components.helloText.exists()).toBe(true)
            expect(components.helloText.isVisible()).toBe(true)
            expect(components.helloText.text()).toBe('')
          }
          test('renders a Hello button and an empty v-card-text', () => {
            // Then
            expectInitialContent()
          })
          test('renders "fake world!" after click on Hello button', async () => {
            // Given
            expectInitialContent()
            // When
            await components.helloButton.trigger('click')
            await vi.waitUntil(() => components.helloText.text())
            // Then
            expect(components.helloText.text()).toContain('fake world!')
          })
          test('renders empty after click twice on Hello button', async () => {
            // Given
            expectInitialContent()
            await components.helloButton.trigger('click')
            await vi.waitUntil(() => components.helloText.text())
            // When
            await components.helloButton.trigger('click')
            await vi.waitUntil(() => !components.helloText.text())
            // Then
            expect(components.helloText.text()).toBe('')
          })
          test('renders again "fake world!" after click 3 times on Hello button', async () => {
            // Given
            expectInitialContent()
            await components.helloButton.trigger('click')
            await vi.waitUntil(() => components.helloText.text())
            await components.helloButton.trigger('click')
            await vi.waitUntil(() => !components.helloText.text())
            // When
            await components.helloButton.trigger('click')
            await vi.waitUntil(() => components.helloText.text())
            // Then
            expect(components.helloText.text()).toContain('fake world!')
          })
        })
      })
    })
  })
})
