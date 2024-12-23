import { applyOptionalMiddleware } from '~/utils/nuxt-helper'
import { defineNuxtRouteMiddleware, useNuxtApp } from '#app'

export default defineNuxtRouteMiddleware((to, from) =>
  applyOptionalMiddleware(useNuxtApp(), '$authGuardMiddleware', to, from),
)
