import React, { FC } from 'react'
import CourcePlayer from '../player/CourcePlayer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Ratings from '@/utils/Ratings'
import { CheckCheckIcon } from 'lucide-react'

type ICourceContentProps = {
    active: number,
    setActive: (active: number) => void,
    courcedata: any,
    setCourceData:any
    handleCourceCreate:any
}
const Courcepreview:FC<ICourceContentProps > = ({
    courcedata,
    setCourceData,
    active,
    setActive,
    handleCourceCreate
}) => {
   const discountrPercentage=((courcedata.estimatedPrice-courcedata?.price)/courcedata.estimatedPrice*100);
  const discountrPercentagePrice=discountrPercentage.toFixed(0);

  const CreateCource=()=>{
    handleCourceCreate();
  }
  const prevButton=()=>{
  setActive(active-1)
  }
  return (
     <>
     <div className='w-[80%] m-auto mt-26 p-3'>
       <div className="w-full relative">
        <div className='w-full mt-10'>
          <CourcePlayer title={courcedata.demoUrl} videoUrl={courcedata.demoUrl} />
        </div>
        <div className='flex item-center'>
          <h1 className="mt-10 text-[25px]">
            {courcedata?.price === 0 ?"free":courcedata?.price+"$"}
          </h1>
          <h5 className='pl-3 text-[20px] mt-2 line-through opacity-80'>
            { courcedata?.estimatedPrice}
          </h5>
          <h4 className='pl-4 pt-5 text-[22px]'>
            {discountrPercentagePrice}% off
          </h4>
        </div>
        <div className="flex items-center">
          <Button >
           Buy Now {courcedata?.price}$
          </Button>
        </div>
         <div className="flex items-center">
           <Input
            type='text'
            placeholder='Dicount Code...'

           />
           <Button>Apply </Button>
         </div>
         <p className="pb1"> * Source Code Include </p>
         <p className="pb1">* Full LifeTime Access</p>
         <p className="pb1">* Cirtification of Complete</p>
         <p className="pb1">*Premium Support </p>
       </div>
       <div className="w-full">
        <div className="w-full 800px:pr-2">
         <h1 className='text-[25px] font-sans font-[600]'>
          {courcedata?.name}
         </h1>
         <div className='flex items-center justify-between pt-3'> 
           <div className='flex item-center'>
             <Ratings rating={2}/>
             <h5>(0 Review)</h5>
           </div>
           <h5>0 Student</h5>
         </div>
        </div>

        
       </div>
       <h1 className='mt-2'>What Yous Will Learn From This</h1>
      {
        courcedata?.benefits?.map((item:any,index:number)=>(
           <div className="w-full flex 800px:items-center py-2">
               
                <CheckCheckIcon/>
                <p>{item?.title}</p>
              
           </div>
        ))
      }

      <br />
      <br />
      <h1 className='mt-2'>What Yous Will Learn From This</h1>
      {
        courcedata?.prerequisite?.map((item:any,index:number)=>(
           <div className="w-full flex 800px:items-center py-2">
             
                <CheckCheckIcon/>
               
                <p>{item?.title}</p>
               
           </div>
        ))
      }
      <br />
      <br />
      <div className="w-full">
        <h1>Cource Details:</h1>
        {
          courcedata?.description
        }
      </div>

      <br />
      <br />
      <div className='flex  justify-between mt-3'>
      <Button onClick={prevButton}>prev</Button>
        <Button onClick={CreateCource}>Create Cource</Button>
       
        </div>
     </div>
     
     </>
  )
}

export default Courcepreview