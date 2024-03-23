"use client"
import Loader from '@/components/ui/Loader'
import { useGetCourceContentQuery } from '@/redux/feature/cource/CourceApi'
import Heading from '@/utils/Heading'
import React, { useState } from 'react'
import CourceContentMedia from '../../cources/CourceContentMedia'
import Header from '../../header/Header'
import CourceContentList from '../../cources/CourceContentList'

type Props = {
    courceId:any
}

const PaidCourceContent = ({courceId}: Props) => {
    const{data:courceData,isLoading}=useGetCourceContentQuery(courceId);
    const data=courceData?.content;
     const [activeVideo, setActiveVideo] = useState(0);
     const [open,setOpen]= useState(false);
     const [activeItem,setActiveItem]=useState(0);
     const [route,setRoute]=useState('Login');
     console.log(data,"courcedata");
  return (
     <>
     {
        isLoading ? (
            <Loader/>
        ):(
            <> 
            <Header  open={open} setOpen={setOpen} activeItem={activeItem} route={route} setRoute={setRoute}/>
            <div className='w-full grid md:grid-cols-10'>
                  <Heading title={data[activeVideo]?.title} description="Online-Learning id a platform for student to learn and get help from teacher" keywords="=Programing,MERN,React" />
                <div className="col-span-7">
                 <CourceContentMedia
                  data={data}
                  id={courceId}
                  activeVideo={activeVideo}
                  setActiveVideo={setActiveVideo}
                 />
                </div>
                <div className='hidden md:block md:col-span-3'>
                    <CourceContentList
                     setActiveVideo={setActiveVideo}
                     data={data}
                        activeVideo={activeVideo}
                    />
                </div>
            </div>
            </>
        )
     }
     </>
  )
}

export default PaidCourceContent