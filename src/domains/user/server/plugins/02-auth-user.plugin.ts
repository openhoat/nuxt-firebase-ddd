import { getCookie } from 'h3'
import { type JwtPayload, decode } from 'jsonwebtoken'
import type { AuthUser } from '~/domains/user/types'

export type FirestoreAuthUser = {
  auth_time?: number
  email: string
  email_verified?: boolean
  name: string
  picture?: string
  user_id: string
}

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('request', (event) => {
    const userJwt = getCookie(event, 'userJwt')
    if (!userJwt) {
      event.context.user = null
      return
    }
    try {
      const {
        auth_time: authTime,
        email,
        email_verified: emailVerified,
        name,
        picture,
        user_id: userId,
      } = decode(userJwt) as JwtPayload & FirestoreAuthUser
      const user: AuthUser = {
        authTime,
        email,
        emailVerified,
        name,
        picture,
        userId,
      }
      event.context.user = user
    } catch (err) {
      console.warn(err)
      event.context.user = null
    }
  })
})
