import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <nav className="nav-bar flex justify-between px-8 py-4">
        <div className="header-el py-1 px-3">
          <Link href="/" className="header-top-link">
            pump track
          </Link>
        </div>
        <div className="header-el py-1 px-3">
          <Link href="/about" className="header-about-link">
            about
          </Link>
        </div>
      </nav>
    </header>
  )
}
