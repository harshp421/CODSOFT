"use client"
import CreateCource from '@/components/shared/admin/cource/CreateCource'
import AdminHeader from '@/components/shared/admin/header/AdminHeader'
import AdminSidebar from '@/components/shared/admin/sideBar/AdminSidebar'
import Heading from '@/utils/Heading'
import React, { useState } from 'react'

type Props = {}

const Page = (props: Props) => {
    const [openSidebar,setOpenSidebar]=useState(false);
  return (
    <>
     <Heading title={"Create Cource"} description="Online-Learning id a platform for student to learn and get help from teacher" keywords="=Programing,MERN,React" />
     <AdminHeader openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
    <AdminSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
      <CreateCource/>
    </>
  )
}

export default Page