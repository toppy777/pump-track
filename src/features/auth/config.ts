import { prisma } from '@/lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth, { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Google from 'next-auth/providers/google'

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    session({ session, token }: { session: Session; token: JWT }) {
      if (
        session.user !== undefined &&
        typeof token.id === 'string' &&
        token.id !== undefined &&
        token.id !== null
      ) {
        session.user.id = token.id
      }
      return session
    },
  },
})
