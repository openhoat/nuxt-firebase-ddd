import {
  type EventHandler,
  type H3Event,
  createError,
  defineEventHandler,
} from 'h3'
import { getTaskService } from '../../../../infra/task.service'

const eventHandler: EventHandler = async (
  event: H3Event<{ routerParams: { id: string } }>,
) => {
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
  const task = await taskService.getTask(id)
  if (!task) {
    return createError({
      message: `Resource (id:${id}) not found`,
      status: 404,
    })
  }
  return task
}

export default defineEventHandler(eventHandler)
