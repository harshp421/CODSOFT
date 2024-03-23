
"use client"
import { CopyCheckIcon, Lock, ShieldEllipsisIcon, UserMinus2Icon, UserPlusIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

type SidebarProfileProps = {
  user: any
  active: number
  setActive: (active: number) => void
  avatar: string | null
  setAvatar: any
  logoutHandler: any
}

const SidebarProfile: FC<SidebarProfileProps> = ({ user, active, setActive, avatar, setAvatar, logoutHandler }) => {
  return (
    <>
      <div className="sidebar w-full flex flex-col gap-y-3">
        <div className={`w-full flex item-center  px-3 py-3 rounded-sm cursor-pointer hover:bg-muted ${active===1?"bg-muted":""} `}onClick={()=>setActive(1)}>
          <Image  src={user.avatar ? user.avatar.url : "/icons/user_avatar.jpg"} alt={user.name} width={13} height={13} className="h-10 w-10 rounded-full mx-auto md:mx-0" />
          <h5 className="hidden md:block pl-2 text-lg font-semibold">
            My Account
          </h5>
        </div>

        <div className={`w-full flex item-center  px-3 py-3 rounded-sm cursor-pointer hover:bg-muted ${active===2?"bg-muted":""} `}onClick={()=>setActive(2)}>
          <Lock  className='mx-auto md:mx-0'/>
          <h5 className=" hidden md:block  pl-2 text-lg font-semibold">
            Change Password
          </h5>
        </div>

        <div className={`w-full flex item-center  px-3 py-3 rounded-sm cursor-pointer hover:bg-muted ${active===3?"bg-muted":""} `}onClick={()=>setActive(3)}>
          <CopyCheckIcon  className='mx-auto md:mx-0' />
          <h5 className="  hidden md:block pl-2 text-lg font-semibold">
            Enrolled Courses
          </h5>
        </div>
        {
          user.role === "admin" && (
            <Link className={`w-full flex item-center  px-3 py-3 rounded-sm cursor-pointer hover:bg-muted `} href="/adminDashboard">
              <ShieldEllipsisIcon   className='mx-auto md:mx-0'/>
              <h5 className="  hidden md:block pl-2 text-lg font-semibold">
               admin Dashboard
              </h5>
            </Link>
          )
        }
        <div className={`w-full flex item-center  px-3 py-3 rounded-sm cursor-pointer hover:bg-muted ${active===4?"bg-muted":""} `}onClick={()=>logoutHandler()}>
          <UserMinus2Icon  className='mx-auto md:mx-0'/>
          <h5 className="hidden md:block pl-2 text-lg font-semibold">
            Log-Out
          </h5>
        </div>
      </div>
    </>
  )
}

export default SidebarProfile