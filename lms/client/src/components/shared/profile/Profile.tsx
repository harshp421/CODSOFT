"use client"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import React, { FC, useState } from 'react'
import SidebarProfile from './SidebarProfile'
import { useLogOutQuery } from '@/redux/feature/auth/authApi'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import ProfileInfo from './ProfileInfo'
import ChangePassword from './ChangePassword'

type ProfileProps = {
    user:any
}
const Profile :FC<ProfileProps>= ({user}) => {

    const [active,setActive]=useState<number>(1);
    const [avatar,setAvatar]=useState<null | string>(null);
    const [logOut,setLogOut]=useState<boolean>(false);
    const {}=useLogOutQuery(undefined,{
        skip: !logOut?true:false
    })
    const logoutHandler=async()=>{
    await signOut();
     setLogOut(true);
    
    }
  return (
    <div className='max-w-7xl mx-auto'>
         <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[400px] max-w-7xl mx-auto rounded-lg "
    >
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full  p-6">
           <SidebarProfile
           user={user}
           active={active}
           setActive={setActive}
           avatar={avatar}
           setAvatar={setAvatar}
           logoutHandler={logoutHandler}
           />
          
        </div>
      </ResizablePanel>
     
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full flex-col items-center justify-center p-6">
           {
            active===1 &&  <ProfileInfo user={user} avatar={avatar}/>
           }
            {
            active===2 &&  <ChangePassword user={user} />
           }
           
        </div>
      </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default Profile