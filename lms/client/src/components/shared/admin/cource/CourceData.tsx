"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { CircleFadingPlusIcon, CircleIcon } from 'lucide-react'
import React, { FC } from 'react'
type ICourceData={
 benefits:{title:string}[],
 setBenefits:(benefits:{title:string}[])=>void ,
 prerequisite:{title:string}[], 
 setPrerequisite:(prerequisite:{title:string}[])=>void,
  active:number
  setActive:(active:number)=>void
}
const CourceData:FC<ICourceData> = ({
    benefits,
    setPrerequisite,
    setActive,
    setBenefits,
    prerequisite,
    active
}) => {
    const handleBenefitChange=(index:number,value:any)=>{
         const updatedBenefit=[...benefits];
         updatedBenefit[index].title=value;
         setBenefits(updatedBenefit)
       console.log(benefits,"up")
    }
    const handleAddBenefit=()=>{
        setBenefits([...benefits,{title:""}])
    }

    const handleprerequisiteChange=(index:number,value:any)=>{
        const updatedprerequisite=[...prerequisite];
        updatedprerequisite[index].title=value;
        setPrerequisite(updatedprerequisite)

   }
   const handleAddprerequisite=()=>{
    setPrerequisite([...prerequisite,{title:""}])
   }
 const nextButton=()=>
 { 
    // Check if any prerequisite or benefit title is empty
    const isEmpty = benefits.some(benefit => benefit.title === '') || prerequisite.some(prereq => prereq.title === '');
    
    if (isEmpty) {
        toast({
            description:"Please fill in all the prerequisite and benefit titles"
        })
    } else {
        setActive(active + 1);
    }
 }
 const prevButton=()=>{
  setActive(active-1);
 }

  return (
     <>
     <div className='w-[80%] m-auto mt-24 block'>
       <div>
        <Label className='text-2xl' htmlFor='email' >
            What are the benefits for the student on this cource
        </Label>
        <br />
        {
          benefits.map((benefit:any,index:number)=>(
                 <Input type="text"
                 key={index}
                 name="benefit"
                 placeholder='you will be able to do anything'
                 required
                 className='my-3'
                 value={benefit.title}
                 onChange={(e)=>handleBenefitChange(index,e.target.value)}
                  />
          ))
        }
        <CircleFadingPlusIcon
         className='w-[30px] cursor-pointer my-2'
         
         onClick={handleAddBenefit}
        />
       </div>
       <div>
        <Label className='text-2xl' htmlFor='email' >
            What are the prerequisite for the student on this cource
        </Label>
        <br />
        {
          prerequisite.map((element:any,index:number)=>(
                 <Input type="text"
                 key={index}
                 name="prerequisite"
                 placeholder='what you want to know before buy this cource'
                 required
                 className='my-3'
                 value={element.title}
                 onChange={(e)=>handleprerequisiteChange(index,e.target.value)}
                  />
          ))
        }
        <CircleFadingPlusIcon
         className='w-[30px] cursor-pointer my-2'
             onClick={handleAddprerequisite}
        />
       </div>
        <div className='flex gap-x-4 mt-3'>
        <Button onClick={nextButton}>Next</Button>
       <Button onClick={prevButton}>Previous</Button>
        </div>
     </div>
     </>
  )
}

export default CourceData