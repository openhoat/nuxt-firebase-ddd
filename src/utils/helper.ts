export const areNotEmpty = (...args: unknown[]) => {
  for (const o of args) {
    if (typeof o === 'undefined' || o === null || o === '') {
      return false
    }
  }
  return true
}
