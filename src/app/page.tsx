import SignIn from '@/features/auth/components/sign-in'

export default async function Top() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="app-name tektur">pump track</h1>
      <SignIn />
    </div>
  )
}
