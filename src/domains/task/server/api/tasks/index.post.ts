import { type EventHandler, defineEventHandler, readBody } from 'h3'
import { getTaskService } from '../../../infra/task.service'

export type TasksPostPayload = {
  title: string
  done?: string
}

const eventHandler: EventHandler = async (event) => {
  const {
    firebase: { firestore },
    requireAuthentication,
  } = event.context
  if (requireAuthentication) {
    requireAuthentication(event)
  }
  const taskService = getTaskService({ firestore })
  const payload = await readBody<TasksPostPayload>(event)
  const task = { title: payload.title, done: payload.done === 'true' }
  return taskService.createTask(task)
}

export default defineEventHandler(eventHandler)
