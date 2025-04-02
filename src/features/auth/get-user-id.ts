'use server'

import { auth } from '@/features/auth/config'

export default async function getUserId() {
  const session = await auth()

  if (session == null) {
    console.log('セッションがnullです')
    return ''
  }

  if (session.user == null) {
    console.log('セッションのユーザーがundefinedです')
    return ''
  }

  if (session.user.id == null) {
    console.log('セッションのユーザーIDがundefinedです')
    return ''
  }

  return session.user.id
}
