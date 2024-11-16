import { FieldValue, type Firestore } from 'firebase-admin/firestore'

const getCounter = (firestore: Firestore) => {
  const getDocument = () => firestore.collection('util').doc('counter')
  const getSnapshot = () => getDocument().get()
  const getValue = async () => (await getSnapshot()).get('value')
  const increment = async () => {
    const doc = getDocument()
    const snapshot = await getSnapshot()
    if (!snapshot.exists) {
      await doc.create({ value: 0 })
    }
    await doc.update({
      value: FieldValue.increment(1),
    })
    return getValue()
  }
  return { getDocument, getSnapshot, getValue, increment }
}

export { getCounter }
