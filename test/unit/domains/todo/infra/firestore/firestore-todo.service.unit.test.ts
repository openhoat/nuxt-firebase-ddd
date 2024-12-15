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
import type { FirestoreCounterServiceConfig } from '~/domains/counter/infra/firestore/firestore-counter.service'
import type { NewTodo, TodoService } from '~/domains/todo/domain/todo-service'
import { getFirestoreTodoService } from '~/domains/todo/infra/firestore/firestore-todo.service'

describe('Unit tests', () => {
  describe('domains', () => {
    describe('todo', () => {
      describe('infra', () => {
        describe('firestore', () => {
          describe('todo service', () => {
            let todoService: TodoService
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
              const config: FirestoreCounterServiceConfig = {
                firestore: firestore as unknown as Firestore,
              }
              firestore.collection.mockReturnValue(firestoreCollection)
              firestoreCollection.doc.mockReturnValue(firestoreDocument)
              firestoreDocument.get.mockResolvedValue(firestoreSnapshot)
              // firestoreSpanshotExistsMock = vi.spyOn(
              //   firestoreSnapshot,
              //   'exists',
              //   'get',
              // )
              todoService = getFirestoreTodoService(config)
            })
            describe('createTodo', async () => {
              test('should create a todo', async () => {
                // Given
                const todo: NewTodo = {
                  title: 'foo',
                }
                // When
                const result = await todoService.createTodo(todo)
                // Then
                expect(firestore.collection).toHaveBeenCalledTimes(1)
                expect(firestore.collection).toHaveBeenCalledWith('todos')
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
