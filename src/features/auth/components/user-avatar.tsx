import { auth } from '@/features/auth/config'
import Image from 'next/image'

export default async function UserAvatar() {
  const session = await auth()

  if (!session?.user) return null

  return (
    <div>
      {session.user.image && (
        <Image
          src={session.user.image}
          alt="User Avatar"
          width={50}
          height={50}
        />
      )}
    </div>
  )
}
