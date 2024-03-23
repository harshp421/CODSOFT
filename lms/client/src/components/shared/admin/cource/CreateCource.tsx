"use client"
import React, { useEffect, useState } from 'react'
import CourceInformation from './CourceInformation';
import CourceOption from './CourceOption';
import CourceData from './CourceData';
import CourceContent from './CourceContent';
import Courcepreview from './Courcepreview';
import { set } from 'zod';
import { useCreateCourceMutation } from '@/redux/feature/cource/CourceApi';
import { toast } from '@/components/ui/use-toast';
import { redirect } from 'next/navigation';

type ICreateCource = {

}
const CreateCource = () => {
  const[createCource,{isLoading,error,isSuccess}]=useCreateCourceMutation();
  const [active, setActive] = useState<number>(0);
  const [courceInfo, setCourceInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    levels: "",
    demoUrl: "",
    thumbnail: "",
  })
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisite, setPrerequisite] = useState([{ title: "" }]);
  const [courceContentData, setCourceContentData] = useState([
    {
      videoUrl: "8c2309c0fa67fa87befdcbc2eda14cb6",
      title: "hello",
      description: "",
      videoSection: "untitled Section",
      links: [{ title: "sds", url: "ds" }],
      suggestions: "",
    }
  ]);
  const [courcedata, setCourceData] = useState({});

  useEffect(()=>{
     if(isSuccess)
     {
      toast(
        {
          description:"cource Create Success Fully"
        })
        redirect('/adminDashboard/all-cource');
     }
     if(error)
     {
      if("data" in error)
      {
          const errorMessage=error as any
          toast({
           description:errorMessage.data.message
          })
      }
     }
  },[isSuccess,error,isLoading])
  const handleSubmit = async () => {
    //formet the banifit array
    const formettedBenefits = benefits.map((benefit) => ({ title: benefit.title }));
    //formet the prerequisite array
    const formettedPrerequisite = prerequisite.map((prerequisite) => ({ title: prerequisite.title }));
    //formet the courceContentData array
    const formettedCourceContentData = courceContentData.map((content) => ({
      videoUrl: content.videoUrl,
      title: content.title,
      description: content.description,
      videoSection: content.videoSection,
      links: content.links.map((link) => ({ title: link.title, url: link.url })),
      suggestions: content.suggestions,
    }));

    //formet the courceData object
    const courceData1 = {
      name: courceInfo.name,
      description: courceInfo.description,
      price: courceInfo.price,
      estimatedPrice: courceInfo.estimatedPrice,
      tags: courceInfo.tags,
      level: courceInfo.levels,
      demoUrl: courceInfo.demoUrl,
      thumbnail: courceInfo.thumbnail,
      benefits: formettedBenefits,
      prerequisites: formettedPrerequisite,
      courceData: formettedCourceContentData,
    }
    setCourceData(courceData1);


  }

  const handleCourceCreate=async()=>{
   const data=courcedata;
   console.log(courcedata,"courceData")

   if(!isLoading)
   {
    await createCource(data)
   }
  }  
 
  return (
    <>
      <div className="p-4  sm:ml-64 mt-20 ">
        <div className=' w-[20%]  h-screen fixed z-[-1] top-18 right-0'>
          <CourceOption active={active} setActive={setActive} />
        </div>
        <div className="p-4  border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className='w-[80%] '>
            {
              active === 0 && (
                <CourceInformation courceInfo={courceInfo} setCourceInfo={setCourceInfo} active={active} setActive={setActive} />
              )

            }

            {
              active === 1 && (
                <CourceData
                  benefits={benefits}
                  setBenefits={setBenefits}
                  prerequisite={prerequisite}
                  setPrerequisite={setPrerequisite}
                  active={active} setActive={setActive} />
              )

            }
            {
              active === 2 && (
                <CourceContent
                  courceContentData={courceContentData}
                  setCourceContentData={setCourceContentData}
                  active={active}
                  setActive={setActive}
                  handleSubmit={handleSubmit}
                />
              )

            }
            {
              active === 3 && (
                <Courcepreview
                active={active}
                setActive={setActive}
                courcedata={courcedata}
                 setCourceData={setCourceData}
                 handleCourceCreate={handleCourceCreate}
                />
              )
            }
          </div>

        </div>
      </div>
    </>
  )
}

export default CreateCource