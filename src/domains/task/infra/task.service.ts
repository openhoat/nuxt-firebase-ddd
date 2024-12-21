import type { Firestore } from 'firebase-admin/firestore'
import type { GetTaskService } from '../domain/task-service'
import { getFirestoreTaskService } from './firestore/firestore-task.service'
import { getMemoryTaskService } from './memory/memory-task.service'

export type TaskServiceConfig = { firestore?: Firestore }

export const getTaskService: GetTaskService<TaskServiceConfig> = (config) => {
  const { firestore } = config
  return firestore
    ? getFirestoreTaskService({ firestore })
    : getMemoryTaskService()
}
