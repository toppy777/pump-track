'use server'

import { signIn as signInFromAuth } from '@/features/auth/config'

export default async function signIn() {
  await signInFromAuth('google', { redirectTo: '/trainings' })
}
