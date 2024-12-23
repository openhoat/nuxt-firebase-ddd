export type User = {
  displayName?: string
  email?: string
  emailVerified?: boolean
  getJwt: () => Promise<string>
  phoneNumber?: string
  photoURL?: string
  providerId: string
  userId: string
}
