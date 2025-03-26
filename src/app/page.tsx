import Header from '@/components/header'
import SignIn from '@/features/auth/components/sign-in'

export default async function Top() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-9rem)]">
        <div className="top-title">
          <h1 className="app-name tektur">pump track</h1>
          <h2 className="tag-line text-center">no pump, no life</h2>
        </div>
        <SignIn />
      </div>
    </>
  )
}
