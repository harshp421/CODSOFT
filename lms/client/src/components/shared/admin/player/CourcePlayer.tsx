import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
type IPlayer={
    videoUrl:string,
    title:string
}
const CourcePlayer:FC<IPlayer> = ({videoUrl,title}) => {

    const [videoData, setVideoData] = useState<any>({
        otp:"",
        playbackInfo:""
    });

    useEffect(() => {
        const getVideoData = async () => {
            const res = await axios.post( `${process.env.NEXT_PUBLIC_SERVER_URL}getvdocipherotp`,{videoId:videoUrl})
            setVideoData(res.data.data);
            
        }
        getVideoData();
    },[videoUrl])
    console.log(videoData.otp,videoData.playbackInfo)
  return (
     <div style={{position:"relative",paddingTop:"56.25%",overflow:"hidden"}}>
     {  
        videoData.otp!="" && videoData.playbackInfo != ""&& (
            <iframe
            src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData?.playbackInfo}&player=Toz4ZwdQSZH7kH1I`}
            style={{border:0,
                position:"absolute",
                width:"100%",
                height:"100%",
                top:0,
                left:0,
                
               
            }}
            allowFullScreen={true}
             allow="encrypted-media"
           
          ></iframe>
        )
     }
     </div>  
  )
}

export default CourcePlayer