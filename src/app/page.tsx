import { Home, getUsers } from "./lib/users";

export default async function  UserContainer() {
  const users = await getUsers()
  return <Home users={users} />
}
