// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import type { VueWrapper } from '@vue/test-utils'
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import type { Component } from 'vue'
import type { BreadcrumbsItem } from '~/utils/breadcrumbs-helper'
import type { ComponentWrapper } from '~~/test/utils/test-helper'
import type { RouteLocationNormalizedLoaded } from '#vue-router'

describe('Unit tests', () => {
  describe('components', () => {
    describe('Breadcrumbs', () => {
      let Breadcrumbs: Component
      let wrapper: VueWrapper
      let components: {
        breadcrumbs: ComponentWrapper
      }
      beforeAll(async () => {
        vi.doMock('#app', () => ({
          useRoute: () =>
            ({
              name: 'bar',
              path: '/foo/bar',
            }) as RouteLocationNormalizedLoaded,
        }))
        vi.doMock('~/utils/breadcrumbs-helper', () => ({
          buildBreadcrumbsItems: () => {
            const items: BreadcrumbsItem[] = [
              { title: 'Home', to: '/' },
              { title: 'Foo', to: '/foo' },
              { title: 'Bar', to: '/foo/bar' },
            ]
            return items
          },
        }))
        Breadcrumbs = (await import('~/components/Breadcrumbs.vue')).default
        components = {
          get breadcrumbs() {
            return wrapper.findComponent({ name: 'v-breadcrumbs' })
          },
        }
      })
      beforeEach(async () => {
        wrapper = await mountSuspended(Breadcrumbs)
      })
      const expectInitialContent = () => {
        expect(components.breadcrumbs.exists()).toBe(true)
        expect(components.breadcrumbs.isVisible()).toBe(true)
        expect(components.breadcrumbs.html()).toMatchSnapshot()
      }
      test('renders a breadcrumbs given a route', () => {
        // Then
        expectInitialContent()
      })
    })
  })
})
