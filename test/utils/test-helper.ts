import type { VueWrapper } from '@vue/test-utils'

export type ComponentWrapper = ReturnType<
  typeof VueWrapper.prototype.findComponent
>
