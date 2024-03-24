"use client";
import Cources from '@/components/shared/cources/Cources'
import Footer from '@/components/shared/footer/Footer';
import Header from '@/components/shared/header/Header';
import Heading from '@/utils/Heading';
import React, { useState } from 'react'

type Props = {}

const page = (props: Props) => {
    const [open,setOpen]= useState(false);
    const [activeItem,setActiveItem]=useState(1);
    const [route,setRoute]=useState('Login');
  return (
    <>
    <div className='max-w-7xl mx-auto'>
      
      <Heading title="All-Courses Online-Learning" description="Online-Learning id a platform for student to learn and get help from teacher" keywords="=Programing,MERN,React" />
       <Header  open={open} setOpen={setOpen} activeItem={activeItem} route={route} setRoute={setRoute}/>
       {/* hero section */}
      
       <Cources/>
      
       <Footer/>
      </div>
    </>
  )
}

export default page