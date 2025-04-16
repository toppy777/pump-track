'use client'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import UserAvatar, {
  UserAvatarInDrawer,
} from '@/features/auth/components/UserAvatar'
import { Session } from 'next-auth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TbMenu4 } from 'react-icons/tb'

export default function Header({ session }: { session: Session }) {
  const pathname = usePathname()

  const navLinkStyle =
    'w-50 text-center py-2 rounded-md hover:bg-[#292929] hover:text-white duration-100 ease-out cursor-pointer'

  const navCurrent = 'rounded-md bg-[#292929] text-white'

  const navLinkInDrawerStyle =
    'mb-2 text-[1.3rem] px-5 py-3 rounded-md hover:bg-[#292929] hover:text-white  duration-100 ease-out cursor-pointer'

  return (
    <header className="md:h-15 sticky top-0 md:bg-white z-10">
      <nav className="nav-bar hidden md:flex items-center justify-between h-full">
        <div className="pl-[3svw] flex items-cneter h-10">
          {/* TODO: ロゴの文字が少し低い */}
          <Link
            href={
              session !== null && session.user !== undefined
                ? '/trainings'
                : '/'
            }
            className="header-top-link block px-[2svw] py-[0.5svh]"
          >
            pump track
          </Link>
        </div>
        <div className="flex flex-row">
          <div className="pr-[5svw] flex items-center h-10">
            {session !== null && session.user !== undefined ? (
              <Link
                href="/trainings"
                className={
                  navLinkStyle + (pathname === '/trainings' ? navCurrent : '')
                }
              >
                トレーニング
              </Link>
            ) : (
              ''
            )}
          </div>
          <div className="pr-[5svw] flex items-center h-10">
            {session !== null && session.user !== undefined ? (
              <Link
                href="/exercises"
                className={
                  navLinkStyle + (pathname === '/exercises' ? navCurrent : '')
                }
              >
                種目
              </Link>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="pr-[5svw] flex items-center h-10">
          {session !== null && session.user !== undefined ? (
            <UserAvatar session={session} />
          ) : (
            <Link href="/about" className="header-about-link header-el block">
              about
            </Link>
          )}
        </div>
      </nav>
      <div className="md:hidden flex items-end justify-end">
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <TbMenu4
              size={80}
              className="mt-3 mr-3 cursor-pointer hover:opacity-75 duration-100 ease-out"
            />
          </DrawerTrigger>
          <DrawerContent className="py-20 px-5">
            <DrawerHeader>
              <DrawerTitle className="text-[1.5rem] tracking-[0.1rem] text-[#292929]">
                pump track
              </DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col">
              <DrawerClose asChild>
                <Link
                  href="/trainings"
                  className={
                    navLinkInDrawerStyle +
                    (pathname === '/trainings' ? navCurrent : '')
                  }
                >
                  トレーニング
                </Link>
              </DrawerClose>
              <DrawerClose asChild>
                <Link
                  href="/exercises"
                  className={
                    navLinkInDrawerStyle +
                    (pathname === '/exercises' ? navCurrent : '')
                  }
                >
                  種目
                </Link>
              </DrawerClose>
            </div>
            <DrawerFooter>
              {session !== null && session.user !== undefined ? (
                <UserAvatarInDrawer session={session} />
              ) : (
                <DrawerClose asChild>
                  <Link
                    href="/about"
                    className="header-about-link header-el block"
                  >
                    about
                  </Link>
                </DrawerClose>
              )}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  )
}
