import Header from '@/components/header'
import Title from '@/components/title'
import SignIn from '@/features/auth/components/SignIn'
import { auth } from '@/features/auth/config'
import { Session } from 'next-auth'

export default async function Top() {
  const session = await auth()

  return (
    <>
      <Header session={session as Session} />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-9rem)]">
        <Title />
        <SignIn />
      </div>
    </>
  )
}
