import { CheckCheckIcon, ChevronDownIcon, ChevronUpIcon, Tv2Icon } from 'lucide-react';
import React, { FC, useState } from 'react'
type CourceContentListProps = {
data:any;
activeVideo?:any;
setActiveVideo?:any;
isDemo?:boolean;
}

const CourceContentList:FC<CourceContentListProps> = ({data,activeVideo,setActiveVideo,isDemo}) => {
  const[visibleSections,setVisibleSections]=useState<Set<string>>(
    new Set<string>()
  );

  // find uniques video sections
    const videoSections:any=[...new Set<string>(data?.map((item:any)=>item.videoSection)),]
    let totalCount:number=0;

    const toggleSection=(section:string)=>{
        const newVisibleSection=new Set(visibleSections);
        if(newVisibleSection.has(section)){
            newVisibleSection.delete(section);
        }else{
            newVisibleSection.add(section);
        }
        setVisibleSections(newVisibleSection);
        }

    return (
    <>
     <div className={`mt-[15px] w-full ${!isDemo && 'ml-[-30px]  static top-24 left-0 z-30'}`}>
       {
        videoSections.map((section:string,index:number)=>{
            const isSectionVisible=visibleSections.has(section);
            const sectionVideos=data.filter((item:any)=>item.videoSection===section);
            console.log(sectionVideos,"sectionVideos");
            const sectionVideoCount=sectionVideos.length;
            const sectionVideoLength=sectionVideos.reduce((acc:any,item:any)=>acc+item.videoLength,0);
            const sectionStartIndex=totalCount;
            totalCount+=sectionVideoCount;
           const sectionCountHours=Math.floor(sectionVideoLength/60);
          return(
            <div key={section} className={`${!isDemo && "border-b border-[#ffffff] border-solid pb-2"}`}>
              <div className='w-full flex items-center justify-between my-5 h-5'>
                <h4 className='text-lg font-bold'>{section}</h4>
                <div className='flex items-center'>
                  <p className='text-sm font-bold'>{sectionVideoCount} videos</p>
                  <p className='text-sm font-bold ml-2'>{sectionCountHours} hours</p>
                  <button onClick={()=>toggleSection(section)} className='ml-2'>
                    {isSectionVisible ? <ChevronUpIcon size={24} /> : <ChevronDownIcon size={24} />}
                  </button>
                </div>
              </div>
              <div className={`${isSectionVisible ? 'block' : 'hidden'}`}>
                {
                  sectionVideos.map((video:any,index:number)=>{
                    const isActive=activeVideo?.id==video.id;
                    const videoIndex=sectionStartIndex+index;
                    const conntentLenght=video.videoLength/60;
                    return(
                      <div key={index} className='flex items-center justify-between'>
                        <div className='flex items-center'>
                          <button onClick={()=>isDemo?null:setActiveVideo(videoIndex)} className='flex items-center'>
                            {isActive ? <Tv2Icon size={24} /> : <span>{sectionStartIndex+index+1}</span>}
                            <p className='ml-2'>{video.title}</p>
                          </button>
                        </div>
                        <p>{video.videoLength} minutes</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          
          )
})
       }
     </div>
    </>
  )
}

export default CourceContentList