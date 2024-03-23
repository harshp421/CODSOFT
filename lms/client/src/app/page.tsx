"use client"
import Cources from '@/components/shared/cources/Cources'
import Faq from '@/components/shared/faq/Faq'
import Footer from '@/components/shared/footer/Footer'


import Header from '@/components/shared/header/Header'
import HeroSection from '@/components/shared/hero/HeroSection'
import Reviews from '@/components/shared/reviews/Reviews'
import Heading from '@/utils/Heading'
import Head from 'next/head'
import React ,{FC,useState}from 'react'

interface props{

}
const page:FC<props>= (props) => {
 const [open,setOpen]= useState(false);
 const [activeItem,setActiveItem]=useState(0);
 const [route,setRoute]=useState('Login');
  return (
    <div className='max-w-7xl mx-auto'>
      
    <Heading title="Online-Learning" description="Online-Learning id a platform for student to learn and get help from teacher" keywords="=Programing,MERN,React" />
     <Header  open={open} setOpen={setOpen} activeItem={activeItem} route={route} setRoute={setRoute}/>
     {/* hero section */}
     <HeroSection/>
     <Cources/>
     <Reviews/>
     <Faq/>
     <Footer/>
    </div>
  )
}

export default page