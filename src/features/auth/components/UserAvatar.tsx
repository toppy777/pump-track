'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import SignOut from '@/features/auth/components/SignOut'
import { Session } from 'next-auth'
import Image from 'next/image'
import './styles/auth.css'

export default function UserAvatar({ session }: { session: Session }) {
  if (!session?.user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-12 cursor-pointer">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt="User Avatar"
            width="500"
            height="500"
            className="rounded-full w-[100%] h-[100%] hover:opacity-70 transition duration-150 ease-out block"
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="start"
        sideOffset={10}
        alignOffset={-160}
        className="p-4 w-60"
      >
        <div className="w-full flex flex-col items-start">
          <p className="break-all font-bold">
            {session && session.user ? session.user.name : ''}
          </p>
          <p className="break-all text-gray-500">
            {session && session.user ? session.user.email : ''}
          </p>
        </div>
        <SignOut className="w-full mt-3" />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
