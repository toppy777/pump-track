import { Button } from '@/components/ui/button'
import signOut from '@/features/auth/signOut'

export default function SignOut({ className }: { className?: string }) {
  return (
    <form
      action={async () => {
        await signOut()
      }}
    >
      <Button type="submit" className={`cursor-pointer ${className}`}>
        Sign out
      </Button>
    </form>
  )
}
