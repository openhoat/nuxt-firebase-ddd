import type { Firestore } from 'firebase-admin/firestore'
import type { GetCounterService } from '../domain/counter-service'
import { getFirestoreCounterService } from '../infra/firestore/firestore-counter.service'
import { getMemoryCounterService } from '../infra/memory/memory-counter.service'

export type CounterServiceConfig = { firestore?: Firestore }

export const getCounterService: GetCounterService<CounterServiceConfig> = (
  config,
) => {
  const { firestore } = config
  return firestore
    ? getFirestoreCounterService({ firestore })
    : getMemoryCounterService()
}
