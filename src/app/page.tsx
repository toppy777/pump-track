import { getUsers } from "@/features/user/user";
import Users from "@/features/user/components/users";
import Auth from "@/features/auth/components/auth";

export default async function  UserContainer() {
  const users = await getUsers()
  return (
    <div>
      <Users users={users} />
      <Auth />
    </div>
  )
}
