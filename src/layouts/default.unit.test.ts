// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import type { VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, test } from 'vitest'
import DefaultLayout from '~/layouts/default.vue'

describe('Unit tests', () => {
  describe('layouts', () => {
    describe('default', () => {
      let wrapper: VueWrapper
      beforeEach(async () => {
        wrapper = await mountSuspended(DefaultLayout)
      })
      test('renders the default layout', () => {
        // Then
        expect(wrapper.html()).toMatchSnapshot()
      })
    })
  })
})
