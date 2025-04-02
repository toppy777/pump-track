'use client'

import UserAvatar from '@/features/auth/components/UserAvatar'
import { Session } from 'next-auth'
import Link from 'next/link'

export default function Header({ session }: { session: Session }) {
  return (
    <header className="h-[6svh]">
      <nav className="nav-bar flex items-center justify-between h-full">
        <div className="pl-[3svw] flex items-cneter h-[4svh]">
          {/* TODO: ロゴの文字が少し低い */}
          <Link
            href="/"
            className="header-top-link block px-[2svw] py-[0.5svh]"
          >
            pump track
          </Link>
        </div>
        <div className="pr-[5svw] flex items-center h-[4svh]">
          {session !== null && session.user !== undefined ? (
            <UserAvatar session={session} />
          ) : (
            <Link href="/about" className="header-about-link header-el block">
              about
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
