import Auth from '@/features/auth/components/auth'
import Users from '@/features/user/components/users'
import { getUsers } from '@/features/user/user'

export default async function UserContainer() {
  const users = await getUsers()
  return (
    <div>
      <Users users={users} />
      <Auth />
    </div>
  )
}
