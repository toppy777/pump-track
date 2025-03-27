import { signOut } from '@/features/auth/config'

export default function SignOut() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <button
        type="submit"
        className="w-full bg-white hover:bg-stone-200 transition delay-50 duration-50 ease-out px-10"
      >
        Sign Out
      </button>
    </form>
  )
}
