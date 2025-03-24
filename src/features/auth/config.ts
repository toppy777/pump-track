import { prisma } from '@/lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(prisma),
})
