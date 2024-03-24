import React, { useState } from 'react'
import CourcePlayer from '../admin/player/CourcePlayer'
import { Button } from '@/components/ui/button'

type Props = {
    data:any,
    id:any,
    activeVideo:any,
    setActiveVideo:any
}

const CourceContentMedia = ({data,id,activeVideo,setActiveVideo}: Props) => {
    const [activebar, setActivebar] = useState(0)
  return (
    <div className='w-[95%] md:w-[86%] pt-4 m-auto'>
        <CourcePlayer title={data[activeVideo]?.title} videoUrl={data[activeVideo]?.videoUrl}/>
        <div className='w-full flex items-center justify-between my-3'>
          <Button  className={`${activeVideo === 0 ?"opacity-35":""}`}
           disabled={activeVideo === 0?true:false}
         onClick={()=>setActiveVideo(activeVideo===0?0:activeVideo-1)}
        >
              Prev Video
          </Button>
          <Button    className={`${activeVideo === data?.length -1 ?"opacity-35":""}`}
           disabled={activeVideo === data?.length-1?true:false} 
            onClick={()=>setActiveVideo(activeVideo===data?.length-1?activeVideo:activeVideo+1)}
           >
              Next Video
          </Button>
        </div>
        <h1>{data[activeVideo]?.title}</h1>

        <br />
        <div className='w-full p-4 flex items-center justify-between rounded shadow-inner bg-slate-500'>
         {
            ["Overview","Links","Q&A","Reviews"].map((item,index)=>(
                <h5 key={index} className={`cursor-pointer ${activebar === index && "text-red-600"} font-semibold`} onClick={()=>setActivebar(index)}>{item}</h5>
            ))
         }
        </div>

        <br />
        {
            activebar === 0 && (
                <div>
                    <h1>Description</h1>
                    <p>{data[activeVideo]?.description}</p>
                </div>
            )
        }
        {
            activebar === 1 && (
                <div>
                    <h1 className=''>Links</h1>
                    {data[activeVideo]?.links.map((item:any,index:number)=>(
                    <div className='mb-5' key={index}>
                <h2 className='md:inline-block'>
                  {
                    item.title?item.title +":":"Link"
                  }
                </h2>
                <a href={item.url} target="_blank" className='text-blue-500 underline'>{item.url}</a>   
                    </div>
                    ))}
                </div>
            )
        }
        </div>
  )
}

export default CourceContentMedia