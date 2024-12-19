import { requireAuthentication } from '~/domains/user/server/utils/server-route-protector'

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('request', (event) => {
    event.context.requireAuthentication = requireAuthentication
  })
})
