import { type JwtPayload, decode } from 'jsonwebtoken'
import { defineNitroPlugin } from 'nitropack/runtime'
import type { User } from '../../domain/user'

const authorizationBearerPrefix = 'Bearer '

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('request', (event) => {
    const authorization = event.headers.get('Authorization')
    const token = authorization?.startsWith(authorizationBearerPrefix)
      ? authorization.substring(authorizationBearerPrefix.length)
      : undefined
    if (!token) {
      event.context.user = null
      return
    }
    try {
      const jwtPayload = decode(token) as JwtPayload
      const {
        email,
        email_verified: emailVerified,
        firebase: { sign_in_provider: providerId },
        name: displayName,
        picture: photoURL,
        user_id: userId,
      } = jwtPayload as JwtPayload & User
      event.context.user = {
        displayName,
        email,
        emailVerified,
        photoURL,
        userId,
        providerId,
      }
    } catch (err) {
      console.warn(err)
      event.context.user = null
    }
  })
})
