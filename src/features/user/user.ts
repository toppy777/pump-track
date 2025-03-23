import { prisma } from "../../lib/prisma";

export type User = {
  id: number;
  email: string;
  name: string | null;
}

export async function getUsers() : Promise<User[]> {
  return await prisma.user.findMany()
}

export async function createUser(email: string, name: string) {
  return await prisma.user.create({
    data: {
      email: email,
      name: name
    }})
}