// @vitest-environment nuxt
import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import type { VueWrapper } from '@vue/test-utils'
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import type { ComponentWrapper } from '~~/test/utils/test-helper'
import Counter from './Counter.vue'

describe('Unit tests', () => {
  describe('domains', () => {
    describe('counter', () => {
      describe('components', () => {
        describe('Counter', () => {
          let wrapper: VueWrapper
          let components: {
            counterContainer: ComponentWrapper
            counterButton: ComponentWrapper
            counterText: ComponentWrapper
          }
          beforeAll(async () => {
            registerEndpoint('/api/counter', () => ({ value: 123 }))
            components = {
              get counterContainer() {
                return wrapper.findComponent('[data-testid="counterContainer"]')
              },
              get counterButton() {
                return wrapper.findComponent('[data-testid="counterButton"]')
              },
              get counterText() {
                return wrapper.findComponent('[data-testid="counterText"]')
              },
            }
          })
          beforeEach(async () => {
            wrapper = await mountSuspended(Counter)
          })
          const expectInitialContent = () => {
            expect(components.counterContainer.exists()).toBe(true)
            expect(components.counterContainer.isVisible()).toBe(true)
            expect(components.counterButton.exists()).toBe(true)
            expect(components.counterButton.isVisible()).toBe(true)
            expect(components.counterButton.text()).toContain('Counter')
            expect(components.counterText.exists()).toBe(true)
            expect(components.counterText.isVisible()).toBe(true)
            expect(components.counterText.text()).toBe('')
          }
          test('renders a Counter button and an empty v-card-text', () => {
            // Then
            expectInitialContent()
          })
          test('renders counter value after click on Counter button', async () => {
            // Given
            expectInitialContent()
            // When
            await components.counterButton.trigger('click')
            await vi.waitUntil(() => components.counterText.text())
            // Then
            expect(components.counterText.text()).toBe('123')
          })
        })
      })
    })
  })
})
