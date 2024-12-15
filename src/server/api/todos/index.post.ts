import { type EventHandler, defineEventHandler, readBody } from 'h3'
import { getTodoService } from '~/domains/todo/infra/todo.service'

export type TodosPostPayload = {
  title: string
  done?: string
}

const eventHandler: EventHandler = async (event) => {
  const { firestore } = event.context.firebase
  const counterService = getTodoService({ firestore })
  const payload = await readBody<TodosPostPayload>(event)
  const todo = { title: payload.title, done: payload.done === 'true' }
  return counterService.createTodo(todo)
}

export default defineEventHandler(eventHandler)
