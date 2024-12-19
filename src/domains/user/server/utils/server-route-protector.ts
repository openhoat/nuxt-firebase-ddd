import { type H3Event, createError } from 'h3'

export const requireAuthentication = (event: H3Event) => {
  const { user } = event.context
  if (user !== null) {
    return
  }
  console.warn(`User not logged in: server route ${event.path} is forbidden`)
  throw createError({
    message: `Resource ${event.path} is forbidden`,
    stack: undefined,
    status: 403,
    statusMessage: 'Not logged in',
  })
}
