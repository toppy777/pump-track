import { getUsers } from "../features/user/user";
import Users from "../features/user/components/users";

export default async function  UserContainer() {
  const users = await getUsers()
  return <Users users={users} />
}
