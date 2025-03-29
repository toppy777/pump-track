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
        className="w-full bg-stone-500 text-white hover:bg-stone-400 transition duration-150 ease-out px-10 mt-2 mb-1 rounded-md cursor-pointer"
      >
        Sign out
      </button>
    </form>
  )
}
