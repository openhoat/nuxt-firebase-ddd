import type { Firestore } from 'firebase-admin/firestore'
import type {
  GetTaskService,
  NewTask,
  Task,
  TaskService,
} from '../../domain/task-service'

export type FirestoreTaskServiceConfig = { firestore: Firestore }

export const getFirestoreTaskService: GetTaskService<
  FirestoreTaskServiceConfig
> = ({ firestore }) => {
  const getCollection = () => firestore.collection('tasks')
  const createTask: TaskService['createTask'] = async (task: NewTask) => {
    const collection = getCollection()
    const newDoc = collection.doc()
    const newTask = { ...task, done: !!task.done, id: newDoc.id }
    await newDoc.set(newTask)
    return newTask
  }
  const getTask: TaskService['getTask'] = async (id) => {
    const doc = getCollection().doc(id)
    const snapshot = await doc.get()
    const data = snapshot.data()
    if (!data) {
      return null
    }
    return { id: doc.id, title: data.title, done: data.done }
  }
  const getTasks: TaskService['getTasks'] = async () => {
    const snapshot = await getCollection().get()
    const tasks: Task[] = snapshot.docs.map((doc) => {
      const data = doc.data()
      return { id: doc.id, title: data.title, done: data.done }
    })
    return tasks
  }
  const removeTask: TaskService['removeTask'] = async (id) => {
    const collection = getCollection()
    const doc = collection.doc(id)
    const existingTask = await getTask(id)
    if (!existingTask) {
      return false
    }
    await doc.delete()
    return true
  }
  const updateTask: TaskService['updateTask'] = async (task: Task) => {
    const doc = getCollection().doc(task.id)
    const snapshot = await doc.get()
    const data = snapshot.data()
    if (!data) {
      return null
    }
    await doc.set({ id: doc.id, title: task.title, done: task.done })
    return task
  }
  return { createTask, getTask, getTasks, removeTask, updateTask }
}
