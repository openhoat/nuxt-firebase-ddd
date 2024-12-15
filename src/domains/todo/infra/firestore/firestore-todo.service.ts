import type { Firestore } from 'firebase-admin/firestore'
import type {
  GetTodoService,
  NewTodo,
  Todo,
  TodoService,
} from '~/domains/todo/domain/todo-service'

export type FirestoreTodoServiceConfig = { firestore: Firestore }

export const getFirestoreTodoService: GetTodoService<
  FirestoreTodoServiceConfig
> = ({ firestore }) => {
  const getCollection = () => firestore.collection('todos')
  const createTodo: TodoService['createTodo'] = async (todo: NewTodo) => {
    const collection = getCollection()
    const newDoc = collection.doc()
    const newTodo = { ...todo, done: !!todo.done, id: newDoc.id }
    await newDoc.set(newTodo)
    return newTodo
  }
  const getTodo: TodoService['getTodo'] = async (id) => {
    const doc = getCollection().doc(id)
    const snapshot = await doc.get()
    const data = snapshot.data()
    if (!data) {
      return null
    }
    return { id: doc.id, title: data.title, done: data.done }
  }
  const getTodos: TodoService['getTodos'] = async () => {
    const snapshot = await getCollection().get()
    const todos: Todo[] = snapshot.docs.map((doc) => {
      const data = doc.data()
      return { id: doc.id, title: data.title, done: data.done }
    })
    return todos
  }
  const removeTodo: TodoService['removeTodo'] = async (id) => {
    const collection = getCollection()
    const doc = collection.doc(id)
    const existingTodo = await getTodo(id)
    if (!existingTodo) {
      return false
    }
    await doc.delete()
    return true
  }
  const updateTodo: TodoService['updateTodo'] = async (todo: Todo) => {
    console.log('todo:', todo)
    const doc = getCollection().doc(todo.id)
    const snapshot = await doc.get()
    const data = snapshot.data()
    if (!data) {
      return null
    }
    await doc.set({ id: doc.id, title: todo.title, done: todo.done })
    return todo
  }
  return { createTodo, getTodo, getTodos, removeTodo, updateTodo }
}
