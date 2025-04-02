'use client'

import SignOut from '@/features/auth/components/SignOut'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Session } from 'next-auth'
import Image from 'next/image'
import './styles/auth.css'

export default function UserAvatar({ session }: { session: Session }) {
  if (!session?.user) return null

  return (
    <Menu as="div" className="relative block text-left w-full h-full">
      <MenuButton className="flex w-full h-full justify-center rounded-full bg-white shadow-xs cursor-pointer">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt="User Avatar"
            width="500"
            height="500"
            className="rounded-full w-[100%] h-[100%] hover:opacity-70 transition duration-150 ease-out block"
          />
        )}
      </MenuButton>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in px-3 py-2"
      >
        <MenuItem as="div">
          <p className="font-bold">
            {session && session.user ? session.user.name : ''}
          </p>
        </MenuItem>
        <MenuItem as="div">
          <p>{session && session.user ? session.user.email : ''}</p>
        </MenuItem>
        <MenuItem>
          <SignOut />
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}
