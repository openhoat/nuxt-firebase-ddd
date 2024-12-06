import type {
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
} from 'firebase-admin/firestore'
import {
  type MockInstance,
  type Mocked,
  beforeAll,
  describe,
  expect,
  test,
  vi,
} from 'vitest'
import type { Counter } from '~/counter/domain/counter'
import {
  type FirestoreCounterConfig,
  getFirestoreCounter,
} from '~/counter/infra/firestore/firestore-counter'

describe('Unit tests', () => {
  describe('counter', () => {
    describe('infra', () => {
      describe('firestore', () => {
        describe('firestore counter', () => {
          type Testcase = {
            expected: number
          }
          const cases: Testcase[] = Array.from(Array(4).keys()).map(
            (index) => ({ expected: index + 1 }),
          )
          let counter: Counter
          let firestore: Mocked<Firestore>
          let firestoreCollection: Mocked<CollectionReference>
          let firestoreDocument: Mocked<DocumentReference>
          let firestoreSnapshot: Mocked<DocumentSnapshot>
          let firestoreSpanshotExistsMock: MockInstance
          beforeAll(() => {
            firestore = {
              collection: vi.fn(),
            } as unknown as Mocked<Firestore>
            firestoreCollection = {
              doc: vi.fn(),
            } as unknown as Mocked<CollectionReference>
            firestoreDocument = {
              create: vi.fn(),
              get: vi.fn(),
              update: vi.fn(),
            } as unknown as Mocked<DocumentReference>
            firestoreSnapshot = {
              exists: false,
              get: vi.fn(),
            } as unknown as Mocked<DocumentSnapshot>
            const config: FirestoreCounterConfig = {
              firestore: firestore as unknown as Firestore,
            }
            firestore.collection.mockReturnValue(firestoreCollection)
            firestoreCollection.doc.mockReturnValue(firestoreDocument)
            firestoreDocument.get.mockResolvedValue(firestoreSnapshot)
            firestoreSpanshotExistsMock = vi.spyOn(
              firestoreSnapshot,
              'exists',
              'get',
            )
            counter = getFirestoreCounter(config)
          })
          test.each(cases)(
            'should increment counter and return value $expected',
            async ({ expected }) => {
              // Given
              firestoreSpanshotExistsMock.mockReturnValue(expected > 1)
              firestoreSnapshot.get.mockResolvedValue(expected)
              // When
              await counter.increment()
              // Then
              const result = await counter.getValue()
              expect(result).toBe(expected)
              if (expected === 1) {
                expect(firestoreDocument.create).toHaveBeenCalled()
              }
            },
          )
        })
      })
    })
  })
})
