import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type User = {
  id: number;
  email: string;
  name: string | null;
};

export async function getUsers() {
  return await prisma.user.findMany()
}