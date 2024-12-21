import { type EventHandler, createError, defineEventHandler } from 'h3'
import { getTaskService } from '../../../../infra/task.service'

const eventHandler: EventHandler = async (event) => {
  const {
    firebase: { firestore },
    requireAuthentication,
  } = event.context
  if (requireAuthentication) {
    requireAuthentication(event)
  }
  const taskService = getTaskService({ firestore })
  const id = event.context.params?.id
  if (id === undefined) {
    return createError({ message: 'Resource id missing', status: 404 })
  }
  const removed = await taskService.removeTask(id)
  if (!removed) {
    return createError({
      message: `Resource (id:${id}) not found`,
      status: 404,
    })
  }
  return undefined
}

export default defineEventHandler(eventHandler)
