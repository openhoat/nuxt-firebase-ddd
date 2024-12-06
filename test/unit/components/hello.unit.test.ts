// @vitest-environment nuxt
import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import type { VueWrapper } from '@vue/test-utils'
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import Hello from '~/components/Hello.vue'

describe('Unit tests', () => {
  describe('components', () => {
    describe('Hello', () => {
      let wrapper: VueWrapper
      beforeAll(async () => {
        registerEndpoint('/api/hello', () => ({ hello: 'fake world!' }))
      })
      beforeEach(async () => {
        wrapper = await mountSuspended(Hello)
      })
      const expectInitialContent = () => {
        const helloButton = wrapper.findComponent({ name: 'v-btn' })
        const helloText = wrapper.findComponent({ name: 'v-card-text' })
        expect(helloButton.exists() && helloButton.isVisible()).toBe(true)
        expect(helloButton.text()).toContain('Hello')
        expect(helloText.exists() && helloText.isVisible()).toBe(true)
        expect(helloText.text()).toBe('')
        return { helloButton, helloText }
      }
      test('renders a Hello button and an empty v-card-text', () => {
        // Then
        expectInitialContent()
      })
      test('renders "fake world!" after click on Hello button', async () => {
        // Given
        const { helloButton, helloText } = expectInitialContent()
        // When
        await helloButton.trigger('click')
        await vi.waitUntil(() => helloText.text())
        // Then
        expect(helloText.text()).toContain('fake world!')
      })
      test('renders empty after click twice on Hello button', async () => {
        // Given
        const { helloButton, helloText } = expectInitialContent()
        await helloButton.trigger('click')
        await vi.waitUntil(() => helloText.text())
        // When
        await helloButton.trigger('click')
        await vi.waitUntil(() => !helloText.text())
        // Then
        expect(helloText.text()).toBe('')
      })
      test('renders again "fake world!" after click 3 times on Hello button', async () => {
        // Given
        const { helloButton, helloText } = expectInitialContent()
        await helloButton.trigger('click')
        await vi.waitUntil(() => helloText.text())
        await helloButton.trigger('click')
        await vi.waitUntil(() => !helloText.text())
        // When
        await helloButton.trigger('click')
        await vi.waitUntil(() => helloText.text())
        // Then
        expect(helloText.text()).toContain('fake world!')
      })
    })
  })
})
