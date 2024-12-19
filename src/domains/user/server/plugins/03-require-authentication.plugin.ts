import { defineNitroPlugin } from 'nitropack/runtime'
import { requireAuthentication } from '../utils/require-authentication'

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('request', (event) => {
    event.context.requireAuthentication = requireAuthentication
  })
})
