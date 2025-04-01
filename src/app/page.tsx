import Header from '@/components/header'
import Title from '@/components/title'
import SignIn from '@/features/auth/components/SignIn'

export default async function Top() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-9rem)]">
        <Title />
        <SignIn />
      </div>
    </>
  )
}
