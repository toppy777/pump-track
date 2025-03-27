import UserAvatar from '@/features/auth/components/user-avatar'
import { auth } from '@/features/auth/config'
import Link from 'next/link'

export default async function Header() {
  const session = await auth()

  return (
    <header>
      <nav className="nav-bar flex justify-between px-8 py-4">
        <div className="header-el py-1 px-3">
          <Link href="/" className="header-top-link">
            pump track
          </Link>
        </div>
        <div>
          {session !== null && session.user !== undefined ? (
            <UserAvatar />
          ) : (
            <Link
              href="/about"
              className="header-about-link header-el py-1 px-3"
            >
              about
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
