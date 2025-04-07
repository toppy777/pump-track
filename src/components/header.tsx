'use client'

import UserAvatar from '@/features/auth/components/UserAvatar'
import { Session } from 'next-auth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header({ session }: { session: Session }) {
  const pathname = usePathname()

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
        <div className="flex flex-row">
          <div className="pr-[5svw] flex items-center h-[4svh]">
            ダッシュボード
          </div>
          <div className="pr-[5svw] flex items-center h-[4svh]">
            <Link
              href="/trainings"
              className={
                'px-[2svw] py-[0.5svh] ' +
                (pathname === '/trainings' ? 'nav-current' : '')
              }
            >
              トレーニング
            </Link>
          </div>
          <div className="pr-[5svw] flex items-center h-[4svh]">
            <Link
              href="/exercises"
              className={
                'px-[2svw] py-[0.5svh] ' +
                (pathname === '/exercises' ? 'nav-current' : '')
              }
            >
              種目
            </Link>
          </div>
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
