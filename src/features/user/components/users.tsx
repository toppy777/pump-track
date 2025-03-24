import { User } from "next-auth";

export default function Users({users}: {users: User[]}) {
  return (
    <div>
        Users: {users.length}
        <ul>
          {users.map((user) => (
            <li key={user.id}>
             {user.id}: {user.name} ({user.email})
            </li>
          ))}
        </ul>
    </div>
  )
}