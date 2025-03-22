import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type User = {
  id: number;
  email: string;
  name: string | null;
};

export async function getUsers() : Promise<User[]> {
  return await prisma.user.findMany()
}

export function Home({users}: {users: User[]}) {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        Users: {users.length}
        <ul>
          {users.map((user) => (
            <li key={user.id}>
             {user.id}: {user.name} ({user.email})
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}