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
import type { CounterService } from '../../domain/counter-service'
import {
  type FirestoreCounterServiceConfig,
  getFirestoreCounterService,
} from './firestore-counter.service'

describe('Unit tests', () => {
  describe('domains', () => {
    describe('counter', () => {
      describe('infra', () => {
        describe('firestore', () => {
          describe('firestore counter service', () => {
            type Testcase = {
              expected: number
            }
            const cases: Testcase[] = Array.from(Array(4).keys()).map(
              (index) => ({ expected: index + 1 }),
            )
            let counterService: CounterService
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
              const config: FirestoreCounterServiceConfig = {
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
              counterService = getFirestoreCounterService(config)
            })
            test.each(cases)(
              'should increment counter and return value $expected',
              async ({ expected }) => {
                // Given
                firestoreSpanshotExistsMock.mockReturnValue(expected > 1)
                firestoreSnapshot.get.mockResolvedValue(expected)
                // When
                await counterService.increment()
                // Then
                const result = await counterService.getValue()
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
})
