import SignOut from '@/features/auth/components/sign-out'
import { auth } from '@/features/auth/config'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Image from 'next/image'
import './styles/auth.css'

export default async function UserAvatar() {
  const session = await auth()

  if (!session?.user) return null

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left pl-100">
        <MenuButton className="inline-flex w-full justify-center rounded-full bg-white shadow-xs ">
          {session.user.image && (
            <Image
              src={session.user.image}
              alt="User Avatar"
              width="50"
              height="50"
              className="user-avatar hover:opacity-70 transition delay-50 duration-50 ease-out"
            />
          )}
        </MenuButton>
        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in px-3 py-2"
        >
          <MenuItem as="div">
            <p>{session && session.user ? session.user.name : ''}</p>
          </MenuItem>
          <MenuItem as="div">
            <p>{session && session.user ? session.user.email : ''}</p>
          </MenuItem>
          <MenuItem>
            <SignOut />
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  )
}
