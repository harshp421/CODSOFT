"use client"
import ContectForm from '@/components/shared/contect/ContectForm'
import Footer from '@/components/shared/footer/Footer'
import Header from '@/components/shared/header/Header'
import Heading from '@/utils/Heading'
import React ,{FC,useState}from 'react'

interface props{

}
const Page:FC<props>= (props) => {
 const [open,setOpen]= useState(false);
 const [activeItem,setActiveItem]=useState(3);
 const [route,setRoute]=useState('Login');
  return (
    <div className='max-w-7xl mx-auto'>
      
    <Heading title="Online-Learning" description="Online-Learning id a platform for student to learn and get help from teacher" keywords="=Programing,MERN,React" />
     <Header  open={open} setOpen={setOpen} activeItem={activeItem} route={route} setRoute={setRoute}/>
     {/* hero section */}
      <ContectForm/>
     <Footer/>
    </div>
  )
}

export default Page