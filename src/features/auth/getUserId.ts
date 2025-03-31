import { auth } from '@/features/auth/config'

export default async function getUserId() {
  const session = await auth()

  if (session === null) {
    console.log('セッションがnullです')
    return ''
  }

  if (session.user === undefined) {
    console.log('セッションのユーザーがundefinedです')
    return ''
  }

  if (session.user.id === undefined) {
    console.log('セッションのユーザーIDがundefinedです')
    return ''
  }

  return session.user.id
}
