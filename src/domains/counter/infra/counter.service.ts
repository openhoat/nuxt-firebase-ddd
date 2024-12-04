import type { Firestore } from 'firebase-admin/firestore'
import type { GetCounterService } from '~/domains/counter/domain/counter-service'
import { getFirestoreCounterService } from '~/domains/counter/infra/firestore/firestore-counter.service'
import { getMemoryCounterService } from '~/domains/counter/infra/memory/memory-counter.service'

export type CounterServiceConfig = { firestore?: Firestore }

export const getCounterService: GetCounterService<CounterServiceConfig> = (
  config,
) => {
  const { firestore } = config
  return firestore
    ? getFirestoreCounterService({ firestore })
    : getMemoryCounterService()
}
