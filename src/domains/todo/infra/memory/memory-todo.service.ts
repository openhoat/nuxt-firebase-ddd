import type {
  GetTodoService,
  NewTodo,
  Todo,
  TodoService,
} from '~/domains/todo/domain/todo-service'

const todos: Todo[] = [
  { id: '1', title: 'Buy milk bottle', done: false },
  { id: '2', title: 'Clean the kitchen', done: false },
]

let nextId = todos.length + 1

export const getMemoryTodoService: GetTodoService = () => {
  const cloneTodo = ({ id, title, done }: Todo) => ({ id, title, done })
  const getTodoIndex = (id: string) =>
    Promise.resolve(todos.findIndex((todo) => todo.id === id))
  const createTodo: TodoService['createTodo'] = (todo: NewTodo) => {
    const id = `${nextId++}`
    const newTodo = { ...todo, id, done: !!todo.done }
    todos.push(newTodo)
    return Promise.resolve(newTodo)
  }
  const getTodo: TodoService['getTodo'] = (id: string) => {
    const todo = todos.find((todo) => todo.id === id)
    return Promise.resolve(todo ?? null)
  }
  const getTodos: TodoService['getTodos'] = () =>
    Promise.resolve(todos.map((todo) => cloneTodo(todo)))
  const removeTodo: TodoService['removeTodo'] = async (id) => {
    const existingTodoIndex = await getTodoIndex(id)
    if (existingTodoIndex === -1) {
      return Promise.resolve(false)
    }
    todos.splice(existingTodoIndex, 1)
    return Promise.resolve(true)
  }
  const updateTodo: TodoService['updateTodo'] = async (todo: Todo) => {
    const existingTodoIndex = await getTodoIndex(todo.id)
    if (existingTodoIndex === -1) {
      return Promise.resolve(null)
    }
    todos[existingTodoIndex] = cloneTodo(todo)
    return Promise.resolve(todo)
  }
  return { createTodo, getTodo, getTodos, removeTodo, updateTodo }
}
