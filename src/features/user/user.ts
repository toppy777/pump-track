import { User } from 'next-auth'
import { prisma } from '../../lib/prisma'

export async function getUsers(): Promise<User[]> {
  return await prisma.user.findMany()
}
