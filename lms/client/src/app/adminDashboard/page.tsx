"use client"
import AdminHeader from '@/components/shared/admin/header/AdminHeader'
import AdminSidebar from '@/components/shared/admin/sideBar/AdminSidebar'
import Heading from '@/utils/Heading'
import React, { useState } from 'react'

const page = () => {
   const [openSidebar,setOpenSidebar]=useState(false);
 
  return (
    <>
     <Heading title={"Admin Dashboard"} description="Online-Learning id a platform for student to learn and get help from teacher" keywords="=Programing,MERN,React" />
      <AdminHeader openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
      <AdminSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
 
  

    </> 
  )
}

export default page