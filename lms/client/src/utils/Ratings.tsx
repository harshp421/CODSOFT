import { Star, StarHalf } from 'lucide-react'
import React, { FC } from 'react'

type Irating={
    rating:number
}
const Ratings:FC<Irating> = ({rating}) => {
    const stars=[]
    for(let i=1;i<=5;i++)
    {
        if(i<=rating)
        {
            stars.push(
                <Star
                 fill="true"
                 key={i}
                />
            );
        }else if(i===Math.ceil(rating) && !Number.isInteger(rating))
        {
            stars.push(
                <StarHalf
                 key={i}
                />
            )
        }else
        {
            stars.push(
                <Star key={i}/>
            )
        }
    }
  return (
     <>
       <div className='flex mt-1'>{stars}</div>
     </>
  )
}

export default Ratings