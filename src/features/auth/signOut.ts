'use server'

import { signOut as signOutFromAuth } from '@/features/auth/config'

export default async function signOut() {
  await signOutFromAuth()
}
