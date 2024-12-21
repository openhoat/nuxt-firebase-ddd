import type {
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
} from 'firebase-admin/firestore'
import {
  // type MockInstance,
  type Mocked,
  beforeAll,
  describe,
  expect,
  test,
  vi,
} from 'vitest'
import type { NewTask, TaskService } from '../../domain/task-service'
import type { FirestoreTaskServiceConfig } from './firestore-task.service'
import { getFirestoreTaskService } from './firestore-task.service'

describe('Unit tests', () => {
  describe('domains', () => {
    describe('task', () => {
      describe('infra', () => {
        describe('firestore', () => {
          describe('task service', () => {
            let taskService: TaskService
            let firestore: Mocked<Firestore>
            let firestoreCollection: Mocked<CollectionReference>
            let firestoreDocument: Mocked<DocumentReference>
            let firestoreSnapshot: Mocked<DocumentSnapshot>
            // let firestoreSpanshotExistsMock: MockInstance
            beforeAll(() => {
              firestore = {
                collection: vi.fn(),
              } as unknown as Mocked<Firestore>
              firestoreCollection = {
                doc: vi.fn(),
                get: vi.fn(),
              } as unknown as Mocked<CollectionReference>
              firestoreDocument = {
                id: '123',
                create: vi.fn(),
                get: vi.fn(),
                update: vi.fn(),
                set: vi.fn(),
              } as unknown as Mocked<DocumentReference>
              firestoreSnapshot = {
                exists: false,
                get: vi.fn(),
              } as unknown as Mocked<DocumentSnapshot>
              const config: FirestoreTaskServiceConfig = {
                firestore: firestore as unknown as Firestore,
              }
              firestore.collection.mockReturnValue(firestoreCollection)
              firestoreCollection.doc.mockReturnValue(firestoreDocument)
              firestoreDocument.get.mockResolvedValue(firestoreSnapshot)
              taskService = getFirestoreTaskService(config)
            })
            describe('createTask', async () => {
              test('should create a task', async () => {
                // Given
                const task: NewTask = {
                  title: 'foo',
                }
                // When
                const result = await taskService.createTask(task)
                // Then
                expect(firestore.collection).toHaveBeenCalledTimes(1)
                expect(firestore.collection).toHaveBeenCalledWith('tasks')
                expect(firestoreCollection.doc).toHaveBeenCalledTimes(1)
                expect(firestoreCollection.doc).toHaveBeenCalledWith()
                expect(firestoreDocument.set).toHaveBeenCalledTimes(1)
                expect(firestoreDocument.set).toHaveBeenCalledWith({
                  done: false,
                  id: '123',
                  title: 'foo',
                })
                expect(result).toStrictEqual({
                  done: false,
                  id: '123',
                  title: 'foo',
                })
              })
            })
          })
        })
      })
    })
  })
})
