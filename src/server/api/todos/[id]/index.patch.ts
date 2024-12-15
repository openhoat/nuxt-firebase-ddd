import {
  type EventHandler,
  createError,
  defineEventHandler,
  readBody,
} from 'h3'
import { getTodoService } from '~/domains/todo/infra/todo.service'

export type TodoPayload = Partial<{
  title: string
  done: boolean
}>

const eventHandler: EventHandler<{ body: TodoPayload }> = async (event) => {
  const { firestore } = event.context.firebase
  const counterService = getTodoService({ firestore })
  const id = event.context.params?.id
  if (id === undefined) {
    return createError({ message: 'Resource id missing', status: 404 })
  }
  const todo = await counterService.getTodo(id)
  console.log('todo:', todo)
  if (!todo) {
    return createError({
      message: `Resource (id:${id}) not found`,
      status: 404,
    })
  }
  const payload = await readBody(event)
  console.log('payload:', payload)
  const todoPatch = { ...todo }
  if (payload.title) {
    todoPatch.title = payload.title
  }
  if (payload.done !== undefined) {
    todoPatch.done = payload.done
  }
  return counterService.updateTodo(todoPatch)
}

export default defineEventHandler(eventHandler)
