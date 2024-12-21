import {
  type EventHandler,
  createError,
  defineEventHandler,
  readBody,
} from 'h3'
import { getTaskService } from '../../../../infra/task.service'

export type TaskPayload = Partial<{
  title: string
  done: boolean
}>

const eventHandler: EventHandler<{ body: TaskPayload }> = async (event) => {
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
  const payload = await readBody(event)
  const taskPatch = { ...task }
  if (payload.title) {
    taskPatch.title = payload.title
  }
  if (payload.done !== undefined) {
    taskPatch.done = payload.done
  }
  return taskService.updateTask(taskPatch)
}

export default defineEventHandler(eventHandler)
