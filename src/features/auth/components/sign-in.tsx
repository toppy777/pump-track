import { signIn } from '@/features/auth/config'

export default function SignIn() {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('google')
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )
}
